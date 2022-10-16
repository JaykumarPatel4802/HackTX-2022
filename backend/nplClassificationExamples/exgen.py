from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

from webdriver_manager.chrome import ChromeDriverManager

import traceback

from time import sleep

options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")

driver = webdriver.Chrome(options=options, service=Service(ChromeDriverManager().install()))

yesUrls = [r"https://akunacapital.com/job-details?gh_jid=4445501",
        r"https://pef.fa.us1.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX/requisitions/preview/3665/?location=Austin%2C+TX%2C+United+States&locationId=300000000632431&locationLevel=city&radius=0&radiusUnit=MI",
        r"https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite/details/Principal-System-Software-Engineer---Data-Platform-and-Distributed-Systems_JR1962011",
        r"https://www.janestreet.com/join-jane-street/position/6301678002/",
        r"https://optiver.com/working-at-optiver/career-opportunities/5845732002/",
        r"https://jobs.roblox.com/careers?pid=137452383317&areaOfWork=internships%20and%20new%20graduates&domain=roblox.com",
        r"https://jobs.amd.com/job/Bangalore-MTS-Silicon-Design-Engineer%28147448%29-Karn/889186800/",
        r"https://careers.google.com/jobs/results/122555847323591366-senior-software-engineer-search/",
        r"https://careers.microsoft.com/students/us/en/job/1481263/Research-Intern-Machine-Learning-for-Biology-and-Healthcare",
        r"https://www.amazon.jobs/en/jobs/SF220095985/customer-service-delivery-station-liaison"]
yesCounter = 0
for url in yesUrls:
    try:
        driver.get(url)
        sleep(5)
        data = driver.find_element(By.TAG_NAME, value="body")
        with open("yes"+(str)(yesCounter)+".txt", "w+", encoding="utf-8") as f:
            temp = data.text.split()
            if len(temp) > 350:
                temp = temp[100:350]
            elif len(temp) > 250:
                temp = temp[0:250]
            f.write(' '.join(temp))
        yesCounter += 1
    except Exception as e:
        print(traceback.format_exc())

noUrls = [r"https://www.pythontutorial.net/python-basics/python-create-text-file/",
        r"https://stackoverflow.com/questions/57441421/how-can-i-get-chrome-browser-version-running-now-with-python",
        r"https://hacktx-2022.devpost.com/?ref_feature=challenge&ref_medium=your-open-hackathons&ref_content=Upcoming",
        r"https://akunacapital.com/careers#careers",
        r"https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History",
        r"https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite/jobs",
        r"https://www.cockroachlabs.com/",
        r"https://appwrite.io/docs/getting-started-for-web",
        r"https://www.google.com/search?q=internships&rlz=1C1VDKB_enUS959US961&oq=internships&aqs=chrome..69i57j0i512j0i433i457i512j0i402j0i512j69i60l3.3467j0j7&sourceid=chrome&ie=UTF-8",
        r"https://www.indeed.com/?vjk=0390eee697b47e92&advn=1040170388634322"]
noCounter = 0
for url in noUrls:
    try:
        driver.get(url)
        sleep(5)
        data = driver.find_element(By.TAG_NAME, value="body")
        with open("no"+(str)(noCounter)+".txt", "w+", encoding="utf-8") as f:
            temp = data.text.split()
            if len(temp) > 350:
                temp = temp[100:350]
            elif len(temp) > 250:
                temp = temp[0:250]
            f.write(' '.join(temp))
        noCounter += 1
    except Exception:
        print(traceback.format_exc())

driver.quit()
print("Total: " + (str)(yesCounter+noCounter))