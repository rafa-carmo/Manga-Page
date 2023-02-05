from defaults.utils import Utils
from graphql_client.client import ClientGraphql
from html_scrappers.unionScrapper import UnionScrapper
from mangaVerify import MangaVerify
from database.saveDatabase import SaveDatabase
from tqdm import tqdm


class MangaDownloader:

    def __init__(self):
        self.utils = Utils()
        self.configs = vars(self.utils)
        
        self.client = ClientGraphql(self.configs['databaseUrl'])
        self._getDownloadList()
        ...

    def _getDownloadList(self):
        from graphql_client.queries.downloadList import DownloadLists
        self.downloadList = self.client.executeClient(DownloadLists.gql)['downloadLists']
        ...
    

def run():
    downloader = MangaDownloader()
    progressBar = tqdm(downloader.downloadList, desc="Verificando mangas")

    for listInfo in progressBar:
        newManga = True if listInfo['mangas'] == None else False
        mangaDownloader = UnionScrapper(listInfo['downloadPages'][0]['url'], newManga=newManga)
        mangaDownloader.domainInfo = listInfo['mangas']
        mangaDownloader.getChapters()

        progressBar.set_description(f"Verificando mangas - {mangaDownloader.info['Title'][0:10]}")

        # print(listInfo['mangas']['title'])

        chaptersToDownload = MangaVerify.verifyInDownloadFile(
            mangaDownloader.getDownloadsItem(listInfo['mangas']['title']),
            mangaDownloader.chapters, 
            mangaDownloader.downloaded)
        
        if(not chaptersToDownload):
            continue
        if(len(chaptersToDownload) > 0):
            for chapterRaw in chaptersToDownload:
                chapter = mangaDownloader.getPages(chapterRaw)
                download = SaveDatabase.createChapter(chapter)
                if(download != True):
                    mangaDownloader.logError(f"{chapter['chapter']} - {download}")
                    continue
                mangaDownloader.addToDownloaded(chapter['title'], chapter['chapter'])
                ...


if(__name__ == "__main__"):
    run()