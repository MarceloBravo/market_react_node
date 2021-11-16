const clientesModel = require('../models/clientes')
const checkToken = require('../shared/middlewares/mw_checkToken')

module.exports = function(app, passport){
    app.get('/clientes/pag/:pag', (req, res) => {
        clientesModel.getPage(req.params.pag, (err, data) => {
            return err ? res.json(err) : res.json(data)
        })
    })


    app.get('/clientes/filter/:texto/:pag',(req, res) => {
        clientesModel.filter(req.params.texto, req.params.pag, (err, data) => {
            return err ? res.json(err) : res.json(data)
        })
    })


    app.get('/clientes/get/all', (req, res) => {
        clientesModel.getAll((err, data) => {
            return err ? res.json(err) : res.json(data)
        })
    })


    app.get('/clientes/:id', (req, res) => {
        clientesModel.find(req.params.id, (err, data) => {
            return err ? res.json(err) : res.json(data)
        })
    })


    app.get('/clientes/rut/:rut', (req, res) => {
        clientesModel.findByRut(req.params.rut, (err, data) => {
            return err ? res.json(err) : res.json(data)
        })
    })


    app.get('/clientes/email_en_uso/:email/:rut', (req, res) => {
        clientesModel.emailIsInUse(req.params.email, req.params.rut, (err, data) => {
            return err ? res.json(err) : res.json(data)
        })
    })

    
    app.post('/clientes', (req, res) => {
        clientesModel.insert(req.body, (err, data) => {
            return err ? res.json(err) : res.json(data)
        })
    })


    app.put('/clientes/:id', (req, res) => {
        clientesModel.update(req.params.id, req.body, (err, data) => {
            return err ? res.json(err) : res.json(data)
        })
    })


    app.delete('/clientes/:id', (req, res) => {
        clientesModel.softDelete(req.params.id, (err, data) => {
            return err ? res.json(err) : res.json(data)
        })
    })


    app.delete('/clientes/kill/:id', (req, res) => {
        clientesModel.delete(req.params.id, (err, data) => {
            return err ? res.json(err) : res.json(data)
        })
    })

    app.post('/clientes/login', (req, res) => {
        req.body.host = req.protocol + '://' + req.get('host') + '/clientes/login'   //Obteniendo la url para adjuntarla al token a devolver
        clientesModel.login(req.body, (err, data) => {
            return err ? res.json(err) : res.json(data)
        })
    })
}