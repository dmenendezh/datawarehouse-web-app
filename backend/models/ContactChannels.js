const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/dbConnector');

const Contact = require ('./Contact');


const channelModel = sequelize.define('channels', {
    channel_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true,
    },
    channel_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    channel_account: {
        type: DataTypes.STRING,
        allowNull:false
    },
    channel_preferences: {
        type: DataTypes.STRING,
        allowNull:false
    },
    contact_id: {
        type: DataTypes.INTEGER,
        references: {
            model:Contact,
            key:'contact_id'
        }        
    }
}, {
    timestamps: false
  });

module.exports = {sequelize, channelModel};