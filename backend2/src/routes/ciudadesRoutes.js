const CiudadModel = require('../models/ciudades')
const checkToken = require('../shared/middlewares/mw_checkToken')

module.exports = function(app, passport){
    app.get('/ciudades/pag/:pag', (req, res) => {
        CiudadModel.getPage(req.params.pag, (err, data) => {
            return err ? res.JSON(err) : res.JSON(data)
        })
    })

    app.get('/ciudades/get/all', (req, res) => {
        CiudadModel.getAll((err, data) => {
            if(err){
                return err ? res.JSON(err) : res.JSON(data)
            }
        })
    })

    app.get('/ciudades/get/all/:cod_comuna', (req, res) => {
        CiudadModel.getAllByComuna(req.params.cod_comuna, (err, data) => {
            return err ? res.JSON(err) : res.JSON(data)
        })
    })

    app.get('/ciudades/filter/:texto/:pag', (req, res) => {
        CiudadModel.filter(req.params.texto, req.params.pag, (err, data) => {
            return res ? res.JSON(err) : res.JSON(data)
        })
    })

    app.get('/ciudades/:id', (req, res) => {
        CiudadModel.find(req.params.id, (err, data) => {
            return res ? res.JSON(err) : res.JSON(data)
        })
    })

    app.post('/ciudades', (req, res) => {
        CiudadModel.insert(req.body, (err, data) => {
            return res ? res.JSON(err) : res.JSON(data)
        }) 
    })

    app.put('/ciudades/:id', (req, res) => {
        CiudadModel.update(req.params.id, req.body, (err, data) => {
            return err ? res.JSON(err) : res.JSON(data)
        })
    })

    app.delete('/ciudades/:id',(req, res) => {
        CiudadModel.softDelete(req.params.id, (err, data) => {
            return res ? res.JSON(err) : res.JSON(data)
        })
    })
}
