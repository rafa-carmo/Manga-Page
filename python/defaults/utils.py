import json, re
from datetime import datetime
from os import path
from defaults.config import Config
from defaults.log import Log

class Utils(Config, Log):

    @classmethod
    def filterDate(cls, date: str) -> str:
        date = re.findall("[0-5][0-9]/[0-5][0-9]/[0-5][0-9][0-5][0-9]", date)[0]
        dateList = date.split('/')
        strdate = f"{datetime(int(dateList[-1]), int(dateList[-2]), int(dateList[-3])).strftime('%Y-%m-%dT%H:%M:%S')}.00-000Z"
        return strdate
    @classmethod
    def loadEnvData(cls):
        from dotenv import load_dotenv
        load_dotenv()

    @classmethod
    def replaceHost(cls, url: str) -> str:
        return url.replace('unionmangas', 'unionleitor')
    
    @classmethod
    def saveJson(cls, filePath, jsonDict) -> None:
        with open(filePath, "w+", encoding="utf-8") as f:
            json.dump(jsonDict, f, ensure_ascii=False, indent=4)

    @classmethod
    def loadJson(cls, filePath: str, createIfNotExists=False) -> dict:
        if(not path.exists(filePath)):
            if(not createIfNotExists):
                raise Exception(f"File {filePath} not exists, if you want to create blank file set parameter createIfNotExists to True")
            cls.saveJson(filePath, {})
            
        with open(filePath, 'r', encoding="utf-8") as f:
            return json.load(f)

    @classmethod
    def replaceTitle(cls, title: str) -> str:
        replaceList = [":", "|", "(s)", "  ", "(Pt-Br)", "(pt-br)", "(AMA Scans)", "(Version Neox Scans)", " (Drope Scans Version)"]

        for replaceItem in replaceList:
            text = title.replace(replaceItem, '')
        return text
    
    @classmethod
    def slug(cls, text) -> str:
        return re.sub(u'[^a-zA-Z0-9áéíóúÁÉÍÓÚâêîôÂÊÎÔãõÃÕçÇ: ]', '', text)
