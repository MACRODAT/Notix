const jwt = require('jsonwebtoken');
const config = require('../config/index');

module.exports = function(req, res, next) {
    // get the token from the req
    // if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    // no token ?
    if (!token) {
        res.status(215).send({ error : 'TOKEN_ABSENT' });
        return;
    }

    try{
        const decoded = jwt.verify(token, config.privateKey)

        req.user = decoded;
        next();
    }catch (ex){
        // invalid token
        res.status(215).send({ error : "TOKEN_INVALID" });
        return;
    }
}