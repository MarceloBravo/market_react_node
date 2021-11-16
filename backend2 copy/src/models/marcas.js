const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let pool = connection.pool()

let MarcasModel = {}

MarcasModel.getPage = (pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let qry = `SELECT
                        id,
                        nombre,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        marcas
                    WHERE 
                        deleted_at IS NULL 
                    LIMIT ${desde}, ${constantes.regPerPage}`

        cnn.query(qry, async (err, res) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrio un error al solicitar los datos: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(id) as totRows FROM marcas WHERE deleted_at IS NULL`)
                resp = callback(null,{data: res, totRows: totRows[0][0].totRows, regPerPage: constantes.regPerPage, pag: pag})
            }
            cnn.release()
            return resp
        })

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}

MarcasModel.filter = (texto, pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let filtro = `(
                        nombre LIKE ${cnn.escape('%'+texto+'%')} OR
                        CONVERT(created_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
                        CONVERT(updated_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')}
                    )`
        let qry = `SELECT
                        id,
                        nombre,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        marcas
                    WHERE 
                        deleted_at IS NULL AND 
                        ${filtro}
                    LIMIT ${desde}, ${constantes.regPerPage}`


        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrio un error al filtrar los registros: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(id) as totRows FROM marcas WHERE deleted_at IS NULL AND ${filtro}`)
                resp = callback(null,{data: result, totRows: totRows[0][0].totRows, regPerPage: constantes.regPerPage, pag: pag})
            }
            cnn.release()
            return resp
        })

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}

MarcasModel.getAll = (callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT
                    id,
                    nombre,
                    created_at,
                    updated_at,
                    deleted_at
                FROM 
                    marcas
                WHERE 
                    deleted_at IS NULL`

        cnn.query(qry, (err, res) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrio un error al solicitar todas las marcas: '+err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, res)
            }
            cnn.release()
            return resp
        })

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}

MarcasModel.find = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT
                        id,
                        nombre,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        marcas
                    WHERE 
                        deleted_at IS NULL AND 
                        id = ${cnn.escape(id)}`

        cnn.query(qry, (err, res) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrio un error al buscar el registro: '+err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, res[0])
            }
            cnn.release()
            return resp
        })

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}

MarcasModel.insert = (data, callback) => {
    let errValidacion = validaDatos(data);
    if(errValidacion.length > 0){
        return callback({mensaje: 'Dtaos incompletos o no válido: '+errValidacion, tipoMensaje: 'danger'})
    }
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `INSERT INTO marcas (
                        nombre,
                        created_at,
                        updated_at
                    ) VALUES (
                        ${cnn.escape(data.nombre)},
                        CURDATE(),
                        CURDATE()
                    )`

        cnn.query(qry, (err, res) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrio un error al ingresar el registro: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    resp = callback({mensaje: 'La marca ha sido ingresada.', tipoMensaje: 'success'})
                }else{
                    resp = callback({mensaje: 'La marca noi pudo ser ingresada.' , tipoMensaje: 'danger'})
                }
            }
            cnn.release()
            return resp
        })

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}

MarcasModel.update = (id, data, callback) => {
    let errValidacion = validaDatos(data);
    if(errValidacion.length > 0){
        return callback({mensaje: 'Dtaos incompletos o no válido: '+errValidacion, tipoMensaje: 'danger'})
    }
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `UPDATE marcas SET
                        nombre = ${cnn.escape(data.nombre)},
                        updated_at = CURDATE()
                    WHERE 
                        id = ${cnn.escape(id)}`


        cnn.query(qry, (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrio un error al actualizar el registro: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback({mensaje: 'La marca ha sido actualizada.', tipoMensaje: 'success'})
                }else{
                    resp = callback({mensaje: 'La marca no pudo ser actualizada.' , tipoMensaje: 'danger'})
                }
            }
            cnn.release()
            return resp
        })

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}

MarcasModel.softDelete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `UPDATE marcas SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`
        cnn.query(qry, (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrio un error al eliminar el registro: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback({mensaje: 'La marca ha sido eliminada.', tipoMensaje: 'success'})
                }else{
                    resp = callback({mensaje: 'La marca no pudo ser eliminada.' , tipoMensaje: 'danger'})    
                }
            }
            cnn.release()
            return resp
        })

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}

MarcasModel.delete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `DELETE FROM marcas WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrio un error al eliminar la marca: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback({mensaje: 'La marca ha sido eliminada.', tipoMensaje: 'success'})
                }else{
                    resp = callback({mensaje: 'La marca no pudo ser eliminada.', tipoMensaje: 'danger'})    
                }
            }
            cnn.release()
            return resp
        })

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}


const validaDatos = (data) => {
    let res = ''
    if(data.nombre.length === 0){res = 'El campo nombre es obligatorio.'}
    if(data.nombre.length < 3){res = 'El campo nombre debe tener un mínimo de 3 carácteres. Ingrese un nombre más largo'}
    if(data.nombre.length > 50){res = 'El campo nombre debe tener un máximo de 50 carácteres. Ingrese un nombre más corto'}

    return res
}
module.exports = MarcasModel