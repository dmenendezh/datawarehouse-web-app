const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/dbConnector');
const Citys = require('./Citys');

const companyModel = sequelize.define('companies', {
    company_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true,
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    company_address: {
        type: DataTypes.STRING,
        allowNull:false
    },
    company_email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    company_phone: {
        type: DataTypes.STRING,
        allowNull:false
    },
    city_id: {
        type: DataTypes.INTEGER,
        references: {
            model:Citys,
            key:'city_id'
        }        
    }    
}, {
    timestamps: false
  });

module.exports = {sequelize, companyModel};