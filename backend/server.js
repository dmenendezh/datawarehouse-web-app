//1. importar express y demas librerias
const express = require("express");

const server = express();
const bodyParser = require("body-parser");

//3. agregar middlewares globales
server.use(express.json()); // parsear el body a un objeto
server.use(bodyParser.json());

/* RUTAS */

//login
server.use('/users/login', require('../backend/routes/users/login'));


/* RUTAS */


const PORT = process.env.APP_PORT ? process.env.APP_PORT : 3000;

//5. levantar el servidor
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});