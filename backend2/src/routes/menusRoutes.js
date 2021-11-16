const menusModel = require('../models/menus');
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){
    app.get('/menus/rol/:idRol', checkToken, (req, res) => {
        menusModel.mainMenu(req.params.idRol,(err, data) => {
            if(err){
                res.json(err);
            }else{
                res.status(200).json(data);
            }
        });
    });

    app.get('/menus/pag/:pag', checkToken, (req, res) => {
        menusModel.getPage(req.params.pag,(err, data) => {
            if(err){
                res.json(err);
            }else{
                res.status(200).json(data);
            }
        });
    });

    app.get('/menus/filtrar/:texto/:pag', checkToken, (req, res) => {
        menusModel.filter(req.params.texto, req.params.pag, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.status(200).json(data);
            }
        });
    });

    app.get('/menus/:id', checkToken, (req, res) => {
        menusModel.get(req.params.id, (err, data) => {
            if(err){
                res.json(data);
            }else{
                res.status(200).json(data);
            }
        });

    });

    app.get('/menus/get/all', checkToken, (req, res) => {
        menusModel.getAll((err, data) => {
            if(err){
                res.json(data);
            }else{
                res.status(200).json(data);
            }
        });

    });

    app.post('/menus', checkToken, (req,res) => {
        menusModel.insert(req.body,(err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.put('/menus/:id', checkToken, (req,res) => {
        let id = req.params.id;
        menusModel.update(id, req.body,(err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.delete('/menus/:id', checkToken, (req,res) => {
        let id = req.params.id;
        menusModel.softDelete(id,(err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.delete('/menus/kill/:id', checkToken, (req,res) => {
        let id = req.params.id;
        menusModel.delete(id,(err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });
}