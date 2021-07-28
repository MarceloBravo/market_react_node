const SubCategoriasModule = require('../models/subCategorias')
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){
    app.get('/sub_categorias/pag/:pag', checkToken, (req, res) => {
        SubCategoriasModule.getPage(req.params.pag, (err, data) => {
            res.json(err ? err : data )
        })
    })
    
    app.get('/sub_categorias/filtrar/:texto/:pag', checkToken, (req, res) => {
        SubCategoriasModule.filter(req.params.texto, req.params.pag, (err, data) => {
            res.json(err ? err : data )
        })
    })

    app.get('/sub_categorias/get/all', checkToken, (req, res) => {
        SubCategoriasModule.getAll((err, data) => {
            res.json(err ? err : data )
        })
    })

    app.get('/sub_categorias/get/all/:id', checkToken, (req, res) => {
        SubCategoriasModule.getAllByCategory(req.params.id, (err, data) => {
            res.json(err ? err : data )
        })
    })

    app.get('/sub_categorias/:id', (req, res) => {
        SubCategoriasModule.find(req.params.id, (err, data) => {
            res.json(err ? err : data )
        })
    })
    
    app.post('/sub_categorias', checkToken, (req, res) => {
        SubCategoriasModule.insert(req.body, (err, data) => {
            res.json(err ? err : data )
        })
    })

    app.put('/sub_categorias/:id', checkToken, (req, res) => {
        SubCategoriasModule.update(req.params.id, req.body, (err, data) => {
            res.json(err ? err : data )
        })
    })

    app.delete('/sub_categorias/:id', checkToken, (req, res) => {
        SubCategoriasModule.softDelete(req.params.id, (err, data) => {
            res.json(err ? err : data )
        })
    })

    app.delete('/sub_categorias/kill/:id', checkToken, (req, res) => {
        SubCategoriasModule.delete(req.params.id, (err, data) => {
            res.json(err ? err : data )
        })
    })
    
}
