const connection = require('../../db/connection')
const constantes = require('../shared/constants')
//regPerPage

let cnn = connection.conect()

let ProductosModel = {}

ProductosModel.getPage = (pag, callback) => {
    if(cnn){
        let desde = constantes.regPerPage * pag
        let hasta = desde + constantes.regPerPage
        let qry = ``

        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrió un error al obtener el listado de productos: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query('SELECT COUNT(id) as totRows FROM productos p WHERE p.deleted_at IS NULL')
                console.log(totRows)
                return callback(null, {data: res, rousPerPage: constantes.regPerPage, rows: totRows, page: pag})
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
    
}

ProductosModel.filter = (texto, pag, callback) => {

}

ProductosModel.getAll = (callback) => {

}

ProductosModel.find = (id, callback) => {

}

ProductosModel.insert = (data, callback) => {

}

ProductosModel.update = (id, data, callback) => {

}

ProductosModel.softDelete = (id, callback) => {

}

ProductosModel.delete = (id, callback) => {

}

module.exports = ProductosModel