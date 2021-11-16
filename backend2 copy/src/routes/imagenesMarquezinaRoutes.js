const ImagenesMarquezinaModel = require('../models/imagenesMarquezina')
const checkToken = require('../shared/middlewares/mw_checkToken');
const uploadFiles = require('../shared/middlewares/mw_uploadFiles_tienda');

module.exports = function(app, passport){
    app.get('/imagenes_marquesina', (req, res) => {
        ImagenesMarquezinaModel.getData((err, data)=>{
            res.json(err ? err : data)
        })
    })

    app.post('/imagenes_marquesina', [checkToken, uploadFiles.array('objImages')], (req, res) => {
        ImagenesMarquezinaModel.save(req.body, (err, data)=>{
            res.json(err ? err : data)
        })
    })
}
