const { Router } = require('express');
const router = Router();
const City = require('../../models/Citys');
const cors = require('cors')

router.put('/:cityname', /*mdGlobal.validateToken, mdGlobal.checkEmptyBody, mdUsers.userRol,*/ async (req, res) => {
    const new_regionId = req.body.region_id;
    const new_countryId = req.body.country_id;
    const new_cityName = req.body.city_name;

    console.log("new_regionId: " + new_regionId);
    console.log("new_countryId: " + new_countryId);
    console.log("new_cityName: " + new_cityName);
    console.log("old_cityName: " + req.params.cityname);

    const updateCity = await City.cityModel
    .update({ region_id: new_regionId, country_id: new_countryId, city_name: new_cityName}, { where: { city_name: req.params.cityname } })
    .catch(err => throwException(err, res));

    res.status(201).json({
        message: 'City updated:',
        updateCity
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