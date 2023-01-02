import json, requests, re, os
from pathlib import Path
from bs4 import BeautifulSoup
from time import sleep
import urllib.request
from pathlib import Path
from datetime import datetime
import createMangas
from math import floor
from dotenv import load_dotenv

load_dotenv()


defaultUrl = os.getenv('DEFAULT_URL')
databaseUrl= os.getenv('DATABASE_URL')
host = os.getenv('DATABASE_HOST')

verify = False


def replaceHost(url):
    return url.replace('unionmangas', 'unionleitor')

def jsonLoad(file):
    with open(file, 'r', encoding="utf-8") as f:
        return json.load(f)

def jsonSave(file, data):
    with open(file, "w+", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)



settings = jsonLoad("settings.json")
while True:
    try:
        downloadList = jsonLoad("downloads.json")
        break
    except Exception as E:
        print("Arquivo downloads.json não encontrado, criando arquivo")
        with open('downloads.json', "w+", encoding="utf-8") as f:
            json.dump({}, f, ensure_ascii=False, indent=4)


def verifyIfChapterDownloaded(id, chapter):
    query= """
        query chapters($id: Int) {
        chapters(where: {mangas: {id: $id}}){
            chapter
        }
        }
    """
    variables = {
        "id": id
      }

    chaptersRequest = requests.post(f'{defaultUrl}graphql', json={'query': query, 'variables': variables})
    
    if(chaptersRequest.status_code == 200):
        chapters = [chapter['chapter'] for chapter in chaptersRequest.json()['data']['chapters']]
        if(chapter in chapters):
            return True

    return False


def getHTML(url):

    while True:
        request = requests.get(url)
        if(request.status_code != 200):
            print(f"Erro de conexão [{request.status_code}] - {url}")
        else:
            break
        sleep(5)

    return BeautifulSoup(request.text, 'html.parser')


def slugRe(text):
    return re.sub(u'[^a-zA-Z0-9áéíóúÁÉÍÓÚâêîôÂÊÎÔãõÃÕçÇ: ]', '', text)

def replace(text):
    replaceList = [":", "|", "(s)", "  ", "(Pt-Br)", "(pt-br)", "(AMA Scans)", "(Version Neox Scans)", " (Drope Scans Version)"]

    for replaceItem in replaceList:
        text = text.replace(replaceItem, '')
    return text


def getDownloadList():
    query= """
        {
        downloadLists(sort: "id:asc"){
            id
            mangas{
            id
            title
            slug
            }
            downloadPages{
            name
            url
            Type
            }
        }
        }
     """

    request = requests.post(databaseUrl, json={"query": query})
    if(request.status_code == 200):
        return request.json()['data']['downloadLists'][::-1]

def filterDate(date):
    date = re.findall("[0-5][0-9]/[0-5][0-9]/[0-5][0-9][0-5][0-9]", date)[0]

    dateList = date.split('/')

    strdate = f"{datetime(int(dateList[-1]), int(dateList[-2]), int(dateList[-3])).strftime('%Y-%m-%dT%H:%M:%S')}.00-000Z"

    return strdate


def getChapters(html, new):
    infoChapter = list()
    chapters = html.findAll("div",{"class": "row capitulos"})[::-1]
    for chapter in chapters:
        chapterTemp = dict()

        info = chapter.findAll("div", {"class": "col-xs-6 col-md-6"})[0]
        chapterTitle = info.find('a').text.replace("Cap.", "").strip()
        chapterUrl = info.find('a')['href']
        sub = chapter.findAll("div",{"class": "col-xs-6 col-md-6 text-right"})[0].find('a')
        subUrl = sub['href']
        subName = sub.text
        date = [ filterDate(span.text) for span in info.findAll('span') if '(' in span.text]
        chapterTemp['date']= None
        if new:
            date = [ filterDate(span.text) for span in info.findAll('span') if '(' in span.text]
            chapterTemp['date'] = date[0]
        
        chapterTemp['chapter'] = chapterTitle
        chapterTemp['url'] = chapterUrl
        chapterTemp['sub'] = dict()
        chapterTemp['sub']['name'] = subName
        chapterTemp['sub']['url'] = subUrl

        infoChapter.append(chapterTemp)

    return infoChapter

