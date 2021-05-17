//1. importar express y demas librerias
const express = require("express");

const server = express();
const bodyParser = require("body-parser");
const compression = require('compression');

//3. agregar middlewares globales
server.use(express.json()); // parsear el body a un objeto
server.use(bodyParser.json());
const cors = require('cors')
server.use(compression());


/* RUTAS */

//login
server.use('/users/login', require('../backend/routes/users/login'));
server.use('/users/register', require('../backend/routes/users/register'));
server.use('/users/listall', require('../backend/routes/users/listall'));
server.use('/users/searchUser', require('../backend/routes/users/searchUser'));

//add
server.use('/regions/createRegion', require('../backend/routes/regions/addRegion'));
server.use('/regions/listRegion', require('../backend/routes/regions/listRegion'));
server.use('/regions/listRegionId', require('../backend/routes/regions/listRegionId'));

server.use('/regions/createCountry', require('../backend/routes/regions/addCountry'));
server.use('/regions/listCountries', require('../backend/routes/regions/listCountries'));
server.use('/regions/createCity', require('../backend/routes/regions/addCity'));

server.use('/regions/treeView', require('../backend/routes/regions/treeView'));

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
