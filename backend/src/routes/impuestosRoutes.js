const impuestosModel = require('../models/impuestos')
const checkToken = require('../shared/middlewares/mw_checkToken')

module.exports = function(app, passport){
    app.get('/impuestos/pag/:pag', checkToken, (req, res) => {
        impuestosModel.getPage(req.params.pag, (data, err) => {
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })

    app.get('/impuestos/filtrar/:texto/:pag', checkToken, (req, res) => {
        impuestosModel.filter(req.params.texto, req.params.pag, (data, err) => {
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })

    app.get('/impuestos/get/all', checkToken, (req, res) => {
        impuestosModel.getAll((data, err) => {
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })

    app.get('/impuestos/:id', checkToken ,(req, res) => {
        impuestosModel.find(req.params.id, (data, err) => {
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    }) 

    
    app.post('/impuestos', checkToken, (req, res) => {
        impuestosModel.insert(req.body, (data, err) => {
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })

    app.put('/impuestos/:id', checkToken, (req, res) => {
        impuestosModel.update(req.params.id, req.body, (data, err) => {
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })

    app.delete('/impuestos/:id', checkToken, (req, res) => {
        impuestosModel.softDelete(req.params.id, (data, err) => {
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })

    app.delete('/impuestos/kill/:id', checkToken, (req, res) => {
        impuestosModel.delete(req.params.id, (data, err) => {
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })
}
