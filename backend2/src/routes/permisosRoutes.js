const permisosModel = require('../models/permisos');
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){

    app.get('/permisos/rol/:id', checkToken, (req, res) => {
        permisosModel.get(req.params.id, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.post('/permisos/pantalla/:url', checkToken, (req, res) => {
        permisosModel.getPermisosPantalla(req.params.url, req.body, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.post('/permisos/:id', checkToken, (req, res) => {
        permisosModel.savePermissions(req.params.id, req.body, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });

}