const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {
    const token = req.cookies.token || '';

    if (!token) {
        res.redirect('/login');
    }
    else {
        // checar como manejar si el token ya esta expirado
        // en https://npmjs.com/package/jsonwebtoken
        jwt.verify(token, config.secret, function(err, decoded){
            
            if (err) {
                console.log(err);
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