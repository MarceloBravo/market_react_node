const emailModel = require('../models/email');
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){
    app.post('/send_email', (req, res)=>{
        emailModel.sendEmail2(req.body, (err, data)=>{
            res.json(err ? err : data)
        })
    })
}