const { Router } = require('express');
const router = Router();
const Channel = require('../../models/Channel');
/*const mdGlobal = require('../../middlewares/mdGlobal');
const mdUsers = require('../../middlewares/mdUsers');
const mdProducts = require('../../middlewares/mdProducts');*/
const cors = require('cors')

router.post('/', /*mdGlobal.validateToken, mdGlobal.checkEmptyBody, mdUsers.userRol, mdProducts.checkDataSended,*/ async (req, res) => {
    const contactChannelData = req.body;
    console.log(contactChannelData)
    
    const newContactChannel = await Channel.channelModel.create(contactChannelData)
    .catch(err => {
        console.log('Unable to create channel contact.' + err.message);
        throwException(err, res);
    });

    res.status(201).json({
        message: 'Channel contact created.',
        newContactChannel
    });
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