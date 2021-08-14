const categoriasModel = require('../models/categorias')
const checkToken = require('../shared/middlewares/mw_checkToken')


module.exports = function(app, passport){
    app.get('/categorias/pag/:pag', checkToken, (req, res) => {
        categoriasModel.getPage(req.params.pag, (data, err) =>{
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })


    app.get('/categorias/filtrar/:texto/:pag', checkToken, (req, res) => {
        categoriasModel.filter(req.params.texto, req.params.pag, (data, err) =>{
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })

    app.get('/categorias/get/all', (req, res) => {
        categoriasModel.getAll((data, err) =>{
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })

    app.get('/categorias_subcategorias', (req, res) => {
        categoriasModel.getCategorias((data, err) =>{
            res.json(err ? err : data)
        })
    })

    app.get('/categorias/:id', (req, res) => {
        categoriasModel.find(req.params.id, (data, err) =>{
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })



    app.post('/categorias', checkToken, (req, res) => {
        categoriasModel.insert(req.body, (data, err) =>{
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })


    app.put('/categorias/:id', checkToken, (req, res) => {
        categoriasModel.update(req.params.id, req.body, (data, err) =>{
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })

    app.delete('/categorias/:id', checkToken, (req, res) => {
        categoriasModel.softDelete(req.params.id, (data, err) =>{
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })


    app.delete('/categorias/kill/:id', checkToken, (req, res) => {
        categoriasModel.delete(req.params.id, (data, err) =>{
            if(err){
                res.json(err)
            }else{
                res.json(data)
            }
        })
    })
}
