const { Router } = require('express');
const router = Router();
const Region = require('../../models/Regions');
const cors = require('cors')

router.get('/', async (req, res) => {
    const regions = await Region.regionModel.findAll({})
    .catch(err => throwException(err, res));

    res.status(200).json({
        message: 'Returning all available regions.',
        quantity: regions.length,
        regions
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

module.exports = router