const constantes = require('../constants');
const jwt = require('jsonwebtoken');

module.exports = checkToken = async (req, res, next) => {
    try{
        const bearerHeader = req.headers['authorization'];
        if(bearerHeader){
            let token = bearerHeader.split(" ")[1];
            req.token = token;
            let verified = jwt.verify(token, constantes.secret)
            if(verified){
                next();
            }else{
                res.sendStatus(403);
            }
        }else{
            res.status(403).send('Autorización no válida.');
        }
    }catch(error){  
        res.status(400).send('Token no válido');
    }
}
