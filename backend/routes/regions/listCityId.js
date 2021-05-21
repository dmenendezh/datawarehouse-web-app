const { Router } = require('express');
const router = Router();
const City = require('../../models/Citys');
const cors = require('cors')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/:countryId', async (req, res) => {
    const country_id = req.params.countryId;

    const cities = await City.cityModel.findAll({ where: { 
        country_id: {
            [Op.like]: '' + country_id + ''
          }
    }})
    .catch(err => throwException(err, res));


    res.status(200).json({
        message: 'Returning city',
        quantity: cities.length,
        cities
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