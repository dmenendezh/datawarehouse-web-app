const { Router } = require('express');
const router = Router();
const cors = require('cors');
const db = require("../../database/dbConnector");

router.get('/:contactId', async (req, res) => { 
    try{
        const contact = await db.query("select c.*, c1.company_name, r.region_name, c2.country_name, c3.city_name from contacts c, companies c1, regions r, countries c2, cities c3 where c.company_id = c1.company_id and c.region_id = r.region_id and c.country_id = c2.country_id and c.city_id = c3.city_id and c.contact_id = :contactid", { replacements: { contactid: req.params.contactId }, type: db.QueryTypes.SELECT });
        res.status(200).json({
            message: 'Returning contact',
            quantity: contact.length,
            contact
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