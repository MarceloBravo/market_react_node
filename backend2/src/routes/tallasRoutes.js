const tiendaModel = require('../models/tallas');
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){
    app.get('/tallas/pag/:pag',(req, res) => {
        tiendaModel.getPage(req.params.pag, (err, data) => {
            res.json(err ? err : data)
        })
    } )


    app.get('/tallas/filtrar/:texto/:pag',(req, res) => {
        tiendaModel.filter(req.params.texto, req.params.pag, (err, data) => {
            res.json(err ? err : data)
        })
    } )


    app.get('/tallas/get/all',(req, res) => {
        tiendaModel.getAll((err, data) => {
            res.json(err ? err : data)
        })
    } )


    app.get('/tallas/sub_categoria/:idSubCategoria', (req, res) => {
        tiendaModel.getBySubCategory(req.params.idSubCategoria, (err, data) => {
            res.json(err ? err : data)
        })
    })
    

    app.get('/tallas/:id',(req, res) => {
        tiendaModel.find(req.params.id, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.post('/tallas',(req, res) => {
        tiendaModel.insert(req.body, (err, data) => {
            res.json(err ? err : data)
        })
    } )


    app.put('/tallas/:id',(req, res) => {
        tiendaModel.update(req.params.id, req.body, (err, data) => {
            res.json(err ? err : data)
        })
    } )


    app.delete('/tallas/:id',(req, res) => {
        tiendaModel.softDelete(req.params.id, (err, data) => {
            res.json(err ? err : data)
        })
    } )


    app.delete('/tallas/kill/:id',(req, res) => {
        tiendaModel.delete(req.params.id, (err, data) => {
            res.json(err ? err : data)
        })
    } )
}

