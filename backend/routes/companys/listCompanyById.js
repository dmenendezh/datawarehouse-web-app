const { Router } = require('express');
const router = Router();
const Company = require('../../models/Companies');
const cors = require('cors')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/:companyId', async (req, res) => {
    const company_id = req.params.companyId;

    const company = await Company.companyModel.findAll({ where: { 
        company_id: {
            [Op.like]: '' + company_id + ''
          }
    }})
    .catch(err => throwException(err, res));


    res.status(200).json({
        message: 'Returning company',
        quantity: company.length,
        company
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