import requests, json, re
from bs4 import BeautifulSoup
from time import sleep

def jsonLoad(file):
    with open(file, 'r', encoding="utf-8") as f:
        return json.load(f)

settings = jsonLoad("settings.json")

def verifyIsLocal(slug, chapter):
  query = """
    query Verify($slug: String, $chapter: String) {
    chapters(where: {chapter: $chapter, mangas: {slug: $slug} }){
        id
        pages{
          page
        }
      }
    }
  """
  variables = {
    "slug": slug,
    "chapter": chapter
  }

  chapters = requests.post(f'http://{settings["databaseHost"]}:1337/graphql', json={'query': query, 'variables': variables}).json()

  try:
    if('http' not in chapters['data']['chapters'][0]['pages'][0]['page']):
      return chapters['data']['chapters'][0]['id']
    return False
  except Exception as e:
    print(e)
    return False

def graphRequest(name):

    query = """
        query search($search: String){
        Media(search: $search, format: MANGA) {
            countryOfOrigin
            id
            idMal
            status
            staff{
            edges{
                node{
                name {
                full
                    native
                }
                primaryOccupations
                }
            }
            }
            title {
            userPreferred
            romaji
            english
            native
            }
            coverImage {
            extraLarge
            }
            genres
            siteUrl
            trending
            bannerImage
        }
        }
    """

    variables = {
        "search": name
    }

    url = 'https://graphql.anilist.co'


    response = requests.post(url, json={'query': query, 'variables': variables})
    if(response.status_code == 200):
        return response.json()['data']['Media']
    else: return None


def postCreateGraphql(data):
    request = requests.post(f'http://{settings["databaseHost"]}:1337/mangas/createApi', json=data)
    status = request.status_code
    if(status == 400):
        print(f"{data['title']} - Error 400")
        print(request.text)
        return

    print(request)
    return request

def diference(value, value2):
    if(value2 == None):
        return value
    if(value != value2):
        return f"{value} - {value2}"
    return value


def urlImageLocal(title, typeImage):
    url = f"http://192.168.5.25:3333/imagens/mangas/{typeImage}/{title}.jpg"
    try:
        if(requests.get(url).status_code == 200):
            return url
        return None
    except Exception as e:
        return None

def organizeJsonAnilist(data):
    #"http://192.168.5.25:3333/imagens/mangas/capas/"
    banner = data['bannerImage']

    if(banner == None):

        banner = urlImageLocal(data['titleJson'], "banner")

    slug = re.sub(u'[^a-zA-Z0-9áéíóúÁÉÍÓÚâêîôÂÊÎÔãõÃÕçÇ: ]', ' ', replace(data['title']['userPreferred']))

    json = dict()
    json['title'] = data['titleJson']
    json['slug'] =  slug
    json['romajiName'] = data['title']['romaji']
    json['originalName'] = data['title']['native']
    json['englishName'] = data['title']['english']
    json['genres'] = data['genres']
    json['origin'] = data['countryOfOrigin']
    json['artists'] = [ diference(staff["node"]["name"]["full"], staff["node"]["name"]["native"]) for staff in data['staff']['edges']]
    json['stories'] = [ diference(staff["node"]["name"]["full"], staff["node"]["name"]["native"]) for staff in data['staff']['edges']]
    json['status'] = data['status'].title()
    json['sinopse'] = data['sinopse'].strip()
    json['cover'] = data['coverImage']['extraLarge']
    json['banner'] = data['bannerImage']

    postCreateGraphql(json)
    return json

def organizeJsonLocal(data):

    slug = re.sub(u'[^a-zA-Z0-9áéíóúÁÉÍÓÚâêîôÂÊÎÔãõÃÕçÇ: ]', ' ', data['Title'].strip())

    if data['genres']:
        genres = data['genres']

    else:
        genres = data['Gênero'].strip().replace(' ', '')
        genres = genres.split(',')


    json = dict()
    json['title'] = data['Title'].strip()
    json['slug'] =  slug
    json['genres'] = genres
    json['artists'] = [data['Artista']]
    json['stories'] = [data['Autor']]
    json['status'] = data['Status']
    json['sinopse'] = data['Sinopse'].strip()
    json['cover'] = urlImageLocal(data['Title'], "capas")
    json['banner'] = urlImageLocal(data['Title'], "banner")
    postCreateGraphql(json)
    return json



