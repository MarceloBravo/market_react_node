const configModel = require('../models/config');
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){
    app.get('/configuracion',(req, res) => {
        configModel.getData((err, data) => {
            if(err){
                res.json(err);
            }else{
                console.log(data)
                res.json(data);
            }
        });
    });

    app.post('/configuracion', checkToken, (req, res) => {
        configModel.save(req.body, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });
}
