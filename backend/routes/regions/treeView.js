const { Router } = require('express');
const router = Router();
const cors = require('cors')
const db = require("../../database/dbConnector");

router.get('/', async (req, res) => {
    try{
        const treeview = await db.query("select r.region_name, c.country_name, ci.city_name from regions r, countries c, cities ci where r.region_id = c.region_id and ci.country_id = c.country_id order by r.region_name, c.country_name, ci.city_name", { type: db.QueryTypes.SELECT });
        res.status(200).json({
            message: 'Returning treeview',
            quantity: treeview.length,
            treeview
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