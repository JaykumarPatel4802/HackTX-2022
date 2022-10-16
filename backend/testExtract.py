from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

from webdriver_manager.chrome import ChromeDriverManager

from time import sleep

from os import listdir
from os.path import isfile, join

import re

from cohere import Client

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

co = Client('dHlltzVIjybs4LkBx1STPBKLP21wcKCFODH2oXj9')

pattern = re.compile(".+\.txt")

skillExtractExFile = [f for f in listdir('./nplSkillExtractExamples') if isfile(join('./nplSkillExtractExamples', f)) and pattern.match(f)]
skillExtract = []
for fName in skillExtractExFile:
    with open('./nplSkillExtractExamples/'+fName, "r+", encoding='utf-8') as f:
        skillExtract.append([f.read(), fName[:-4]])

skillExtractor = cohereExtractor([e[1] for e in skillExtract], 
                                    [e[0] for e in skillExtract], [],
                                    "", 
                                    "extract the skills requirements of the post:")

options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")

driver = webdriver.Chrome(options=options, service=Service(ChromeDriverManager().install()))
urls = ["https://akunacapital.com/job-details?gh_jid=4445501",
        "https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite/jobs/details/Senior-Technical-Program-Manager--Deep-Learning-Enterprise-Server-Software_JR1954605"]
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
    
results = []
for text in classificationData:
    try:
        extracted_text = skillExtractor.extract(text)
        results.append(extracted_text)
    except Exception as e:
        print('ERROR: ', e)

print(results)