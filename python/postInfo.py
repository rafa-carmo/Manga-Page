import requests, os, json, re


def replaceTitle(title):
    replaceList = ["(Pt-Br)","(pt-br)", "(AMA Scans)", "(Version Neox Scans)", ":"]
    for replace in replaceList:
        title = title.replace(replace, '')
    
    return title

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
    request = requests.post('http://localhost:1337/mangas/createApi', json=data)
    status = request.status_code
    if(status == 400):
        print(f"{data['title']} - Error 400")
        print(request.text)
        return
    print(request)

def diference(value, value2):
    if(value2 == None):
        return value
    if(value != value2):
        return f"{value} - {value2}"
    return value


def urlImageLocal(title, typeImage):
    url = f"http://192.168.5.25:3333/imagens/mangas/{typeImage}/{title}.jpg"
    if(requests.get(url).status_code == 200):
        return url
    return None
def organizeJsonAnilist(data):
    #"http://192.168.5.25:3333/imagens/mangas/capas/"
    banner = data['bannerImage']

    if(banner == None):
        banner = urlImageLocal(data['titleJson'], "banner")

    slug = re.sub(u'[^a-zA-Z0-9áéíóúÁÉÍÓÚâêîôÂÊÎÔãõÃÕçÇ: ]', ' ', replaceTitle(data['title']['userPreferred']))

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
    json['sinopse'] = data['sinopse']
    json['cover'] = data['coverImage']['extraLarge']
    json['banner'] = data['bannerImage']

    postCreateGraphql(json)
    return json



def organizeJsonLocal(data):
    
    slug = re.sub(u'[^a-zA-Z0-9áéíóúÁÉÍÓÚâêîôÂÊÎÔãõÃÕçÇ: ]', ' ', data['Titulo:'].strip())

    genres = data['Gênero(s):'].strip().replace(' ', '')
    genres = genres.split(',')

    json = dict()
    json['title'] = data['Titulo:'].strip()
    json['slug'] =  slug
    json['genres'] = genres
    json['artists'] = [data['Artista:']]
    json['stories'] = [data['Autor:']]
    json['status'] = "Desconhecido"
    json['sinopse'] = data['Sinpopse:'].strip()
    json['cover'] = urlImageLocal(data['Titulo:'], "capas")
    json['banner'] = urlImageLocal(data['Titulo:'], "banner")
    postCreateGraphql(json)
    return json


for root, dir, files in os.walk('infos'):
    for file in files:
        with open(f'infos\\{file}', 'r', encoding="utf-8") as f:
            fileJson = json.load(f)


        fileJson['Titulo:']= replaceTitle(fileJson['Titulo:'])
        data = graphRequest(fileJson['Titulo:'])

        if(data != None):

            data['sinopse'] = fileJson['Sinpopse:'].strip()
            data['titleJson'] = fileJson['Titulo:']
            print(f"Anlist - {fileJson['Titulo:'][:5]} - ", end="")
            organizeJsonAnilist(data)
        
        else:
            print(f"Local - {fileJson['Titulo:'][:5]} - ", end="")
            organizeJsonLocal(fileJson)
