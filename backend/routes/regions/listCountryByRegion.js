const { Router } = require('express');
const router = Router();
const cors = require('cors');
const db = require("../../database/dbConnector");

router.get('/:regionname', async (req, res) => { 
    console.log("regionname:" + req.params.regionname);

    try{
      const countries = await db.query("select c2.country_id, c2.country_name "+
      "from countries c2, regions r "+
      "where c2.region_id = r.region_id "+
      "and r.region_name = :name", { replacements: { name: req.params.regionname }, type: db.QueryTypes.SELECT });

      res.status(200).json({
            message: 'Returning countries from region: ' + req.params.regionname,
            quantity: countries.length,
            countries
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