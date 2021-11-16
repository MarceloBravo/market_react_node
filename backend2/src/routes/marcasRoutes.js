const MarcasModel = require('../models/marcas')
const checkToken = require('../shared/middlewares/mw_checkToken')

module.exports = function(app, passport) {
    app.get('/marcas/pag/:pag', checkToken, (req, res) => {
        MarcasModel.getPage(req.params.pag, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.get('/marcas/filtrar/:texto/:pag', checkToken, (req, res) => {
        MarcasModel.filter(req.params.texto, req.params.pag, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.get('/marcas/get/all', (req, res) => {
        MarcasModel.getAll((err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.get('/marcas/:id', checkToken, (req, res) => {
        MarcasModel.find(req.params.id, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.post('/marcas', checkToken, (req, res) => {
        MarcasModel.insert(req.body, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.put('/marcas/:id', checkToken, (req, res) => {
        MarcasModel.update(req.params.id, req.body, (err, data) => {
            return res.json(err ? err : data)
        })
    })
    
    app.delete('/marcas/:id', checkToken, (req, res) => {
        MarcasModel.softDelete(req.params.id, (err, data) => {
            return res.json(err ? err : data)
        })
    })

    app.delete('/marcas/kill/:id', checkToken, (req, res) => {
        MarcasModel.delete(req.params.id, (err, data) => {
            return res.json(err ? err : data)
        })
    })
}
