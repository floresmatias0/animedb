const { Anime } = require('../../db')
const axios = require('axios')

module.exports = {
    apiToDb: async (offset) => {
        await axios.get(`
        https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${offset}
        `)
        .then(async(animes) => {
            let arr = animes.data.data;
            for(let i = 0; i < arr.length; i++){
                await Anime.findOrCreate({
                    where:{
                        name: arr[i].attributes.titles.en || arr[i].attributes.titles.en_jp
                    },
                    defaults:{
                        origin: arr[i].attributes.startDate,
                        description: arr[i].attributes.synopsis,
                        finish: arr[i].attributes.endDate,
                        status: arr[i].attributes.status,
                        image: arr[i].attributes.posterImage,
                        coverImage: arr[i].attributes.coverImage,
                        totalEpisodes: arr[i].attributes.totalLength,
                        idYoutube: arr[i].attributes.youtubeVideoId,
                        genres: await axios.get(arr[i].relationships.genres.links.related).then(genre =>{
                            let arr = []
                            genre.data.data.map(point => {                              
                                arr.push(point.attributes.name)
                            })
                            return arr
                        })
                    }
                })
            }
        })

        return await Anime.findAll();
    }
}