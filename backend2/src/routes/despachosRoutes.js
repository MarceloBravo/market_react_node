const DespachosModel = require('../models/despachos')

module.exports = function(app, passport){
    app.get('/despachos/pag/:pag', (req, res) =>{
        DespachosModel.getPage(req.params.pag, (err, data) =>{
            res.json(err ? err : data)
        })
    })

    app.get('/despachos/filter/:texto/:pag', (req, res) =>{
        DespachosModel.filter(req.params.texto, req.params.pag, (err, data) =>{
            res.json(err ? err : data)
        })
    })

    app.get('/despachos/:id', (req, res) =>{
        DespachosModel.find(req.params.id, (err, data) =>{
            res.json(err ? err : data)
        })
    })

    app.put('/despachos/:id', (req, res) =>{
        DespachosModel.update(req.params.id, req.body, (err, data) =>{
            res.json(err ? err : data)
        })
    })

    app.put('/despachos/estado/:id/:idEstado', (req, res) =>{
        DespachosModel.cambioEstado(req.params.id, req.params.idEstado, (err, data) =>{
            res.json(err ? err : data)
        })
    })
}