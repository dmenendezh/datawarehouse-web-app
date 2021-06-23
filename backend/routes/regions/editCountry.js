const { Router } = require('express');
const router = Router();
const Country = require('../../models/Countrys');
const cors = require('cors')

router.put('/:countryname', /*mdGlobal.validateToken, mdGlobal.checkEmptyBody, mdUsers.userRol,*/ async (req, res) => {
    const new_countryName = req.body.country_name;
    const new_regionId = req.body.region_id;

    console.log("new_regionId: " + new_regionId);
    console.log("new_CountryName: " + new_countryName);
    console.log("old_CountryName: " + req.params.countryname);

    const updateCountry = await Country.countryModel
    .update({ region_id: new_regionId, country_name: new_countryName }, { where: { country_name: req.params.countryname } })
    .catch(err => throwException(err, res));

    res.status(201).json({
        message: 'Country updated:',
        updateCountry
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