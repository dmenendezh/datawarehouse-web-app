const { Router } = require('express');
const router = Router();
const Contact = require('../../models/Contact');
const db = require("../../database/dbConnector");
const cors = require('cors')

router.delete('/:contactid', /*mdGlobal.validateToken, mdUsers.userRol,*/ async (req, res) => {
    try{
        console.log("contact a borrar= " + req.params.contactid);

        const delChannelsContact = await db.query("delete from channels where contact_id =" + req.params.contactid , { type: db.QueryTypes.DELETE });

        const rst = await Contact.contactModel
        .destroy({ where: { contact_id: req.params.contactid } })
        .catch(err => throwException(err, res));


        res.status(201).json({
            message: 'Contact deleted:',
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