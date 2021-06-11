const login = require('../models/login');

module.exports = function(app, passport){
    app.post('/login', (req, res) => {
        req.body.host = req.protocol + '://' + req.get('host') + '/login'   //Obteniendo la url para adjuntarla al token a devolver
        login.getUserData(req.body, (err, data) => {
            if(err){
                res.status(403).json(err);
            }else{
                res.status(200).json(data);
            }
        });
    });


    app.post('/logout', (req, res) => {
        try{
            const bearerHeader = req.headers['authorization'];
            console.log(bearerHeader)
            res.json({mensaje: 'Sessión finalizada', tipo: 'success'})
        }catch(error){
            res.json({mensaje: 'Error al finalizar la sessión', tipo: 'danger'})
        }
    });
}