def registerChapters(chapter, title, existedId=False):
    chapter['url'] = replaceHost(chapter['url'])

    try:
        html = getHTML(chapter['url'])
        pages = [ page['src'] for page in html.findAll("div", {"class": "col-sm-12 text-center"})[0].findAll("img") if "banner" not in page['src'] ]

    except Exception as e:
        print(e)
        return False




    chapterDict = dict()
    chapterDict['title'] = title
    chapterDict['chapter'] = chapter['chapter']
    chapterDict['chapterPages'] = pages
    chapterDict['scan'] = dict()
    chapterDict['scan']['title'] = chapter['sub']['name']
    chapterDict['scan']['slug'] = slugRe(chapter['sub']['name'])
    chapterDict['type'] = 'update'
    chapterDict['createdAt'] = chapter['date']


    if(existedId != False):
      mutation = """
          mutation UpdatePages($input: updateChapterInput) {
            updateChapter(input: $input){
              chapter {
                id
              }
            }
          }
      """

      organizePages = [ {'page': page} for page in chapterDict['chapterPages']]

      variables = {
        "input": {
          "where": {
            "id": existedId
          },
          "data": {
            "pages": organizePages
          }
        }
      }

      updated = requests.post(f'{defaultUrl}graphql', json={'query': mutation, 'variables': variables})

      if(updated.status_code == 200):
        return True
      return False

    
    if(len(chapterDict['chapterPages']) > 1):

        request = requests.post(f'{defaultUrl}chapters/updateChapters/', json=chapterDict)

        
    else:
        return False
    if(request.status_code != 500):
        return True
    return False

def counterToStr(number):
    number = int(number)
    if number >= 0:
        if number < 10:
            number = f"0{number}"

    return str(number)

