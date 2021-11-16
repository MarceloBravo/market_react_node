const OrdenesCompraModel = require('../models/ordenesCompra')

module.exports = function(app, passport){
    app.get('/ordenes_compra/order_number/:orderNumber', (req, res) =>{
        OrdenesCompraModel.findByOrderNum(req.params.orderNumber, (err, data) =>{
            res.json(err ? err : data)
        })
    })
}