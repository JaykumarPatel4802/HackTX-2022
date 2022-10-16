# Import flask and datetime module for showing date and time
from flask import Flask
import datetime

from appwrite.client import Client
from appwrite.services.databases import Databases

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


# Running app
if __name__ == '__main__':
    app.run(debug=True)