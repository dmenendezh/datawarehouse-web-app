const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/dbConnector');

const Company = require ('./Companies');
const Region = require ('./Regions');
const Country = require ('./Countrys');
const City = require ('./Citys');

const contactModel = sequelize.define('contacts', {
    contact_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true,
    },
    contact_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    contact_surname: {
        type: DataTypes.STRING,
        allowNull:false
    },
    contact_charge: {
        type: DataTypes.STRING,
        allowNull:false
    },
    contact_email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    company_id: {
        type: DataTypes.INTEGER,
        references: {
            model:Company,
            key:'company_id'
        }        
    } ,
    region_id: {
        type: DataTypes.INTEGER,
        references: {
            model:Region,
            key:'region_id'
        }        
    },
    country_id: {
        type: DataTypes.INTEGER,
        references: {
            model:Country,
            key:'country_id'
        }        
    },
    city_id: {
        type: DataTypes.INTEGER,
        references: {
            model:City,
            key:'city_id'
        }        
    },
    contact_address: {
        type: DataTypes.STRING,
        allowNull:false
    },
    contact_interest: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
}, {
    timestamps: false
  });

module.exports = {sequelize, contactModel};