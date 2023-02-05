from graphql_client.client import ClientGraphql
from defaults.utils import Utils
import requests

class SaveDatabase(ClientGraphql):
    config = Utils()

    @classmethod
    def createChapter(cls, chapter) -> None:
        request = requests.post(f'{cls.config.defaultUrl}chapters/updateChapters/', json=chapter, timeout=300)

        if(request.status_code != 200):
            
            return request.text
        return True