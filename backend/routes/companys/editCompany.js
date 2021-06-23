const { Router } = require('express');
const router = Router();
const Company = require('../../models/Companies');
const cors = require('cors')

router.put('/:companyId', /*mdGlobal.validateToken, mdGlobal.checkEmptyBody, mdUsers.userRol,*/ async (req, res) => {
    const new_companyName = req.body.company_name;
    const new_companyAddress = req.body.company_address;
    const new_companyEmail = req.body.company_email;
    const new_companyCityId = req.body.city_id;

    console.log("new_companyName: " + new_companyName);
    console.log("new_companyAddress: " + new_companyAddress);
    console.log("new_companyEmail: " + new_companyEmail);
    console.log("new_companyCityId: " + new_companyCityId);
    console.log("companyId: " + req.params.companyId);

    const rst = await Company.companyModel
    .update({ company_name: new_companyName, company_address: new_companyAddress, company_email: new_companyEmail, city_id: new_companyCityId  }, { where: { company_id: req.params.companyId } })
    .catch(err => throwException(err, res));

    res.status(201).json({
        message: 'Company updated:',
        rst
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