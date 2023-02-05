from html_scrappers.scrapper import HTMLScrapper
from defaults.utils import Utils
from mappers.toDomain import UnionMapperToDomain

class UnionScrapper(HTMLScrapper):


    def getInfo(self) -> dict:
        infoDict = dict()
        perfil = self._html.findAll("div", {"class": "col-md-8 perfil-manga"})[0]
        title = perfil.findAll("div", {"class": "col-md-12"})[0].find("h2").text.strip()
        sinopse = perfil.findAll("div",{"class": "panel-body"})[0].text.strip()
        title = self.utils.replaceTitle(title)
        cover = perfil.findAll("div", {"class": "col-md-4 col-xs-12 text-center col-md-perfil"})[0].find("img")['src']

        infoDict['Title'] = title
        infoDict['Sinopse'] = sinopse
        infoDict['Cover'] = cover


        if(len(perfil.findAll("span", {"class": "label-success"})) > 0):
            infoDict['status'] = 'releasing'
        if(len(perfil.findAll("span", {"class": "label-info"})) > 0):
            infoDict['status'] = 'complete'

        if("status" not in infoDict):
            info['status'] = 'unknown'

        infos = perfil.findAll("h4", {"class": "media-heading manga-perfil"})

        for info in infos:

            listData = info.text.strip().split(":")

            if(self.utils.replaceTitle(listData[0]) == "Gênero"):
                
                infoDict[f"{self.utils.replaceTitle(listData[0])}s"] = listData[1].strip().split(',')
                infoDict[f"{self.utils.replaceTitle(listData[0])}s"] = [genre.strip() for genre in infoDict[f"{self.utils.replaceTitle(listData[0])}s"]]
            else:
                infoDict[self.utils.replaceTitle(listData[0]).title().replace(" ", "")] = ' '.join(listData[1:]).strip()

        return infoDict

    def getChapters(self) -> None:
        if(self.newManga):
            self.saveMangaInfo()
        
        infoChapter = list()
        chapters = self._html.findAll("div",{"class": "row capitulos"})[::-1]
        for chapter in chapters:
            chapterTemp = dict()

            info = chapter.findAll("div", {"class": "col-xs-6 col-md-6"})[0]
            chapterTitle = info.find('a').text.replace("Cap.", "").strip()
            chapterUrl = info.find('a')['href']
            sub = chapter.findAll("div",{"class": "col-xs-6 col-md-6 text-right"})[0].find('a')
            subUrl = sub['href']
            subName = sub.text
            date = [ Utils.filterDate(span.text) for span in info.findAll('span') if '(' in span.text]
            chapterTemp['date']= None
            if self.newManga:
                date = [ Utils.filterDate(span.text) for span in info.findAll('span') if '(' in span.text]
                chapterTemp['date'] = date[0]
            
            chapterTemp['chapter'] = chapterTitle
            chapterTemp['url'] = chapterUrl
            chapterTemp['sub'] = dict()
            chapterTemp['sub']['name'] = subName
            chapterTemp['sub']['url'] = subUrl

            infoChapter.append(chapterTemp)

        self.chaptersOnPage = infoChapter
        return

    def getPages(self, chapter):
        html = self._getHtml(chapter['url'])
        pages = [ page['src'] for page in html.findAll("div", {"class": "col-sm-12 text-center"})[0].findAll("img") if "banner" not in page['src'] ]
        chapter['pages'] = pages
        return UnionMapperToDomain.chapterToDomain(self.domainInfo, chapter)