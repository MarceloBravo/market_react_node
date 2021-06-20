const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let cnn = connection.conect()

let MarcasModel = {}

MarcasModel.getPage = (pag, callback) => {
    if(cnn){
        let desde = constantes.regPerPage * pag
        let hasta = desde + constantes.regPerPage
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
                    LIMIT ${desde}, ${hasta}`

        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrio un error al solicitar los datos: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(id) as totRows FROM marcas WHERE deleted_at IS NULL`)
                return callback(null,{data: res, totRows: totRows[0][0].totRows, regPerPage: constantes.regPerPage, pag: pag})
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva', tipoMensaje: 'danger'})
    }
}

MarcasModel.filter = (texto, pag, callback) => {
    if(cnn){
        let desde = constantes.regPerPage * pag
        let hasta = desde + constantes.regPerPage
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
                    LIMIT ${desde}, ${hasta}`


        cnn.query(qry, async (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrio un error al filtrar los registros: '+err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(id) as totRows FROM marcas WHERE deleted_at IS NULL AND ${filtro}`)
                return callback(null,{data: res, totRows: totRows[0][0].totRows, regPerPage: constantes.regPerPage, pag: pag})
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva', tipoMensaje: 'danger'})
    }
}

MarcasModel.getAll = (callback) => {
    if(cnn){
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
            if(err){
                return callback({mensaje: 'Ocurrio un error al solicitar todas las marcas: '+err.message, tipoMensaje: 'danger'})
            }else{
                return callback(null, res)
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva', tipoMensaje: 'danger'})
    }
}

MarcasModel.find = (id, callback) => {
    if(cnn){
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
            if(err){
                return callback({mensaje: 'Ocurrio un error al buscar el registro: '+err.message, tipoMensaje: 'danger'})
            }else{
                return callback(null, res[0])
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva', tipoMensaje: 'danger'})
    }
}

MarcasModel.insert = (data, callback) => {
    let errValidacion = validaDatos(data);
    if(errValidacion.length > 0){
        return callback({mensaje: 'Dtaos incompletos o no válido: '+errValidacion, tipoMensaje: 'danger'})
    }
    if(cnn){
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
            if(err){
                return callback({mensaje: 'Ocurrio un error al ingresar el registro: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback({mensaje: 'La marca ha sido ingresada.', tipoMensaje: 'success'})
                }else{
                    return callback({mensaje: 'La marca noi pudo ser ingresada.' , tipoMensaje: 'danger'})
                }
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva', tipoMensaje: 'danger'})
    }
}

MarcasModel.update = (id, data, callback) => {
    let errValidacion = validaDatos(data);
    if(errValidacion.length > 0){
        return callback({mensaje: 'Dtaos incompletos o no válido: '+errValidacion, tipoMensaje: 'danger'})
    }
    if(cnn){
        let qry = `UPDATE marcas SET
                        nombre = ${cnn.escape(data.nombre)},
                        created_at = CURDATE(),
                        updated_at = CURDATE()
                    WHERE 
                        id = ${cnn.escape(id)}`


        cnn.query(qry, (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrio un error al actualizar el registro: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback({mensaje: 'La marca ha sido actualizada.', tipoMensaje: 'success'})
                }else{
                    return callback({mensaje: 'La marca no pudo ser actualizada.' , tipoMensaje: 'danger'})
                }
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva', tipoMensaje: 'danger'})
    }
}

MarcasModel.softDelete = (id, callback) => {
    if(cnn){
        let qry = `UPDATE marcas SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`
        cnn.query(qry, (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrio un error al eliminar el registro: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback({mensaje: 'La marca ha sido eliminada.', tipoMensaje: 'success'})
                }else{
                    return callback({mensaje: 'La marca no pudo ser eliminada.' , tipoMensaje: 'danger'})    
                }
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva', tipoMensaje: 'danger'})
    }
}

MarcasModel.delete = (id, callback) => {
    if(cnn){
        let qry = `DELETE FROM marcas WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, res) =>{
            if(err){
                return callback({mensaje: 'Ocurrio un error al eliminar la marca: '+err.message, tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback({mensaje: 'La marca ha sido eliminada.', tipoMensaje: 'success'})
                }else{
                    return callback({mensaje: 'La marca no pudo ser eliminada.', tipoMensaje: 'danger'})    
                }
                
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva', tipoMensaje: 'danger'})
    }
}


const validaDatos = (data) => {
    let res = ''
    if(data.nombre.length === 0){res = 'El campo nombre es obligatorio.'}
    if(data.nombre.length < 3){res = 'El campo nombre debe tener un mínimo de 3 carácteres. Ingrese un nombre más largo'}
    if(data.nombre.length > 50){res = 'El campo nombre debe tener un máximo de 50 carácteres. Ingrese un nombre más corto'}

    return res
}
module.exports = MarcasModel