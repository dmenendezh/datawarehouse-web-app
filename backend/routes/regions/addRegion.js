const { Router } = require('express');
const router = Router();
const Region = require('../../models/Regions');
/*const mdGlobal = require('../../middlewares/mdGlobal');
const mdUsers = require('../../middlewares/mdUsers');
const mdProducts = require('../../middlewares/mdProducts');*/
const cors = require('cors')

router.post('/', /*mdGlobal.validateToken, mdGlobal.checkEmptyBody, mdUsers.userRol, mdProducts.checkDataSended,*/ async (req, res) => {
    const regionData = req.body;
    console.log(regionData)
    
    const newRegion = await Region.regionModel.create(regionData)
    .catch(err => {
        console.log('Unable to create region.' + err.message);
        throwException(err, res);
    });

    res.status(201).json({
        message: 'Region created.',
        newRegion
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