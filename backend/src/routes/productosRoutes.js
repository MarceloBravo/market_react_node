const ProductosModel = require('../models/productos')
const checkToken = require('../shared/middlewares/mw_checkToken')

module.exports = function(app, passport) {
    app.get('/productos/pag/:pag',(req, res) => {
        ProductosModel.getPage(req.params.pag, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.get('/productos/filtrar/:texto/:pag',(req, res) => {
        ProductosModel.filter(req.params.texto, req.params.pag, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.get('/productos/get/all',(req, res) => {
        ProductosModel.getAll((err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.get('/productos/:id',(req, res) => {
        ProductosModel.find(req.params.id, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.post('/productos',(req, res) => {
        ProductosModel.insert(req.body, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.put('/productos/:id',(req, res) => {
        ProductosModel.update(req.params.id, req.body, (err, data) => {
            return res.json(err ? err : data)
        })
    })
    
    app.delete('/productos/:id',(req, res) => {
        ProductosModel.softDelete(req.params.id, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.delete('/productos/kill/:id',(req, res) => {
        ProductosModel.delete(req.params.id, (err, data) => {
            return res.json(err ? err : data)
        })
    })
}
