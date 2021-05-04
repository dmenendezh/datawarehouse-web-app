//1. importar express y demas librerias
const express = require("express");

const server = express();
const bodyParser = require("body-parser");

//3. agregar middlewares globales
server.use(express.json()); // parsear el body a un objeto
server.use(bodyParser.json());
const cors = require('cors')

/* RUTAS */

//login
server.use('/users/login', require('../backend/routes/users/login'));
server.use(cors());


/* RUTAS */


const PORT = process.env.APP_PORT ? process.env.APP_PORT : 3000;

//5. levantar el servidor
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
