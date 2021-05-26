const { Router } = require('express');
const router = Router();
const Contact = require('../../models/Contact');

router.put('/:contactmail', /*mdGlobal.validateToken, mdGlobal.checkEmptyBody, mdUsers.userRol,*/ async (req, res) => {
    const name = req.body.contact_name;
    const surname = req.body.contact_surname;
    const charge = req.body.contact_charge;
    const mail = req.body.contact_email;
    const company_id = req.body.company_id;
    const region_id = req.body.region_id;
    const country_id = req.body.country_id;
    const city_id = req.body.city_id;
    const address = req.body.contact_address;
    const interest = req.body.contact_interest;

    const updatedContact = await Contact.contactModel
    .update({ contact_name: name, contact_surname: surname, 
        contact_charge: charge, contact_email: mail,
        company_id: company_id, region_id: region_id, country_id: country_id, city_id: city_id,
    contact_address: address, contact_interest: interest }, { where: { contact_email: req.params.contactmail } })
    .catch(err => throwException(err, res));

    res.status(201).json({
        message: 'Contact updated:',
        updatedContact
    });
});

const throwException = (err, res) => {
    res.status(500).json({
        message: 'There was a problem with the database.',
        error: err
    });
};

module.exports = router;