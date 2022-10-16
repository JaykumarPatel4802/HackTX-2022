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
from cohere.classify import Example

co = Client('dHlltzVIjybs4LkBx1STPBKLP21wcKCFODH2oXj9')

pattern = re.compile(".+\.txt")

classificationExFile = [f for f in listdir('./nplClassificationExamples') if isfile(join('./nplClassificationExamples', f)) and pattern.match(f)]
classificationEx = []
for fName in classificationExFile:
    with open('./nplClassificationExamples/'+fName, "r+", encoding='utf-8') as f:
        classificationEx.append(Example(f.read(), fName[:-5]))

options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")

driver = webdriver.Chrome(options=options, service=Service(ChromeDriverManager().install()))
urls = ["https://www.figma.com/",
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
classifications = co.classify(
    model='small',
    inputs=classificationData,
    examples=classificationEx
)
for item in classifications.classifications:
    if item.prediction == 'no':
        classifications.classifications.remove(item)

print([item.input for item in classifications.classifications])