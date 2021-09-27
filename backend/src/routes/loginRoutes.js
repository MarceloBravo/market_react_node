const login = require('../models/login');

module.exports = function(app, passport){
    app.post('/login', (req, res) => {
        req.body.host = req.protocol + '://' + req.get('host') + '/login'   //Obteniendo la url para adjuntarla al token a devolver
        login.login(req.body, (err, data) => {
            if(err){
                res.status(403).json(err);
            }else{
                res.status(200).json(data);
            }
        });
    });


    app.post('/logout', (req, res) => {
        login.logout(req.body.token, (err, data) => {
            return res.json(err ? err : data)
        })
    });
    

    app.post(`/refresh_token`, (req, res) => {
        const host  = req.protocol + '://' + req.get('host') + '/login'   //Obteniendo la url para adjuntarla al token a devolver
        const refreshToken = req.body.refresh
        
        if(!refreshToken){
            res.status.json(403).json({mensaje: 'Token de refresco no recibido', tipoMensaje: 'danger'})
        }else{
            login.refreshToken(refreshToken, host,  (err, data) => {
                if(err){
                    res.status(403).json(err);
                }else{
                    res.status(200).json(data);
                }
            });       
        }
    })
}