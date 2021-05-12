const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/dbConnector');
const Region = require('./Regions');

const countryModel = sequelize.define('country', {
    country_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    country_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    region_id: {
        type: DataTypes.INTEGER,
        references: {
            model:Region,
            key:'region_id'
        }        
    }
}, {
    timestamps: false
  });

module.exports = {sequelize, countryModel};