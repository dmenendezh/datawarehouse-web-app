const { Router } = require('express');
const router = Router();
const Contact = require('../../models/Contact');
const db = require("../../database/dbConnector");

router.delete('/:contactmail', /*mdGlobal.validateToken, mdUsers.userRol,*/ async (req, res) => {
    try{
        const delChannelsContact = await db.query("delete from channels where contact_id = (select contact_id from contacts where contact_email = '"+ contactChannelData.contact_email + "'))", { type: db.QueryTypes.DELETE });

        const deletedContact = await Contact.contactModel
        .destroy({ where: { contact_email: req.params.contactmail } })
        .catch(err => throwException(err, res));


        res.status(201).json({
            message: 'Contact deleted:',
            deletedContact
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

module.exports = router;