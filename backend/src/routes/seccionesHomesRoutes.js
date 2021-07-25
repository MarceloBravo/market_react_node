const SeccionesHomes = require('../models/seccionesHomes')
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){
    app.get('/secciones_home/pag/:pag',(req, res) =>{
        SeccionesHomes.getPage(req.params.pag, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.get('/secciones_home/filtrar/:texto/:pag',(req, res) =>{
        SeccionesHomes.filter(req.params.texto, req.params.pag, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.get('/secciones_home/get/all',(req, res) =>{
        SeccionesHomes.getAll((err, data) => {
            res.json(err ? err : data)
        })
    })

    app.get('/secciones_home/:id',(req, res) =>{
        SeccionesHomes.get(req.params.id, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.post('/secciones_home',(req, res) =>{
        SeccionesHomes.insert(req.body, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.put('/secciones_home/:id',(req, res) =>{
        SeccionesHomes.update(req.params.id, req.body, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.delete('/secciones_home/:id',(req, res) =>{
        SeccionesHomes.softDelete(req.params.id, (err, data) => {
            res.json(err ? err : data)
        })
    })

    app.delete('/secciones_home/:id',(req, res) =>{
        SeccionesHomes.erase(req.params.id, (err, data) => {
            res.json(err ? err : data)
        })
    })
    
}