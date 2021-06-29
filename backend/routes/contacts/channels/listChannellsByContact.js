const { Router } = require('express');
const router = Router();
const cors = require('cors');
const db = require("../../../database/dbConnector");

router.get('/:contactId', async (req, res) => { 
    try{
        const channel = await db.query("SELECT * FROM channels WHERE contact_id = :contactid", { replacements: { contactid: req.params.contactId }, type: db.QueryTypes.SELECT });
        res.status(200).json({
            message: 'Returning channels by contact',
            quantity: channel.length,
            channel
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