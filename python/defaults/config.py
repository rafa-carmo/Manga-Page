from dotenv import load_dotenv
from os import getenv

class Config:
    def __init__(self):
        self.loadEnvData()
        self.defaultUrl = getenv('DEFAULT_URL')
        self.databaseUrl= getenv('DATABASE_URL')
        self.host = getenv('DATABASE_HOST')
        self.downloadFile = getenv('DOWNLOAD_FILE_PATH', 'downloads.json')

    def loadEnvData(self):
        load_dotenv()
