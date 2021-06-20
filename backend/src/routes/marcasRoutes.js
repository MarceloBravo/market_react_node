const MarcasModel = require('../models/marcas')
const checkToken = require('../shared/middlewares/mw_checkToken')

module.exports = function(app, passport) {
    app.get('/marcas/pag/:pag',(req, res) => {
        MarcasModel.getPage(req.params.pag, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.get('/marcas/filtrar/:texto/:pag',(req, res) => {
        MarcasModel.filter(req.params.texto, req.params.pag, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.get('/marcas/get/all',(req, res) => {
        MarcasModel.getAll((err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.get('/marcas/:id',(req, res) => {
        MarcasModel.find(req.params.id, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.post('/marcas',(req, res) => {
        MarcasModel.insert(req.body, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.put('/marcas/:id',(req, res) => {
        MarcasModel.update(req.params.id, req.body, (err, data) => {
            return res.json(err ? err : data)
        })
    })
    
    app.delete('/marcas/:id',(req, res) => {
        MarcasModel.softDelete(req.params.id, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.delete('/marcas/kill/:id',(req, res) => {
        MarcasModel.delete(req.params.id, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    
}