def downloadChapter(chapter, title):

    os.makedirs(Path(f'{settings["baseDir"]}/{title.strip()}/{chapter["chapter"]}'), exist_ok=True)
    while True:
        try:

            req = urllib.request.build_opener()
            req.addheaders = urllib.request.build_opener()
            head = [('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
            urllib.request.install_opener(req)
            request = requests.get(chapter["url"])
            html = BeautifulSoup(request.text, 'html.parser')
            pages = [ page['src'] for page in html.findAll("div", {"class": "col-sm-12 text-center"})[0].findAll("img") if "banner" not in page['src'] ]
            break
        except Exception as e:
            continue

    downloadedPages = list()
    for index, page in enumerate(pages):

        imageSrc = page
        imageSrc = imageSrc
        imageExtension = imageSrc.split('/')[-1].split('.')[-1]

        counter = counterToStr(index)

        pageDir = Path(f'{settings["baseDir"]}/{title.strip()}/{chapter["chapter"]}/{counter}.{imageExtension}')

        if os.path.exists(pageDir):
            fileSizePath = int(os.path.getsize(pageDir))
        else:
            fileSizePath = 0

        while True:
            requestPage = requests.get(imageSrc, stream = True, timeout = 100)
            if requestPage.status_code == 200:
                break
            else:
                print(f"Resposta [{requestPage.status_code}] - Tentando novamente")

        fileSizeOnline = int(requestPage.headers['Content-Length'])

        if fileSizeOnline == fileSizePath:
            downloadedPages.append(f"/uploads/mangas/{title.strip()}/{chapter['chapter']}/{counter}.{imageExtension}")

        if fileSizeOnline != fileSizePath:
            print(" "*50, end="\r")
            print(f" * - Baixando pagina {counter} de {counterToStr(len(pages))} {' '*10}", end="\r")
            while True:
                try:

                    imageData = requestPage.content

                    downloadedPages.append(f"/uploads/mangas/{title.strip()}/{chapter['chapter']}/{counter}.{imageExtension}")
                    with open(pageDir, 'wb') as handler:
                        handler.write(imageData)
                    # print(imageSrc, pageDir)
                    # input()
                    # download = urllib.request.urlretrieve(imageSrc.replace('https', 'http'), "0.jpg")
                    break
                except Exception as e:
                    print(f"Error no download - [ {e} ]")

    chapterDict = dict()
    chapterDict['title'] = title
    chapterDict['chapter'] = chapter['chapter']
    chapterDict['chapterPages'] = downloadedPages
    chapterDict['scan'] = dict()
    chapterDict['scan']['title'] = chapter['sub']['name']
    chapterDict['scan']['slug'] = slugRe(chapter['sub']['name'])
    chapterDict['type'] = 'update'
    chapterDict['createdAt'] = chapter['date']

    if(len(chapterDict['chapterPages']) > 1):
        request = requests.post(f'{defaultUrl}chapters/updateChapters/', json=chapterDict)


    if(request.status_code != 500):
        return True
    return False

def getInfoUnion(url):
    html = getHTML(url)
    new = False

    infoDict = dict()
    perfil = html.findAll("div", {"class": "col-md-8 perfil-manga"})[0]
    title = perfil.findAll("div", {"class": "col-md-12"})[0].find("h2").text.strip()
    sinopse = perfil.findAll("div",{"class": "panel-body"})[0].text.strip()
    title = replace(title)
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
        if(replace(listData[0]) == "Gênero"):
            infoDict[f"{replace(listData[0])}s"] = listData[1].replace(' ', '').split(',')
        else:
            infoDict[replace(listData[0]).title().replace(" ", "")] = ' '.join(listData[1:]).strip()

    if title not in downloadList:
        new = True
    infoDict['chapters'] = getChapters(html,new)
    return infoDict


def updateBannerAndRanks():
    requests.get(f"http://{host}:1337/mangas/banner")
    requests.get(f"http://{host}:1337/mangas/rankers")

def clearTerminal():
    if(os.name == 'nt'):
        os.system('cls')
    else:
        os.system('clear')
    return

def getConnection():
    while True:
        try:
            if(requests.get(f"http://{host}:1337/admin").status_code == 200):
                break
        except Exception as e:
            sleep(5)
            continue
        sleep(5)

def createManga(info):

    data = createMangas.graphRequest(info['Title'])

    info['sinopse'] = info['Sinopse']
    info['genres'] = info['Gêneros']
    if data != None and len(data) > 0:
        data['titleJson'] = info['Title']
        data = {**data, **info}
        data = createMangas.organizeJsonAnilist(data)
        register = createMangas.postCreateGraphql(data).json()
        data['id_manga'] = register['id']
        data['id_download'] = info['id']
        updateDownloadList(data)
        return data

    data = createMangas.organizeJsonLocal(info)
    register = createMangas.postCreateGraphql(data).json()

    data['id_manga'] = register['id']
    data['id_download'] = info['id']
    updateDownloadList(data)
    return data

def updateDownloadList(data):
    mutation = """
        mutation updateDownloadList($input:updateDownloadListInput){
        updateDownloadList(input:$input){
            downloadList{
            id
            }
        }
        }
    """
    variables = {
        "input": {
            "where": {
            "id": data['id_download']
            },
            "data": {
            "mangas": data['id_manga']
            }
        }
    }
    request = requests.post(f'{defaultUrl}graphql', json={'query': mutation, 'variables': variables})

    if request.status_code == 200:
        return request.json()

    return request.status_code

def downloader():


    for item in getDownloadList():
        

        # title= item['mangas']['title']

        # if('helmut' not in item['downloadPages'][0]['url']):
        #     continue

        # if item['mangas']:
        #     continue
        try:
            download = [download for download in item['downloadPages'] if download['name'] == 'union'][0]

            # if(download['Type'] == 'Normal'):
            #     continue
            download['url'] = replaceHost(download['url'])
            info = getInfoUnion(download['url'])

            # input(item['mangas'])
            if not item['mangas']:
                info['id'] = item['id']
                data = createManga(info)


                item['mangas'] = data

        except Exception as e:
            print(e)
            continue


        title= item['mangas']['title']
        slug = item['mangas']['slug']

        print(title)

        
        for chapter in info['chapters']:
            
            if(title not in downloadList):
                downloadList[title] = list()

            if(not verify):
                if(chapter['chapter'] in downloadList[title]):
                    print(f" * - Capitulo {chapter['chapter']} - já baixado {' '*10}", end="\r")
                    continue

            if(verify):

                if(verifyIfChapterDownloaded(int(item['mangas']['id']), chapter['chapter'])):
                    print(f" * - Capitulo {chapter['chapter']} - já na lista {' '*10}", end="\r")
                    continue

            
            existedId = createMangas.verifyIsLocal(slug, chapter['chapter'])
            print()
            print(f" * - Capitulo {chapter['chapter']} - Baixando", end="\r")



            if(download['Type'] == "Online"):
                
                isDownload = registerChapters(chapter, title, existedId)

            if(download['Type'] == "Normal"):
                isDownload = downloadChapter(chapter, title)
                print(" "*40, end="\r")
                print(f" * - Capitulo {chapter['chapter']} - Baixado", end="\r")

            if(isDownload):
                downloadList[title].append(chapter['chapter'])

                jsonSave("downloads.json", downloadList)
        

        if (info['status'] == 'complete'):
            print("Manga completo atualizando lista")
            mutation_remove = """
                mutation RemoveItemFromDownloadList($input: deleteDownloadListInput){
                      deleteDownloadList(input: $input){
                        downloadList{
                          id
                        }
                      }
                    }
            """
            variables_remove = {
              "input": {
                "where": {
                  "id": item['id']
                }
              }
            }
            request = requests.post(f'{defaultUrl}graphql', json={'query': mutation_remove, 'variables': variables_remove})

            mutation_update_complete = """
                mutation UpdateMangaComplete($input: updateMangasInput){
                  updateMangas(input: $input){
                    mangas{
                      title
                      status{
                        label
                      }
                    }
                  }
                }
            """
            variables_update_complete= {
              "input": {
                "where": {
                  "id": item['mangas']['id']
                },
                "data": {
                  "status": 11
                }
              }
            }
        print()

    print()
    return
    # print(Path(settings['baseUrl']))

def counter(initial_seconds):
    secondsAmount = initial_seconds
    while True:
        minutes = floor(secondsAmount / 60)
        seconds = secondsAmount % 60

        print(f"{str(minutes).zfill(2)}:{str(seconds).zfill(2)}", end="\r")
        secondsAmount -= 1
        sleep(1)
        if(secondsAmount <= 0):
            break

# createManga("Bleach")
getConnection()
while True:

    downloader()

    clearTerminal()
    verify=False
    print("Aguardando para reiniciar verificação")
    counter(3200)
    downloadList = jsonLoad("downloads.json")
    updateBannerAndRanks()
