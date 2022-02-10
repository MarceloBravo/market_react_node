const ProductosModel = require('../models/productos')
const checkToken = require('../shared/middlewares/mw_checkToken')
//const uploadFiles = require('../shared/middlewares/mw_uploadFiles');
const mw_uploadFiles_productos = require('../shared/middlewares/mw_uploadFiles_productos');

module.exports = function(app, passport) {
    app.get('/productos/pag/:pag',(req, res) => {
        ProductosModel.getPage(req.params.pag, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.get('/productos/pag/:pag/:items',(req, res) => {
        ProductosModel.getItemsPerPage(req.params.pag, req.params.items, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.get('/productos/pag/:pag/:items/:orderByField/:orderByDirection',(req, res) => {
        ProductosModel.getItemsPerPageOrderBy(req.params.pag, req.params.items, req.params.orderByField, req.params.orderByDirection, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.get('/productos/min/max',(req, res) => {
        ProductosModel.getMinMaxPrice((err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.get('/productos/filtrar/:texto/:pag',(req, res) => {
        ProductosModel.filter(req.params.texto, req.params.pag, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.post('/productos/filtrar/:pag',(req, res) => {
        ProductosModel.filterParams(req.body, req.params.pag, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.get('/productos/get/all',(req, res) => {
        ProductosModel.getAll((err, data) => {
            res.json(err ? err : data)
        })
    })

    app.get('/productos/:id',(req, res) => {
        ProductosModel.find(req.params.id, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.post('/productos', [checkToken, mw_uploadFiles_productos.array('objImages')], (req, res) => {
        ProductosModel.insert(req.body, (err, data) => {
            res.json(err ? err : data)
        })
    })
    
   
    app.put('/test_upload/:id', [checkToken, mw_uploadFiles_productos.array('objImages')], (req, res) => {
        console.log(req.files, req.body)
        res.send(req.files)
     }, (error, req, res, next) => {
         res.status(400).send({ error: error.message })
     })
    
     
    app.put('/productos/:id', [checkToken, mw_uploadFiles_productos.array('objImages')], (req, res) => {
        ProductosModel.update(req.params.id, req.body, (err, data) => {
            res.json(err ? err : data)
        })
    })
    
    app.delete('/productos/:id',(req, res) => {
        ProductosModel.softDelete(req.params.id, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.delete('/productos/kill/:id',(req, res) => {
        ProductosModel.delete(req.params.id, (err, data) => {
            res.json(err ? err : data)
        })
    })
}
