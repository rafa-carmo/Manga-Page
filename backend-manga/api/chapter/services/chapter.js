'use strict';
const { getRedis, setRedis } = require('../../../config/redisConfig');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service

*/
const slugify = require('slugify');
const axios = require('axios');


const fs = require('fs');
const path = require('path');



async function getByName(name, entityName, search) {
  const item = await strapi.services[entityName].find({[search]: name})
  return item.length ? item[0] : null
}

function Exception(e) {
  return {e, data: e.data && e.data.errors && e.data.errors}
}

async function setRedisFunction(entity, find, key){

  const entityJson = await strapi.services[entity].find(find)

  await setRedis(key, JSON.stringify(entityJson))
  return
}


async function setImage({ chapterData, pageData }) {
  try {
    const { data } = await axios.get(`${pageData.url}`, { responseType: "arraybuffer" });
    const buffer = Buffer.from(data, "base64");

    const FormData = require("form-data");
    const formData = new FormData();

    formData.append("refId", chapterData.id);
    formData.append("ref", "chapter");
    formData.append("field", 'pages');
    formData.append("files", buffer, { filename: `${chapterData.mangas.title}-${chapterData.chapter}-page-${pageData.page}.jpg` });

    console.info(`Uploading ${chapterData.mangas.title} capitulo ${chapterData.chapter} pagina: ${pageData.page}`);

    await axios({
      method: "POST",
      url: `http://${strapi.config.host}:${strapi.config.port}/upload`,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    });
  } catch (error) {
    console.log("setImage", Exception(error));
  }
}


async function deleteChapterFolder(title, chapter){
    const directory = path.join('public','uploads','mangas',title,chapter)
    if(fs.existsSync(directory)){

          fs.rmSync(directory, { recursive: true, force: true })
        }
}

module.exports = {

  async createChapeterApi(params) {
    const mangas = await getByName(params.title, "mangas", 'title')


    if(mangas){
      const chapter = await strapi.services.chapter.find({mangas:mangas.id, chapter: `${params.chapter}`})

      if(chapter.length <= 0) {
        let scan = await getByName(params.scan, 'scan', 'scan')
        if(!scan){
          scan = await strapi.services.scan.create({scan: params.scan, slug: slugify(params.scan, {lower: true})})
        }
        const created_at = params.created_at


        const createChapter = await strapi.services.chapter.create({
          chapter: params.chapter.replace(" ", ""),
          scan,
          mangas,
          created_at
        })

        await params.pages.map((page)=> setImage({chapterData: createChapter, pageData: page}))
      }
    }

    return
  },


  async updateChaptersApi(params) {
    const {title, chapter, type, chapterPages} = params

    const manga = await strapi.services.mangas.findOne({title})
    if(!manga){
      return null
    }


    let databaseChapter = await strapi.services.chapter.findOne({chapter, 'mangas.id': manga.id})


    if (databaseChapter){

      if(type !== 'update') {
        return null
      }
    }

    let scan = await getByName(params.scan.title, 'scan', 'scan')

    if(!scan){
      scan = await strapi.services.scan.create({scan: params.scan.title, slug: slugify(params.scan.slug, {lower: true})})
    }


    if(!!chapterPages){
      const pages = chapterPages.map((page)=>({page}))

      if(type === 'update' & databaseChapter !== null){
        const updateData= {
          scan,
          pages
        }
        const data = await strapi.services.chapter.update({id: databaseChapter.id}, updateData)

        if(pages[0].page.includes('http')){
          deleteChapterFolder(manga.title.trim(), chapter)
        }
        await setRedisFunction('chapter', {"mangas.id": manga.id}, `chapters-manga-id-${manga.id}`)
        console.info('updated')
        return data
      }
      let createdAt = params.createdAt
      if (!createdAt) {
        const date = new Date
        createdAt = date.toISOString()
      }
      console.log(createdAt)
      console.log(strapi.services.chapter.create)
      const data = await strapi.services.chapter.create({chapter, mangas: manga, pages: pages, scan, createdAt})
      await setRedisFunction('chapter', {"mangas.id": manga.id}, `chapters-manga-id-${manga.id}`)
      console.info('created')
      return data
    }

    fs.readdir(path.join('public', 'uploads', 'mangas', title, chapter), (err, files) => {
      files.forEach(async file => {
        if(file === 'pages.json'){
          const rawData = fs.readFileSync(path.join('.','public', 'uploads', 'mangas', title, chapter, 'pages.json'))
          const pages =  JSON.parse(rawData).pages.map((page)=>({page}))
          if (type === 'update') {
            const data = await strapi.services.chapter.update(databaseChapter, {pages})
          }
          deleteChapterFolder(manga.title.trim(), chapter)
          const data = await strapi.services.chapter.create({chapter, mangas: manga, pages: pages})
          await setRedisFunction('chapter', {"mangas.id": manga.id}, `chapters-manga-id-${manga.id}`)
          console.info('created')
          return data
        }
      })
    })
  }
};
