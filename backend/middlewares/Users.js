const mdUsers = require('../models/Usuarios');

mdUsers.userRol = (req, res, next) => {
    console.log(res.locals);
    if(res.locals.userLogged.admin === 0) {
        res.status(403).json({
            message: 'Permition denied.'
        });
    } else {
        next();
    }
};

module.exports = mdUsers;