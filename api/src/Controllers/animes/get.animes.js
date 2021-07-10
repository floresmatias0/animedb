const { Anime } = require('../../db');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
    getAnimeByName: async (animeName) => {
        return await Anime.findAll({
          where: {
            name: {
              [Op.iLike]: '%' + animeName + '%'
            }
          }
        });
      },
      getAnimeById: async (animeId) => {
        return await Anime.findOne({
          where: {
            id: animeId
          }
        });
      }

}