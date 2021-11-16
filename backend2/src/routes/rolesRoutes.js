const rolesModel = require('../models/roles');
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){
    app.get('/roles/pag/:pag', checkToken, (req, res) => {
        rolesModel.getPage(req.params.pag, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.get('/roles/get/all', checkToken, (req, res) => {
        rolesModel.getAll((err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.get('/roles/:id', checkToken, (req, res) => {
        rolesModel.get(req.params.id, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.get('/roles/filtrar/:texto/:pag', checkToken, (req, res) => {
        rolesModel.filter(req.params.texto, req.params.pag, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json( data);
            }
        });
    });


    app.post('/roles', checkToken, (req, res) => {
        rolesModel.insert(req.body, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.put('/roles/:id', checkToken, (req, res) => {
        rolesModel.update(req.params.id, req.body, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.delete('/roles/:id', checkToken, (req, res) => {
        rolesModel.softDelete(req.params.id, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });

    
    app.delete('/roles/kill/:id', checkToken, (req, res) => {
        rolesModel.delete(req.params.id, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });

    
}
