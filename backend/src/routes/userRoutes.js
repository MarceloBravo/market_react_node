const userModel = require('../models/user.js');
const checkToken = require('../shared/middlewares/mw_checkToken.js');
const uploadFiles = require('../shared/middlewares/mw_uploadFiles');


module.exports = function (app, passport){
    app.get('/usuarios/pag/:pag' , checkToken, (req, res) => {
        userModel.getPage(req.params.pag, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.get('/usuarios', checkToken, (req, res) => {
        userModel.getAll((err, data) => {
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        });
    });


    app.get('/usuarios/filtrar/:texto/:pag', checkToken, (req, res) => {
        userModel.filter(req.params.texto, req.params.pag, (err, data) => {
            if(err){
                res.json(err);
            }else{
                res.json(data);
            }
        });
    });


    app.get('/usuarios/:id', checkToken, (req, res) => {
        let id = req.params.id
        userModel.get(id, (err, data) => {
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        });
    });

    
    app.post('/usuarios',[checkToken, uploadFiles.single('objImage')], (req, res) => {
        userModel.insert(req.body, (err, data)  => {
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        });
    });

    
    app.put('/usuarios/:id', [checkToken, uploadFiles.single('objImage')], (req, res) => {
        userModel.update(req.params.id, req.body, (err, data) => {
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })


    app.delete('/usuarios/:id', checkToken,  (req, res) => {
        let id = req.params.id
        userModel.softDelete(id, (err, data) => {
            res.json({err, data})
        })
    })

    app.delete('/usuarios/kill/:id', checkToken, (req, res) => {
        let id = req.params.id
        userModel.delete(id, (err, data) => {
            res.json({err, data})
        })
    })
}