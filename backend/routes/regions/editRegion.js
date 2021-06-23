const { Router } = require('express');
const router = Router();
const Region = require('../../models/Regions');
const cors = require('cors')

router.put('/:regionname', /*mdGlobal.validateToken, mdGlobal.checkEmptyBody, mdUsers.userRol,*/ async (req, res) => {
    const new_regionName = req.body.region_name;
  
    console.log("new_regionName: " + new_regionName);
    console.log("old_regionName: " + req.params.regionname);

    const updateRegion = await Region.regionModel
    .update({ region_name: new_regionName }, { where: { region_name: req.params.regionname } })
    .catch(err => throwException(err, res));

    res.status(201).json({
        message: 'Region updated:',
        updateRegion
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