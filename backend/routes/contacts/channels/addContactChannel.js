const { Router } = require('express');
const router = Router();
const cors = require('cors')
const db = require("../../../database/dbConnector");

router.post('/', async (req, res) => {
    const contactChannelData = req.body;
    console.log(contactChannelData)
    
    try{
        const newContactChannel = await db.query("insert into channels (channel_name,channel_account,channel_preferences,contact_id) values ('"+contactChannelData.channel_name+"','"+contactChannelData.channel_account+"','"+contactChannelData.channel_preferences+"', (select contact_id from contacts where contact_email = '"+ contactChannelData.contact_email + "'))", { type: db.QueryTypes.INSERT });
       
        res.status(201).json({
            message: 'Channel contact created.',
            newContactChannel
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

module.exports = router;