const { Router } = require('express');
const router = Router();
const Channel = require('../../../models/ContactChannels');
const cors = require('cors')

router.delete('/:contactId', /*mdGlobal.validateToken, mdUsers.userRol,*/ async (req, res) => {
    try{
        const channels = await Channel.channelModel
        .destroy({ where: { contact_id: req.params.contactId } })
        .catch(err => throwException(err, res));

        res.status(201).json({
            message: 'Contact channels deleted',
            quantity: channels.length,
            channels
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