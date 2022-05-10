'use strict';


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */


 const axios = require('axios');
 const slugify = require('slugify');
 const { GraphQLClient, gql } = require('graphql-request')
 const graphQLClient = new GraphQLClient('https://graphql.anilist.co')

 function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function Exception(e) {
  return {e, data: e.data && e.data.errors && e.data.errors}
}


 async function getByName(name, entityName, search) {
  const item = await strapi.services[entityName].find({[search]: name})
  return item.length ? item[0] : null
}

async function create(name, entityName, search, type) {


  const item = await getByName(name, entityName, search)


  if(!item) {
    type === 'label' ?
    await strapi.services[entityName].create({
      label: name,
      value: slugify(name, {lower: true})
    })
    :
    await strapi.services[entityName].create({
      name,
      slug: slugify(name, {lower: true})
    })
    return

}}

async function createManyToManyData(manga) {
  const artistsApi = []
  const genresApi = []
  const storiesApi = []
  const statusApi = []
  const originApi = []



  const { stories, genres, artists, origin, status } = manga;

  genres &&
  genres.forEach((item) => {
    genresApi[item] = true;
  });

  status &&
  [status].forEach((item) => {
    statusApi[item] = true;
  });

  origin &&
  [origin].forEach((item) => {
    originApi[item] = true;
  });

  artists && Array.isArray(artists) ? artistsApi[artists[0]] = true : artistsApi[artists] = true
  stories && Array.isArray(stories) ? storiesApi[stories[0]] = true : storiesApi[stories] = true

  return Promise.all([
    ...Object.keys(artistsApi).map((name) => create(name, "artist", "name")),
    ...Object.keys(genresApi).map((name) => create(name, "genres", "label", "label")),
    ...Object.keys(storiesApi).map((name) => create(name, "story", "name")),
    ...Object.keys(statusApi).map((name) => create(name, "status", "label", "label")),
    ...Object.keys(originApi).map((name) => create(name, "origins", "label", "label")),
  ]);
}

async function setImage({ image, mangaData, field = "cover" }) {
  try {
    const { data } = await axios.get(`${image}`, { responseType: "arraybuffer" });
    const buffer = Buffer.from(data, "base64");

    const FormData = require("form-data");
    const formData = new FormData();

    formData.append("refId", mangaData.id);
    formData.append("ref", "mangas");
    formData.append("field", field);
    formData.append("files", buffer, { filename: `${mangaData.slug}-${field}.jpg` });

    console.info(`Uploading ${field} image: ${mangaData.slug}.jpg`);

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


async function createManga(manga) {
  const item = await getByName(manga.title, "mangas", "title")

  if(!item){
    console.info(`Criando: ${manga.title}...`)



    const mangaData = await strapi.services.mangas.create({
      title: manga.title,
      slug: slugify(manga.slug, '-'),
      romajiName: manga.romajiName,
      originalName: manga.originalName,
      englishName: manga.englishName,
      genres: await Promise.all(manga.genres.map((name)=> getByName(name, "genres", "label"))),
      origin: await getByName(manga.origin, "origins", "label"),
      artists:  [await getByName(manga.artists[0], "artist", "name")],
      stories: [await getByName(manga.stories[0], "story", "name")],
      status: await getByName(manga.status, "status", "label"),
      sinopse: manga.sinopse
    })
    //  console.log(mangaData)

     await setImage({image: manga.cover, mangaData})
     await setImage({image: manga.banner, mangaData, field: "banner"})

    await timeout(2000)

    return mangaData
  }

  return item
}


module.exports = {

  async createApi(params){

    await  createManyToManyData(params)

    return await  createManga(params)
  },

  async updateData(mangaData){

    const manga = await strapi.services.mangas.findOne({id: mangaData.id})
    if(manga){
      const query = gql`
      query Search($search: String){
        Media(search: $search, type: MANGA) {
          id
          title {
          english
          romaji
          native
          }
          countryOfOrigin
          staff {
            edges {
            node {
              name {
              userPreferred
              }
            }
            role
            }
          }

          idMal
          id
          status
          type
          coverImage {
          extraLarge
          color
          }
          bannerImage
        }
        }
    `
        const data = await graphQLClient.request(query, {search: manga.title})

        if(data.response){
          return {error: "Not found in Anilist"}
        }

        const origin = data.Media.countryOfOrigin === "CH" ? "china" : data.Media.countryOfOrigin === 'JP' ? "japao" : "coreia"

        const country = await strapi.services.origins.findOne({value: origin})
        const status = await strapi.services.status.findOne({value: data.Media.status.toLowerCase()})
        const artists = data.Media.staff.edges.filter((item)=> (item.role.includes('Art') || item.role.includes('Illustration')))
        const stories = data.Media.staff.edges.filter((item)=> (item.role.includes('Story')))

        await create(artists[0].node.name.userPreferred, "artist", "name")
        await create(stories[0].node.name.userPreferred, "story", "name")



        const updateData = {
          englishName: data.Media.title.english,
          originalName: data.Media.title.native,
          romajiName: data.Media.title.romaji,
          id_anilist: `${data.Media.id}`,
          origin: country.id,
          status: status.id,
          artists: [await getByName(artists[0].node.name.userPreferred, "artist", "name")],
          stories: [await getByName(stories[0].node.name.userPreferred, "story", "name")],
        }


        if(!manga.banner){
          data.Media.bannerImage && setImage({image: data.Media.bannerImage, mangaData: manga, field: 'banner'})
        }
        return await strapi.services.mangas.update({id: manga.id},updateData)

    }
  },


  async banner() {
    //update banners list randomly
    const mangas = await strapi.services.mangas.find()
    const range = () => Math.floor(Math.random() * (mangas.length )) + 1

    const banners = await strapi.services.banners.find()

    await banners.map(async (banner) => {
      await strapi.services.banners.update({id: banner.id}, { mangas: null})

    })

    for(let banner = 0; banner < banners.length; banner++) {

      while (true){

        let index = range()
        let bannerFind = await strapi.services.banners.findOne({'mangas.title': mangas[index -1].title })
        if(bannerFind === null){
          await strapi.services.banners.update({id: banners[banner].id}, { mangas: mangas[index -1].id})
          break
        }

      }
    }
    return
  },

  async rank(){
    //update rank list from anilist api





    const query = gql`
          {
          Page(page: 1, perPage: 10) {
            pageInfo {
              total
              currentPage
              lastPage
              hasNextPage
              perPage
            }
            media(sort: TRENDING_DESC, type: MANGA, genre_not_in: "Hentai") {
              id
              title {
                userPreferred
              }
              coverImage{
                extraLarge
              }
              genres
              siteUrl

            }
          }
          }
        `

    const data = await graphQLClient.request(query)

    const ranks = await strapi.services.rank.find()



    for(let rank = 0; rank < 10; rank++) {
      if(await strapi.services.rank.findOne({id: ranks[rank].id})){
        data.Page.media.map(async (manga, index) => {

          await strapi.services.rank.update({id: ranks[index].id}, {
            title: manga.title.userPreferred,
            cover: manga.coverImage.extraLarge,
            genres: manga.genres.join(','),
            url: manga.siteUrl,
            rank: `${index}`
          }).catch((err) => {console.log(err)});

        })
      }else{
        await strapi.services.rank.create({
          title: data.Page.media[rank].title.userPreferred,
          cover: data.Page.media[rank].coverImage.extraLarge,
          genres: data.Page.media[rank].genres.join(','),
          url: data.Page.media[rank].siteUrl,
          rank
        })
      }
    }
    return


  }
}
