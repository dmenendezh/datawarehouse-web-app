const { Router } = require('express');
const router = Router();
const cors = require('cors');
const db = require("../../database/dbConnector");

router.get('/:cityname', async (req, res) => { 
    console.log("cityname:" + req.params.cityname);

    try{
      const regioncountry = await db.query("select r.region_id, r.region_name, c1.country_id, c2.country_name, c1.city_id, c1.city_name "+
      "from cities c1, countries c2, regions r "+
      "where c1.country_id = c2.country_id "+
      "and c2.region_id = r.region_id "+
      "and c1.city_name = :name", { replacements: { name: req.params.cityname }, type: db.QueryTypes.SELECT });

      res.status(200).json({
            message: 'Returning region and country from city: ' + req.params.cityname,
            quantity: regioncountry.length,
            regioncountry
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