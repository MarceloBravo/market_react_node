const PreciosModel = require('../models/precios')
const checkToken = require('../shared/middlewares/mw_checkToken')

module.exports = function(app, passport){
    app.get(`/precios/pag/:pag`, (req, res) => {
        PreciosModel.get(req.params.pag, (err, data) => {
            res.json(err ? err : data)
        })
    })


    app.get(`/precios/get/all`, (req, res) => {
        PreciosModel.getAll((err, data) => {
            res.json(err ? err : data)
        })
    })


    app.get(`/precios/filtrar/:texto/:pag`, (req, res) => {
        PreciosModel.filter(req.params.texto, req.params.pag, (err, data) => {
            res.json(err ? err : data)
        })
    })
    
    /*
    app.get(`/precios/datos_producto/:idProd`, (req, res) => {
        PreciosModel.findProductInfo(req.params.idProd, (err, data) => {
            res.json(err ? err : data)
        })
    })
    */

    app.post(`/precios/save`, (req, res) => {
        PreciosModel.save(req.body, (err, data) => {
            res.json(err ? err : data)
        })
    })


    app.delete(`/precios/delete/:id`, (req, res) => {
        PreciosModel.softDelete(req.params.id, (err, data) => {
            res.json(err ? err : data)
        })
    })


    app.delete(`/precios/kill/:id`, (req, res) => {
        PreciosModel.destroy(req.params.id, (err, data) => {
            res.json(err ? err : data)
        })
    })
}
