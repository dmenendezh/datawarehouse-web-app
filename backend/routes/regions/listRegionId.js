const { Router } = require('express');
const router = Router();
const Region = require('../../models/Regions');
const cors = require('cors')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/:regionName', async (req, res) => {
    const region_name = req.params.regionName;

    const region = await Region.regionModel.findAll({ where: { 
        region_name: {
            [Op.like]: '' + region_name + ''
          }
    }})
    .catch(err => throwException(err, res));


    res.status(200).json({
        message: 'Returning region id',
        quantity: region.length,
        region
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