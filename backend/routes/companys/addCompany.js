const { Router } = require('express');
const router = Router();
const Company = require('../../models/Companies');
const cors = require('cors')

router.post('/', async (req, res) => {
    const companyData = req.body;    
    const newCompany = await Company.companyModel.create(companyData)
    .catch(err => {
        console.log('Unable to create Company.' + err.message);
        throwException(err, res);
    });

    res.status(201).json({
        message: 'Company created.',
        newCompany
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