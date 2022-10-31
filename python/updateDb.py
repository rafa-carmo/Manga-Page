import requests
from time import sleep


def getMangasFromServer():
	query = """
		{
		  mangases {
		    id
		    title
		    englishName
		    id_anilist
		  }
		}
	"""
	request = requests.post('http://192.168.5.25:1337/graphql', json={"query": query})
	if(request.status_code == 200):
		return request.json()['data']['mangases']

	return

def getInfoFromAnilist(name):

	url = 'https://graphql.anilist.co'
	query = """
        query search($search: String){
	        Media(search: $search, format: MANGA) {
	            countryOfOrigin
	            id
	            title {
			            userPreferred
			            romaji
			            english
			            native	
	            	}
	        	}
	        }
    """
	variables = {"search": name}
	while True:
		response = requests.post(url, json={'query': query, 'variables': variables})
		if(response.status_code != 429):
			break
		print("Aguardando servidor liberar...")
		sleep(30)
		
	if(response.status_code == 200):
			return response.json()['data']['Media']
	print(f"{name} - not found")
	return None

def updateData(id, data):
	mutation = """
		mutation updateManga($input: updateMangasInput) {
  			updateMangas(input: $input){
		    mangas{
		      id
		    }
		  }
		}
	"""

	filterData = {}
	filterData["id_anilist"] = str(data['id'])
	filterData["originalName"] = data['title']['native']
	filterData["romajiName"] = data['title']['romaji']
	filterData["englishName"] = data['title']['english']

	variables = {
	  "input": {
	    "where": {
	      "id": id
	    },
	    "data":filterData
	  }
	}
	
	response = requests.post('http://192.168.5.25:1337/graphql', json={'query': mutation, 'variables': variables})
	if(response.status_code == 200):
		print(f"{data['title']['userPreferred']} - Atualizado")

def main():
	print("Iniciando script...")
	mangas = getMangasFromServer()
	for manga in mangas:
		anilistManga = getInfoFromAnilist(manga['title'] if manga['englishName'] == None else manga['englishName'])
		if(anilistManga != None):
			updateData(manga['id'], anilistManga)

if __name__ == '__main__':
	main()
