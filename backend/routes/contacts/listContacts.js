const { Router } = require('express');
const router = Router();
const Contact = require('../../models/Contact');
const cors = require('cors');
const db = require("../../database/dbConnector");
const Autentication = require('../../middlewares/Autentication');

router.get('/', Autentication.validateToken, async (req, res) => { 
    try{
        const contacts = await db.query("select c1.*, country_name, city_name, company_name from contacts c1, countries c2, cities c3, companies c4 where c1.country_id = c2.country_id and c1.city_id = c3.city_id and c1.company_id = c4.company_id order by c1.contact_id asc", { type: db.QueryTypes.SELECT });
        res.status(200).json({
            message: 'Returning all available contacts.',
            quantity: contacts.length,
            contacts
        });
      }catch(err){
        console.log(err.message);
        throwException(err, res);
      }
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
router.use(cors());

module.exports = router