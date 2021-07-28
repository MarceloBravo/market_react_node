const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let cnn = connection.conect()

let UnidadesModel = {}

UnidadesModel.getPage = (pag, callback) => {
    if(cnn){
        let desde = constantes.regPerPage * pag
        let hasta = desde + constantes.regPerPage
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
            LIMIT ${desde}, ${hasta}`

        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrió un error al obtener el listado de unidades: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query('SELECT COUNT(id) as totRows FROM unidades WHERE deleted_at IS NULL')
                return callback(null, {data: res, rowsPerPage: constantes.regPerPage, rows: totRows[0][0].totRows, page: pag})
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
    
}

UnidadesModel.filter = (texto, pag, callback) => {
    if(cnn){
        let desde = constantes.regPerPage * pag
        let hasta = desde + constantes.regPerPage
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
            LIMIT ${desde}, ${hasta}`

        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrió un error al filtrar el listado de unidades: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(id) as totRows FROM unidades WHERE deleted_at IS NULL AND ${filtro}`)
                return callback(null, {data: res, rowsPerPage: constantes.regPerPage, rows: totRows[0][0].totRows, page: pag})
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

UnidadesModel.getAll = (callback) => {
    if(cnn){
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

        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrió un error al obtener el listado de todas las unidades: '+err.message, tipoMensaje: 'danger'})
            }else{
                return callback(null, res)
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

UnidadesModel.find = (id, callback) => {
    if(cnn){
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

        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrió un error al buscar la unidad: '+err.message, tipoMensaje: 'danger'})
            }else{
                return callback(null, res[0])
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

UnidadesModel.insert = (data, callback) => {
    if(cnn){
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

        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrió un error al ingresar la unidad: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'La unidad a sido ingresada.', tipoMensaje: 'success'})
                }else{
                    return callback({mensaje: 'No fue posible ingresar la unidad: '+err.message, tipoMensaje: 'danger'})
                }
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

UnidadesModel.update = (id, data, callback) => {
    if(cnn){
        let qry = `UPDATE unidades SET 
                        nombre = ${cnn.escape(data.nombre)},
                        nombre_plural = ${cnn.escape(data.nombre_plural)},
                        updated_at = CURDATE()
                    WHERE 
                        id = ${cnn.escape(id)}`

        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrió un error al actualizar la unidad: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'La unidad a sido actualizada.', tipoMensaje: 'success'})
                }else{
                    return callback({mensaje: 'No fue posible actualizar la unidad: '+err.message, tipoMensaje: 'danger'})
                }
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

UnidadesModel.softDelete = (id, callback) => {
    if(cnn){
        let qry = `UPDATE unidades SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrió un error al eliminar la unidad: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'La unidad a sido eliminada.', tipoMensaje: 'success'})
                }else{
                    return callback({mensaje: 'No fue posible eliminar la unidad: '+err.message, tipoMensaje: 'danger'})
                }
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

UnidadesModel.delete = (id, callback) => {
    if(cnn){
        let qry = `DELETE FROM unidades WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrió un error al borrar la unidad: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'La unidad a sido borrada.', tipoMensaje: 'success'})
                }else{
                    return callback({mensaje: 'No fue posible borrar la unidad: '+err.message, tipoMensaje: 'danger'})
                }
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

module.exports = UnidadesModel