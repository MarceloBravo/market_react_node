const menusTiendaModel = require('../models/menusTienda');
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){
    app.get('/menus_tienda', (req, res) => {
        menusTiendaModel.mainMenu((err, data) => {
            res.json(err ? err : data);
        });
    });

    app.get('/menus_tienda/pag/:pag', checkToken, (req, res) => {
        menusTiendaModel.getPage(req.params.pag,(err, data) => {
            res.json(err ? err : data);
        });
    });

    app.get('/menus_tienda/filtrar/:texto/:pag', checkToken, (req, res) => {
        menusTiendaModel.filter(req.params.texto, req.params.pag, (err, data) => {
            res.json(err ? err : data);
        });
    });

    app.get('/menus_tienda/:id', checkToken, (req, res) => {
        menusTiendaModel.get(req.params.id, (err, data) => {
            res.json(err ? err : data);
        });

    });

    app.get('/menus_tienda/get/all', checkToken, (req, res) => {
        menusTiendaModel.getAll((err, data) => {
            res.json(err ? err : data);
        });

    });

    app.post('/menus_tienda', checkToken, (req,res) => {
        menusTiendaModel.insert(req.body,(err, data) => {
            res.json(err ? err : data);
        });
    });

    app.put('/menus_tienda/:id', checkToken, (req,res) => {
        let id = req.params.id;
        menusTiendaModel.update(id, req.body,(err, data) => {
            res.json(err ? err : data);
        });
    });


    app.delete('/menus_tienda/:id', checkToken, (req,res) => {
        let id = req.params.id;
        menusTiendaModel.softDelete(id,(err, data) => {
            res.json(err ? err : data);
        });
    });

    app.delete('/menus_tienda/kill/:id', checkToken, (req,res) => {
        let id = req.params.id;
        menusTiendaModel.delete(id,(err, data) => {
            res.json(err ? err : data);
        });
    });
}