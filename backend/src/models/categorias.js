const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let cnn = connection.conect()

let categoriasModel = {}

categoriasModel.getPage = (pag, callback) => {
    if(cnn){
        let desde = constantes.regPerPage * pag
        let hasta = desde + constantes.regPerPage
        let qry = `
            SELECT
                id,
                nombre,
                created_at,
                updated_at 
            FROM 
                categorias 
            WHERE 
                deleted_at IS NULL 
            LIMIT ${desde}, ${hasta}
        `

        cnn.query(qry, async (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al solicitar los datos: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT count(*) AS totRows FROM categorias WHERE deleted_at IS NULL`)
                console.log(totRows[0][0])
                return callback(null, {data: res, totRows: totRows[0][0].totRows, rowsPerPage: constantes.regPerPage, pag})
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

categoriasModel.filter = (texto, pag, callback) => {
    if(cnn){
        let desde = constantes.regPerPage * pag
        let hasta = desde + constantes.regPerPage
        let filtro = `(
            nombre LIKE ${cnn.escape('%'+texto+'%')} OR
            CONVERT(created_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
            CONVERT(updated_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')}
        )`
        let qry = `
            SELECT
                id,
                nombre,
                created_at,
                updated_at 
            FROM 
                categorias 
            WHERE 
                deleted_at IS NULL AND 
                ${filtro}
            LIMIT ${desde}, ${hasta}
        `

        cnn.query(qry, async (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al filtrar los registros: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT count(*) AS totRows FROM categorias WHERE deleted_at IS NULL AND nombre LIKE ${filtro}`)
                return callback(null, {data: res, totRows: totRows[0][0].totRows, rowsPerPage: constantes.regPerPage, pag})
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

categoriasModel.getAll = (callback) => {
    if(cnn){
        let qry = `
            SELECT
                id,
                nombre,
                created_at,
                updated_at 
            FROM 
                categorias 
            WHERE 
                deleted_at IS NULL
        `

        cnn.query(qry, async (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al solicitar todas las categorías: ' + err.message, tipoMensaje: 'danger'})
            }else{
                return callback(null, res)
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

categoriasModel.find = (id, callback) => {
    if(cnn){
        let qry = `
            SELECT
                nombre,
                created_at,
                updated_at 
            FROM 
                categorias 
            WHERE 
                deleted_at IS NULL AND 
                id = ${cnn.escape(id)}
        `

        cnn.query(qry, async (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al buscar el registro: ' + err.message, tipoMensaje: 'danger'})
            }else{
                return callback(null, res[0])
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

categoriasModel.insert = (data, callback) => {
    let validacion = validaDatos(data);
    if(validacion.length > 0){
        return callback({mensaje: 'Datos no válidos o incompletos: ' + validacion[0], tipoMensaje: 'danger'})
    }
    if(cnn){
        let qry = `
            INSERT INTO categorias (
                nombre,
                created_at,
                updated_at 
            ) VALUES (
                ${cnn.escape(data.nombre)},
                CURDATE(),
                CURDATE()
            )
        `

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al insertar el registro: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'El registro ha sido ingresado.' , tipoMensaje: 'success', id: res.insertId})
                }else{
                    return callback({mensaje: 'El registro no pudo ser ingresado.' , tipoMensaje: 'danger'})
                }
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

categoriasModel.update = (id, data, callback) => {
    let validacion = validaDatos(data);
    if(validacion.length > 0){
        return callback({mensaje: 'Datos no válidos o incompletos: ' + validacion[0], tipoMensaje: 'danger'})
    }
    if(cnn){
        let qry = `
            UPDATE categorias SET 
                nombre = ${cnn.escape(data.nombre)},
                updated_at = CURDATE()
            WHERE 
                id = ${cnn.escape(id)}
            `

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al actualizar el registro: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'El registro ha sido actualizado.' , tipoMensaje: 'success', id})
                }else{
                    return callback({mensaje: 'El registro no pudo ser actualizado.' , tipoMensaje: 'danger'})
                }
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

categoriasModel.softDelete = (id, callback) => {
    if(cnn){
        let qry = `UPDATE categorias SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al eliminar el registro: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'El registro ha sido eliminado.' , tipoMensaje: 'success', id})
                }else{
                    return callback({mensaje: 'El registro no pudo ser eliminado.' , tipoMensaje: 'danger'})
                }
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

categoriasModel.delete = (id, callback) => {
    if(cnn){
        let qry = `DELETE FROM categorias WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al eliminar el registro: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'El registro ha sido eliminado.' , tipoMensaje: 'success', id})
                }else{
                    return callback({mensaje: 'El registro no pudo ser eliminado.' , tipoMensaje: 'danger'})
                }
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

const validaDatos = (data) => {
    let res = []
    if(data.nombre.length === 0){res.push('El nombre de la categoría es obligatorio.')}
    if(data.nombre.length < 3){res.push('El nombre de la categoría debe tener almenos 3 carácteres. Ingresa un nombre más largo.')}
    if(data.nombre.length > 50){res.push('El nombre de la categoría debe tener almenos 50 carácteres. Ingresa un nombre más corto.')}
    return res
}

module.exports = categoriasModel