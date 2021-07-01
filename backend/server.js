//1. importar express y demas librerias
const express = require("express");

const server = express();
const bodyParser = require("body-parser");
const compression = require('compression');


//3. agregar middlewares globales
server.use(express.json()); // parsear el body a un objeto
const cors = require('cors')
server.use(compression());
server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
server.use(express.json());
server.use(bodyParser.json());
var multer = require('multer')

/* RUTAS */
//login and register
server.use('/users/login', require('../backend/routes/users/login'));
server.use('/users/register', require('../backend/routes/users/register'));
server.use('/users/listall', require('../backend/routes/users/listall'));
server.use('/users/searchUser', require('../backend/routes/users/searchUser'));
server.use('/users/editUser', require('../backend/routes/users/edit'));
server.use('/users/deleteUser', require('../backend/routes/users/remove'));


//regions - country and cities
server.use('/regions/createRegion', require('../backend/routes/regions/addRegion'));
server.use('/regions/listRegion', require('../backend/routes/regions/listRegion'));
server.use('/regions/listRegionId', require('../backend/routes/regions/listRegionId'));
server.use('/regions/createCountry', require('../backend/routes/regions/addCountry'));
server.use('/regions/listCountries', require('../backend/routes/regions/listCountries'));
server.use('/regions/createCity', require('../backend/routes/regions/addCity'));
server.use('/regions/treeView', require('../backend/routes/regions/treeView'));
server.use('/regions/listCities', require('../backend/routes/regions/listCities'));
server.use('/regions/listCitiesCountryId', require('../backend/routes/regions/listCityId'));
server.use('/regions/listCityById', require('../backend/routes/regions/listCityById'));

server.use('/regions/editRegion', require('../backend/routes/regions/editRegion'));
server.use('/regions/editCountry', require('../backend/routes/regions/editCountry'));
server.use('/regions/editCity', require('../backend/routes/regions/editCity'));
server.use('/regions/listRegionCountryByCity', require('../backend/routes/regions/listRegionCountryByCity'));
server.use('/regions/listCountryByRegion', require('../backend/routes/regions/listCountryByRegion'));

server.use('/regions/deleteRegion', require('../backend/routes/regions/deleteRegion'));
server.use('/regions/deleteCountry', require('../backend/routes/regions/deleteCountry'));
server.use('/regions/deleteCity', require('../backend/routes/regions/deleteCity'));

//company
server.use('/companies/createCompany', require('../backend/routes/companys/addCompany'));
server.use('/companies/listCompanies', require('../backend/routes/companys/listCompanies'));
server.use('/companies/listCompanyById', require('../backend/routes/companys/listCompanyById'));
server.use('/companies/editCompany', require('../backend/routes/companys/editCompany'));
server.use('/companies/removeCompany', require('../backend/routes/companys/removeCompany'));
server.use('/companies/searchCompany', require('../backend/routes/companys/searchCompany'));



//contacts
server.use('/contacts/createContact', require('../backend/routes/contacts/addContact'));
server.use('/contacts/listContacts', require('../backend/routes/contacts/listContacts'));
server.use('/contacts/deleteContact', require('../backend/routes/contacts/deleteContact'));
server.use('/contacts/editContact', require('../backend/routes/contacts/editContact'));
server.use('/contacts/searchContact', require('../backend/routes/contacts/searchContact'));
server.use('/contacts/addContactChannel', require('../backend/routes/contacts/channels/addContactChannel'));
server.use('/contacts/deleteSelectedContacts', require('../backend/routes/contacts/deleteSelectedContacts'));
server.use('/contacts/removeContact', require('../backend/routes/contacts/removeContact'));
server.use('/contacts/listContactById', require('../backend/routes/contacts/listContactById'));
server.use('/contacts/listChannellsByContact', require('../backend/routes/contacts/channels/listChannellsByContact'));
server.use('/contacts/channels/removeContactChannels', require('../backend/routes/contacts/channels/removeContactChannels'));



server.post("/uploadPhoto", function(req, res) {
  upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
          console.log(err)
          return res.status(500).json(err)
      } else if (err) {
           console.log(err)

          return res.status(500).json(err)
      }
    return res.status(200).send(req.file)
  })
});

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
