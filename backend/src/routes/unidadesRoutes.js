const UnidadesModel = require('../models/unidades')
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){
    app.get('/unidades/pag/:pag', checkToken, (req, res) => {
        UnidadesModel.getPage(req.params.pag, (err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.get('/unidades/filtrar/:texto/:pag', checkToken, (req, res) => {
        UnidadesModel.filter(req.params.texto, req.params.pag, (err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.get('/unidades/get/all', checkToken, (req, res) => {
        UnidadesModel.getAll((err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.get('/unidades/:id', (req, res) => {
        UnidadesModel.find(req.params.id, (err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.post('/unidades', checkToken, (req, res) => {
        UnidadesModel.insert(req.body, (err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.put('/unidades/:id', checkToken, (req, res) => {
        UnidadesModel.update(req.params.id, req.body, (err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.delete('/unidades/:id', checkToken, (req, res) => {
        UnidadesModel.softDelete(req.params.id, (err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.delete('/unidades/kill/:id', checkToken, (req, res) => {
        UnidadesModel.delete(req.params.id, (err, data)=>{
            res.json(err ? err : data)
        })
    })
}
