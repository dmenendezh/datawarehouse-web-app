const { Router } = require('express');
const router = Router();
const Company = require('../../models/Companies');
const cors = require('cors');
const db = require("../../database/dbConnector");

router.get('/', async (req, res) => { 
    try{
        const companies = await db.query("select c1.*, c2.city_name, c3.country_name from companies c1, cities c2, countries c3 where c1.city_id = c2.city_id and c2.country_id = c3.country_id order by c1.company_id asc", { type: db.QueryTypes.SELECT });
        res.status(200).json({
            message: 'Returning all available companies.',
            quantity: companies.length,
            companies
        });
      }catch(err){
        console.log(err.message);
        throwException(err, res);
      } 

    /*const companies = await Company.companyModel.findAll({})
    .catch(err => throwException(err, res));
    
    res.status(200).json({
        message: 'Returning all available companies.',
        quantity: companies.length,
        companies
    });*/
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