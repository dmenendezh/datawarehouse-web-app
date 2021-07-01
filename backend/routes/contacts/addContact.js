const { Router } = require('express');
const router = Router();
const Contact = require('../../models/Contact');
const cors = require('cors')

router.post('/', async (req, res) => {
    const contactData = req.body;
    console.log(contactData)
    
    const newContact = await Contact.contactModel.create(contactData)
    .catch(err => {
        console.log('Unable to create Contact.' + err.message);
        throwException(err, res);
    });

    res.status(201).json({
        message: 'Contact created.',
        newContact
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