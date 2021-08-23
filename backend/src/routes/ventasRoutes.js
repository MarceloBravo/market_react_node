const VCentasModel = require('../models/ventas')

module.exports = function(app, passport) {
    app.post('/ventas/registrar', (req,res)=>{
        VentasModel.registrar(req.body, (err, data)=>{
            res.json(err ? err : data)
        })
    })
}