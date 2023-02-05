import requests
from bs4 import BeautifulSoup
from defaults.utils import Utils
from time import sleep
from graphql_client.client import ClientGraphql

class HTMLScrapper:
    def __init__(self, url, newManga=False):
        self.utils = Utils()
        self._html = self._getHtml(url)

        self.downloaded = self.utils.loadJson(filePath=self.utils.downloadFile, createIfNotExists=True)
        self.newManga = newManga
        self.headers = {'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Mobile Safari/537.36'}
        self.info = self.getInfo()
        self.ClientGraphql = ClientGraphql(self.utils.databaseUrl)
        ...
    
    def _getHtml(self, url) -> None:
        url = self.utils.replaceHost(url)
        
        while True:
            request = requests.get(url, timeout=300)
            if(request.status_code != 200):
                print(f"Conection Error [{request.status_code}] - {url} - We will try again in 5 seconds")
            else:
                break
            sleep(5)

        return BeautifulSoup(request.text, 'html.parser')
    
    def getChapters(self) -> None:
        raise Exception("Method not implemented")

    def saveMangaInfo(self):
        raise Exception("Method not implemented")
        
    def getInfo(self) -> dict:
        raise Exception("Method not implemented")
    @property
    def chapters(self):
        if(self.chaptersOnPage):
            return self.chaptersOnPage
        
        raise Exception("First run get chapters")
    
    
    def getDownloadsItem(self, title):
        if(not self.downloaded[self.utils.replaceTitle(title)]):
            self.addToDownloaded(title)
        return self.downloaded[title]
        
    def logError(self, msg=""):

        self.utils.saveLog(f"{self.info['Title']} - {msg}")

    def addToDownloaded(self, title, chapter=None):
        if(not self.downloaded[title]):
            self.downloaded[title] = []

        if(chapter):
            self.downloaded[title].append(chapter)
        self.utils.saveJson(self.utils.downloadFile, self.downloaded)