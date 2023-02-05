from graphql_client.client import ClientGraphql
from defaults.utils import Utils

class MangaVerify:

    utils = Utils()
    configs = vars(utils)
    client = ClientGraphql(configs['databaseUrl'])
    downloads = Utils.loadJson('downloads.json', createIfNotExists=True)
    def __init__(self):

        ...

    @classmethod
    def verifyInDownloadFile(cls, chaptersDonwloadedFromManga, chapters, downloads):
        chapter = [chapter for chapter in chapters if chapter['chapter'] not in chaptersDonwloadedFromManga]
        if(len(chapter) > 0):
            return chapter
        return False
        ...

    @classmethod
    def compareToDownload(cls, id, chapters) -> list | bool:
        from graphql_client.queries.getChapters import GetChapters
        requestChaptersDownloaded = cls.client.executeClient(GetChapters.gql, variables={"id": int(id)})
        chaptersDownloaded = [chapter['chapter'] for chapter in requestChaptersDownloaded['chapters']]
        chaptersForDownload = [chapter for chapter in chapters if chapter['chapter'] not in chaptersDownloaded]

        if(len(chaptersForDownload) > 0):
            return chaptersForDownload
        return False