def replace(text):
    replaceList = [":", "|", "(s)", "  ", "(Pt-Br)", "(pt-br)", "(AMA Scans)", "(Version Neox Scans)", " (Remake)", " (Drope Scans Version)"]

    for replaceItem in replaceList:
        text = text.replace(replaceItem, '')
    return text

def getInfo(html):
    infoDict = dict()
    perfil = html.findAll("div", {"class": "col-md-8 perfil-manga"})[0]
    title = perfil.findAll("div", {"class": "col-md-12"})[0].find("h2").text.strip()
    sinopse = perfil.findAll("div",{"class": "panel-body"})[0].text.strip()
    title = replace(title)
    cover = perfil.findAll("div", {"class": "col-md-4 col-xs-12 text-center col-md-perfil"})[0].find("img")['src']

    infoDict['Title'] = title
    infoDict['Sinopse'] = sinopse
    infoDict['Cover'] = cover

    infos = perfil.findAll("h4", {"class": "media-heading manga-perfil"})
    for info in infos:

        listData = info.text.strip().split(":")
        if(replace(listData[0]) == "Gênero"):
            infoDict[f"{replace(listData[0])}s"] = listData[1].replace(' ', '').split(',')
        else:
            infoDict[replace(listData[0]).title().replace(" ", "")] = ' '.join(listData[1:]).strip()
    return infoDict


def getChapters(html):
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

        chapterTemp['chapter'] = chapterTitle
        chapterTemp['url'] = chapterUrl
        chapterTemp['sub'] = dict()
        chapterTemp['sub']['name'] = subName
        chapterTemp['sub']['url'] = subUrl
        infoChapter.append(chapterTemp)
        # col-xs-6 col-md-6
    return infoChapter


def getMangaLocal(title):

    query = """
        query SearchMangas($search: String){
        mangases(where:{ title: $search}){
            id
            title
        }
        }
    """
    variables = {
        "search": title
    }

    manga = requests.post(f'http://{settings["databaseHost"]}:1337/graphql', json={'query': query, 'variables': variables})
    if(manga.status_code == 200):
        return manga.json()['data']['mangases']
    return None

def createDownloadList(data):
    mutation = """
    mutation createDownload($input: createDownloadListInput){
        createDownloadList(input: $input){
            downloadList{
            id
            }
        }
        }
    """

    variables= {
        "input": {
            "data": {
                "mangas": data['manga']['id'],
                "downloadPages": {
                    "name": "union",
                    "url": data['url'],
                    "Type": data['type']
                }
            }
        }
    }

    request = requests.post(f'http://{settings["databaseHost"]}:1337/graphql', json={'query': mutation, 'variables': variables})
    return request


def forCreate(fileList, type):
    for url in fileList:

        request = requests.get(url)
        if(request.status_code != 200):
            print(f"Erro de conexão - {url}")
            continue

        # with open('file.html', 'w', encoding="utf-8") as f:
        #     f.write(request.text)
        # with open('file.html', 'r', encoding="utf-8") as f:
        #     request = '\n'.join(f.readlines())

        html = BeautifulSoup(request.text, 'html.parser')
        info = getInfo(html)
        print(info['Title'])
        chapters = getChapters(html)
        info['url'] = url

        inList = None

        while True:
            listLocal = getMangaLocal(info['Title'])
            if(len(listLocal) > 0):
                inList = getMangaLocal(info['Title'])[0]
                break
            data = graphRequest(info['Title'])


            if(data != None):

                data['sinopse'] = info['Sinopse'].strip()
                data['titleJson'] = info['Title']
                print(f"Anlist - {info['Title'][:5]} - ", end="")

                organizeJsonAnilist(data)

            else:
                print(f"Local - {info['Title'][:5]} - ", end="")
                organizeJsonLocal(info)

            sleep(10)
        info['manga'] = inList
        info['type'] = type
        print(f" {info['Title']} - {createDownloadList(info)}")




# with open('links.json', 'r', encoding="utf-8") as f:
#     file = json.load(f)

# forCreate(file['MangasOnline'], "Online")
# forCreate(file['Mangas'], "Normal")
