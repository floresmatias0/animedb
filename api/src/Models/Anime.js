const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
            
    sequelize.define('anime', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING(5432),
            allowNull: false,
        },
        origin: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        finish: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        coverImage: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        totalEpisodes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        idYoutube: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        genres: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,  
        }
    });
};