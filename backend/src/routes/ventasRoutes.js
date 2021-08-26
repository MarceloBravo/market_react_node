const VentasModel = require('../models/ventas')

module.exports = function(app, passport) {
    app.post('/ventas/registrar', (req,res)=>{
        VentasModel.registrar(req.body, (err, data)=>{
            res.json(err ? err : data)
        })
    })


    app.put('/ventas/anular/:id', (req,res)=>{
        VentasModel.anularVenta(req.params.id, (err, data)=>{
            res.json(err ? err : data)
        })
    })
}