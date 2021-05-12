const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/dbConnector');

const regionModel = sequelize.define('regions', {
    region_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    region_name: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    timestamps: false
});
module.exports = {sequelize, regionModel};




