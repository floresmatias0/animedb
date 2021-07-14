const { Anime } = require('../../db')
const axios = require('axios')

module.exports = {
    apiToDb: async (offset) => {
        console.log(offset)
        let createAnime = setInterval(async()=>{

            await axios.get(`
            https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${offset}
            `)
            .then(async(animes) => {
                
                let arr = animes.data.data;
                for(let i = 0; i < arr.length; i++){
                    await Anime.findOrCreate({
                        where:{
                            name: arr[i].attributes.canonicalTitle
                        },
                        defaults:{
                            origin: arr[i].attributes.startDate,
                            description: arr[i].attributes.synopsis ? arr[i].attributes.synopsis : "no description",
                            finish: arr[i].attributes.endDate,
                            status: arr[i].attributes.status,
                            image: arr[i].attributes.posterImage,
                            coverImage: arr[i].attributes.coverImage,
                            totalEpisodes: arr[i].attributes.totalLength,
                            popularity: arr[i].attributes.popularityRank,
                            idYoutube: arr[i].attributes.youtubeVideoId,
                            genres: await axios.get(arr[i].relationships.genres.links.related).then(genre =>{
                                let arr = []
                                genre.data.data.forEach(point => {                              
                                    arr.push(point.attributes.name)
                                })
                                return arr
                            })
                        }
                    })
                }
            })

            offset+=20
            if(offset > 16710 && offset <= 16732){
            clearInterval(createAnime)
            }
        },500)
    }
}