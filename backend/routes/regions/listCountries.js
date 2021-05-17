const { Router } = require('express');
const router = Router();
const Country = require('../../models/Countrys');
const cors = require('cors');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/:regionid', async (req, res) => {

    const regionId = req.params.regionid;

    const countries = await Country.countryModel.findAll({ where: { 
        region_id: {
            [Op.like]: '' + regionId + ''
          }
    }})
    .catch(err => throwException(err, res));


    res.status(200).json({
        message: 'Returning all available countries.',
        quantity: countries.length,
        countries
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