const pantallasModel = require('../models/pantalla')
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){
    app.get('/pantallas/pag/:page', checkToken, (req, res) => {
        pantallasModel.getPage(req.params.page, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.get('/pantallas/get/all', checkToken, (req, res) => {
        pantallasModel.getAll((err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.get('/pantallas/:id', checkToken, (req, res) => {
        pantallasModel.get(req.params.id, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });

    app.get('/pantallas/byUrl/:url', checkToken, (req, res) => {
        pantallasModel.getByUrl(req.params.url, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });
    

    app.get('/pantallas/filtrar/:texto/:pag', checkToken, (req, res) => {
        pantallasModel.filter(req.params.texto, req.params.pag, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.post('/pantallas', checkToken, (req, res) => {
        pantallasModel.insert(req.body, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.put('/pantallas/:id', checkToken, (req, res) => {
        pantallasModel.update(req.params.id, req.body, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });
    

    app.delete('/pantallas/:id', checkToken, (req, res) => {
        pantallasModel.sofDelete(req.params.id, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.delete('/pantallas/kill/:id', (req, res) => {
        pantallasModel.delete(req.params.id, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });

}