from defaults.utils import Utils

class UnionMapperToDomain:
    @classmethod
    def chapterToDomain(cls, info, chapter) -> dict:
       
        chapterDict = dict()
        chapterDict['title'] = info['title']
        chapterDict['chapter'] = chapter['chapter']
        chapterDict['chapterPages'] = chapter['pages']

        chapterDict['scan'] = dict()
        chapterDict['scan']['title'] = chapter['sub']['name']
        chapterDict['scan']['slug'] = Utils.slug(chapter['sub']['name'])
        chapterDict['type'] = 'update'
        chapterDict['createdAt'] = chapter['date']  

        return chapterDict
