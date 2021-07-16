const tiendaModel = require('../models/tienda');
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){
    app.get('/tienda', (req, res)=>{
        tiendaModel.getData((err, data)=> {
            res.json(err ? err : data)
        })
    })

    app.post('/tienda', checkToken, (req, res)=>{
        tiendaModel.save(req.body, (err, data)=> {
            res.json(err ? err : data)
        })
    })
}