const { DataTypes } = require ('sequelize');
const sequelize = require ('../database/dbConnector');

const usersModel = sequelize.define('users', {
    usr_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true,
    },
    usr_login: {
        type: DataTypes.STRING,
        allowNull:false
    },
    usr_phone: {
        type: DataTypes.STRING,
        allowNull:false
    },
    usr_address: {
        type: DataTypes.STRING,
        allowNull:false
    },
    usr_password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    usr_email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    usr_admin_flag: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
}, {
    timestamps: false
  });

module.exports = {sequelize, usersModel};