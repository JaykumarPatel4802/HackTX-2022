# Import flask and datetime module for showing date and time
from flask import Flask
import datetime

from appwrite.client import Client
from appwrite.services.databases import Databases

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

from webdriver_manager.chrome import ChromeDriverManager

from cohere import Client as cohereClient
from cohere.classify import Example

from os import listdir
from os.path import isfile, join

from re import compile

from time import sleep

pattern = compile(".+\.txt")


co = cohereClient('dHlltzVIjybs4LkBx1STPBKLP21wcKCFODH2oXj9')

classificationExFile = [f for f in listdir('./nplClassificationExamples') if isfile(join('./nplClassificationExamples', f)) and pattern.match(f)]
classificationEx = []
for fName in classificationExFile:
    with open('./nplClassificationExamples/'+fName, "r+", encoding='utf-8') as f:
        classificationEx.append(Example(f.read(), fName[:-5]))

skillExtractExFile = [f for f in listdir('./nplSkillExtractExamples') if isfile(join('./nplSkillExtractExamples', f)) and pattern.match(f)]
skillExtract = []
for fName in skillExtractExFile:
    with open('./nplSkillExtractExamples/'+fName, "r+", encoding='utf-8') as f:
        skillExtract.append([f.read(), fName[:-4]])

client = Client()

(client
.set_endpoint('https://localhost/v1') # Your API Endpoint
.set_project('634b02547d17f5887356') # Your project ID
.set_key('83f25ac9d4fe41a57e698007974a9687ad12c940dd0b86ea13d3e1e505060823c69adb58541f2b77ada3b37c155436e219664efd75d625e007d94608381e6495eeb180c2a06ffe8b87d0c9b05deeab8de7fb07edb4530a8c905abbef763ca7e8d5b7e4d80eb2b5f5187b9a531df6cdbcc1751dc2630c23389c7ed69a1cdb3676') # Your secret API key
)

client.set_self_signed()


databases = Databases(client)  

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
  
  
# Route for seeing a data
@app.route('/data')
def get_time():
  
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }

@app.route('/create_collection/<email>/', methods=['GET', 'POST'])
def create_collection(email):
    try:
        result = databases.get_collection('634b048fa9574766567b', email)
        return {
            'valid': False,
            'result': {}
        }
    except:
        result = databases.create_collection('634b048fa9574766567b', email, email)
        
        # string, link, enum, date
        result = databases.create_string_attribute('634b048fa9574766567b', email, 'company_name', 255, True) # company name
        result = databases.create_enum_attribute('634b048fa9574766567b', email, 'status', ["Applied", "Not Applied", "OA", "Interview", "Offer", "Rejected"], True) # status
        result = databases.create_string_attribute('634b048fa9574766567b', email, 'company_link', 511, False) # url
        result = databases.create_string_attribute('634b048fa9574766567b', email, 'datetime', 255, False) # datetime

        return {
            'valid': True,
            "result": result
            }

@app.route('/create_document/<email>/<company>/<status>/<url>/<datetime>', methods=['GET', 'POST'])
def create_document(email, company, status, url, datetime):
    jsonData = {
        'company_name': company,
        'status': status,
        'company_link': url,
        'datetime': datetime
    }
    result = databases.create_document('634b048fa9574766567b', email, "unique()", jsonData)
    return result

# get collection i.e. list documents
@app.route('/get_documents/<email>', methods=['GET', 'POST'])
def get_documents(email):
    result = databases.list_documents('634b048fa9574766567b', email)
    return result

# update document
@app.route('/update_document/<email>/<document_id>/<status>/<datetime>', methods=['GET', 'POST'])
def update_document(email, document_id, status, datetime):
    result = {
        "status": None,
        "datetime": None
    }
    if status != "":
        temp = databases.update_document('634b048fa9574766567b', email, document_id, {'status': status})
        result["status"] = temp
    if datetime != "":
        temp = databases.update_document('634b048fa9574766567b', email, document_id, {'datetime': datetime})
        result["datetime"] = temp
    return result

@app.route('/suggestions/<email>', methods=['GET', 'POST'])
def suggestions(email):
    options = Options()
    options.headless = True
    options.add_argument("--window-size=1920,1200")

    driver = webdriver.Chrome(options=options, service=Service(ChromeDriverManager().install()))
    currentApps = databases.list_documents('634b048fa9574766567b', email)
    urls = [apps["company_link"] for apps in currentApps["documents"] if apps["company_link"] == ""]
    classificationData = []
    for url in urls:
        try:
            driver.get(url)
            sleep(2)
            data = driver.find_element(By.TAG_NAME, value="body")
            temp = data.text.split()
            if len(temp) > 325:
                temp = temp[100:325]
            elif len(temp) > 225:
                temp = temp[0:225]
            classificationData.append(' '.join(temp))
        except Exception:
            pass

    classifications = co.classify( #find job listings
        model='medium',
        inputs=classificationData,
        examples=classificationEx
    )

    for item in classifications.classifications: #remove non job listings
        if item.prediction == 'no':
            classifications.classifications.remove(item)

    skillExtractor = cohereExtractor([e[1] for e in skillExtract], 
                                    [e[0] for e in skillExtract], [],
                                    "", 
                                    "extract the skills requirements of the post:")
    
    results = []
    for text in classificationData:
        try:
            extracted_text = skillExtractor.extract(text)
            results.append(extracted_text)
        except Exception as e:
            print('ERROR: ', e)

    
    
class cohereExtractor():
    def __init__(self, examples, example_labels, labels, task_desciption, example_prompt):
        self.examples = examples
        self.example_labels = example_labels
        self.labels = labels
        self.task_desciption = task_desciption
        self.example_prompt = example_prompt

    def make_prompt(self, example):
        examples = self.examples + [example]
        labels = self.example_labels + [""]
        return (self.task_desciption +
                "\n---\n".join( [examples[i] + "\n" +
                                self.example_prompt + 
                                 labels[i] for i in range(len(examples))]))

    def extract(self, example):
      extraction = co.generate(
          model='medium',
          prompt=self.make_prompt(example),
          max_tokens=5
          )
      return(extraction.generations[0].text[:-1])
            

# Running app
if __name__ == '__main__':
    app.run(debug=True)