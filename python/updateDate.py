import requests

def update():
    query = """
    {
    chapters(limit: 1000, sort:"createdAt:desc"){
        id
        mangas{
            title
        }
        chapter
        createdAt
        created_at
    }
    }
    """

    chapters = requests.post('http://192.168.5.25:1337/graphql', json={"query": query}).json()["data"]["chapters"]

    if(len(chapters) <= 0):
        return False

    print("verificando")
    count = 1
    for chapter in chapters:
        if not chapter['createdAt']:
            mutation = """
                mutation updateChapter($input: updateChapterInput){
                updateChapter(input: $input){
                    chapter{
                            id
                    mangas{
                        title
                    }
                    createdAt
                    created_at
                    }
                }
                }
            """
            variables = {
                "input":{
                    "where": {
                    "id": chapter['id']
                    },
                    "data": {
                    "createdAt": chapter['created_at']
                    }
                }
            }
            update = requests.post('http://192.168.5.25:1337/graphql', json={"query": mutation, "variables" : variables})
            print(f"* {count} - {chapter['mangas']['title']} - {chapter['chapter']} - {update.status_code}")
        count += 1
    return True


while True:
    if not update():
        break