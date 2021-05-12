const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/dbConnector');
const Country = require('./Countrys');

const cityModel = sequelize.define('city', {
    city_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    city_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    country_id: {
        type: DataTypes.INTEGER,
        references: {
            model:Country,
            key:'country_id'
        }        
    }
}, {
    timestamps: false
  });

module.exports = {sequelize, cityModel};