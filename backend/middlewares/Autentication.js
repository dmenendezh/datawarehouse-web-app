const JWT = require('jsonwebtoken');
const JWTSign = 'mySUPERpass.12';
const Autentication = {};

Autentication.validateToken = (req, res, next) => {
    console.log("headers= "+ req.headers.authorization)

    const token = req.headers.authorization;
    const tokenVerified = JWT.verify(token, JWTSign, (error, decoded) => {
        if(error) {
            console.log("error= " + error)

            res.status(403).json({
                message: 'Unable to verify the token.',
                error
            });
        } else {
            res.locals.userLogged = decoded;
            console.log("isAdmin= " + decoded.admin)
            next();
        }
    });
};


module.exports = Autentication;