const { Router } = require('express');
const router = Router();
const City = require('../../models/Citys');
const cors = require('cors')

router.delete('/:cityname', /*mdGlobal.validateToken, mdUsers.userRol,*/ async (req, res) => {
    try{
        const rst = await City.cityModel
        .destroy({ where: { city_name: req.params.cityname } })
        .catch(err => throwException(err, res));

        res.status(201).json({
            message: 'City deleted',
            rst
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