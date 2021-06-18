const SubCategoriasModule = require('../models/subCategorias')
const checkToken = require('../shared/middlewares/mw_checkToken');

module.exports = function(app, passport){
    app.get('/sub_categorias/pag/:pag', (req, res) => {
        SubCategoriasModule.getPage(req.params.pag, (err, data) => {
            res.json(err ? err : data )
        })
    })
    
    app.get('/sub_categorias/filtrar/:texto/:pag', (req, res) => {
        SubCategoriasModule.filter(req.params.texto, req.params.pag, (err, data) => {
            res.json(err ? err : data )
        })
    })

    app.get('/sub_categorias/get/all', (req, res) => {
        SubCategoriasModule.getAll((err, data) => {
            res.json(err ? err : data )
        })
    })

    app.get('/sub_categorias/:id', (req, res) => {
        SubCategoriasModule.find(req.params.id, (err, data) => {
            res.json(err ? err : data )
        })
    })
    
    app.post('/sub_categorias', (req, res) => {
        SubCategoriasModule.insert(req.body, (err, data) => {
            res.json(err ? err : data )
        })
    })

    app.put('/sub_categorias/:id', (req, res) => {
        SubCategoriasModule.update(req.params.id, req.body, (err, data) => {
            res.json(err ? err : data )
        })
    })

    app.delete('/sub_categorias/:id', (req, res) => {
        SubCategoriasModule.softDelete(req.params.id, (err, data) => {
            res.json(err ? err : data )
        })
    })

    app.delete('/sub_categorias/kill/:id', (req, res) => {
        SubCategoriasModule.delete(req.params.id, (err, data) => {
            res.json(err ? err : data )
        })
    })
    
}
