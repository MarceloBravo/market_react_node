const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let pool = connection.pool()

let UnidadesModel = {}

UnidadesModel.getPage = (pag, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let qry = `
            SELECT
                id,
                nombre,
                nombre_plural,
                created_at,
                updated_at,
                deleted_at
            FROM 
                unidades
            WHERE
                deleted_at IS NULL
            LIMIT ${desde}, ${constantes.regPerPage}`

        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener el listado de unidades: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query('SELECT COUNT(id) as totRows FROM unidades WHERE deleted_at IS NULL')
                resp = callback(null, {data: result, rowsPerPage: constantes.regPerPage, rows: totRows[0][0].totRows, page: pag})
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

UnidadesModel.filter = (texto, pag, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let filtro = `
                    (
                        nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
                        nombre_plural LIKE ${cnn.escape('%'+texto+'%')} OR 
                        DATE_FORMAT(created_at, '%d %m %Y') LIKE ${cnn.escape('%'+texto+'%')} OR 
                        DATE_FORMAT(updated_at, '%d %m %Y') LIKE ${cnn.escape('%'+texto+'%')} 
                    )`
        let qry = `
            SELECT
                id,
                nombre,
                nombre_plural,
                created_at,
                updated_at,
                deleted_at
            FROM 
                unidades
            WHERE
                deleted_at IS NULL AND
                ${filtro}
            LIMIT ${desde}, ${constantes.regPerPage}`

        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al filtrar el listado de unidades: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(id) as totRows FROM unidades WHERE deleted_at IS NULL AND ${filtro}`)
                resp = callback(null, {data: result, rowsPerPage: constantes.regPerPage, rows: totRows[0][0].totRows, page: pag})
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

UnidadesModel.getAll = (callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT
                        id,
                        nombre,
                        nombre_plural,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        unidades
                    WHERE
                        deleted_at IS NULL`

        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener el listado de todas las unidades: '+err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, result)
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

UnidadesModel.find = (id, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT
                        id,
                        nombre,
                        nombre_plural,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        unidades
                    WHERE
                        deleted_at IS NULL AND 
                        id = ${cnn.escape(id)}`

        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al buscar la unidad: '+err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, result[0])
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

UnidadesModel.insert = (data, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `INSERT INTO unidades (
                        nombre,
                        nombre_plural,
                        created_at,
                        updated_at
                    ) VALUES (
                        ${cnn.escape(data.nombre)},
                        ${cnn.escape(data.nombre_plural)},
                        CURDATE(),
                        CURDATE()
                    )`

        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al ingresar la unidad: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback(null, {mensaje: 'La unidad a sido ingresada.', tipoMensaje: 'success'})
                }else{
                    resp = callback({mensaje: 'No fue posible ingresar la unidad: '+err.message, tipoMensaje: 'danger'})
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

UnidadesModel.update = (id, data, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `UPDATE unidades SET 
                        nombre = ${cnn.escape(data.nombre)},
                        nombre_plural = ${cnn.escape(data.nombre_plural)},
                        updated_at = CURDATE()
                    WHERE 
                        id = ${cnn.escape(id)}`

        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al actualizar la unidad: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback(null, {mensaje: 'La unidad a sido actualizada.', tipoMensaje: 'success'})
                }else{
                    resp = callback({mensaje: 'No fue posible actualizar la unidad: '+err.message, tipoMensaje: 'danger'})
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

UnidadesModel.softDelete = (id, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `UPDATE unidades SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al eliminar la unidad: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback(null, {mensaje: 'La unidad a sido eliminada.', tipoMensaje: 'success'})
                }else{
                    resp = callback({mensaje: 'No fue posible eliminar la unidad: '+err.message, tipoMensaje: 'danger'})
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

UnidadesModel.delete = (id, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            cnn.release();
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `DELETE FROM unidades WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, async (err, result) =>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al borrar la unidad: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback(null, {mensaje: 'La unidad a sido borrada.', tipoMensaje: 'success'})
                }else{
                    resp = callback({mensaje: 'No fue posible borrar la unidad: '+err.message, tipoMensaje: 'danger'})
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

module.exports = UnidadesModel