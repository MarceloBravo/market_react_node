const TiposPagoModel = require('../models/tipoPagos')
//const checkToken = require('../shared/middlewares/mw_checkToken.js');

module.exports = function(app, passport){
    app.get('/tipo_pago/pag/:pag',(req, res) => {
        TiposPagoModel.getPage(req.params.pag, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.get('/tipo_pago/filtrar/:texto/:pag',(req, res) => {
        TiposPagoModel.filter(req.params.texto, req.params.pag, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.get('/tipo_pago/get/all',(req, res) => {
        TiposPagoModel.getAll((err, data) => {
            res.json(err ? err : data)
        })
    })

    app.get('/tipo_pago/:id',(req, res) => {
        TiposPagoModel.find(req.params.id, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.get('/tipo_pago/cod/:cod',(req, res) => {
        TiposPagoModel.findByCode(req.params.cod, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.post('/tipo_pago',(req, res) => {
        TiposPagoModel.insert(req.body, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.put('/tipo_pago/:id',(req, res) => {
        TiposPagoModel.update(req.params.id, req.body, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.delete('/tipo_pago/:id',(req, res) => {
        TiposPagoModel.softDelete(req.params.id, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.delete('/tipo_pago/kill/:id',(req, res) => {
        TiposPagoModel.delete(req.params.id, (err, data) => {
            res.json(err ? err : data)
        })
    })

}
