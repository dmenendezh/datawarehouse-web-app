const sequelize = require('sequelize');

const DB_HOST = process.env.DB_HOST; //"localhost";
const DB_PORT = process.env.DB_PORT; //3307;
const DB_NAME = process.env.DB_NAME; //"";
const DB_USER = process.env.DB_USER; //root;

const DB_STR_CONN = `mysql://${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelizeObject = new sequelize(DB_STR_CONN);

sequelizeObject.authenticate().then( () => {
    console.log("conexion exitosa");
}).catch(err => {
    console.log(err.message)
});

module.exports = sequelizeObject;