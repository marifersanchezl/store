const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {
    const token = req.cookies.token || '';

    if (!token) {
        res.redirect('/login');
    }
    else {
        jwt.verify(token, config.secret, function (err, decoded) {

            if (err) {
                // Error handling for expired jwt token
                if (err.name == "TokenExpiredError") {
                    console.log("Token for the user has expired");
                    console.log(err.name + ": " + err.message + "\nexpiredAt: " + err.expiredAt);
                }
                else {
                    console.log(err);
                }
                return res.redirect('/login');
            }
            else {
                // los atributos del decoded son los mismos del token descifrado
                req.userEmail = decoded.id;

                // next dice ok, ahora continua tu flujo normal
                next();
            }
        });
    }
}

module.exports = verifyToken;