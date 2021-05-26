const { Router } = require('express');
const router = Router();
const Contact = require('../../models/Contact');

router.delete('/:contactmail', /*mdGlobal.validateToken, mdUsers.userRol,*/ async (req, res) => {
    const deletedContact = await Contact.contactModel
    .destroy({ where: { contact_email: req.params.contactmail } })
    .catch(err => throwException(err, res));

    res.status(201).json({
        message: 'Contact deleted:',
        deletedContact
    });
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};

module.exports = router;