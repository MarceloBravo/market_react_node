const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let pool = connection.pool()

let impuestosModel = {}

impuestosModel.getPage = (pag, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let qry = `SELECT
                        id,
                        nombre,
                        sigla,
                        porcentaje,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        impuestos 
                    WHERE 
                        deleted_at IS NULL
                    LIMIT ${desde}, ${constantes.regPerPage}`

        cnn.query(qry, async (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener los datos: '+err.sqlMessage, tipoMensaje: 'danger', id:-1})
            }else{
                let totReg = await cnn.promise().query(`SELECT COUNT(*) AS totReg FROM impuestos WHERE deleted_at IS NULL`)
                resp = callback(null,{data: res, totRows: totReg[0][0].totReg, rowsPerPage: constantes.regPerPage, page: pag})
            }
            cnn.release()
            return resp;
        })
    
        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}


impuestosModel.getAll = (callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT
                        id,
                        nombre,
                        sigla,
                        porcentaje,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        impuestos 
                    WHERE 
                        deleted_at IS NULL`

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener el listado de todos los impuestos: '+err.sqlMessage, tipoMensaje: 'danger', id:-1})
            }else{
                resp =  callback(null, res)
            }
            cnn.release()
            return resp;
        })
    
        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}



impuestosModel.filter = (texto, pag, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let criterio = `(
                            nombre LIKE ${cnn.escape('%'+texto+'%')} OR
                            sigla LIKE ${cnn.escape('%'+texto+'%')} OR
                            CONVERT(porcentaje, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR 
                            CONVERT(created_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
                            CONVERT(updated_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')}
                        )`
        let qry = `SELECT
                        id,
                        nombre,
                        sigla,
                        porcentaje,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        impuestos 
                    WHERE 
                        deleted_at IS NULL AND 
                        ${criterio}
                    LIMIT ${desde}, ${constantes.regPerPage}`

        cnn.query(qry, async (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener los datos: '+err.sqlMessage, tipoMensaje: 'danger', id:-1})
            }else{
                let totReg = await cnn.promise().query(`SELECT COUNT(*) AS totReg FROM impuestos WHERE deleted_at IS NULL AND ${criterio}`)
                resp =  callback(null,{data: res, totRows: totReg[0][0].totReg, rowsPerPage: constantes.regPerPage, page: pag})
            }
            cnn.release()
            return resp;
        })
    
        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}


impuestosModel.find = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            SELECT
                nombre,
                sigla,
                porcentaje,
                created_at,
                updated_at,
                deleted_at
            FROM 
                impuestos 
            WHERE 
                deleted_at IS NULL AND 
                id = ${cnn.escape(id)}
            `

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al solicitar los datops del registro: '+err.sqlMessage, tipoMensaje:'danger', id:-1})
            }else{
                resp = callback(res[0])
            }
            cnn.release()
            return resp;
        })
        
        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}


impuestosModel.insert = (data, callback) => {
    let validacion = validaDatos(data)
    if(Object.keys(validacion).length > 0){
        return callback({mensaje: validacion, tipoMensaje: 'danger', id: -1})
    }
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
                INSERT INTO impuestos (
                    nombre,
                    sigla,
                    porcentaje,
                    created_at,
                    updated_at
                ) VALUES (
                    ${cnn.escape(data.nombre)},
                    ${cnn.escape(data.sigla)},
                    ${cnn.escape(data.porcentaje)},
                    CURDATE(),
                    CURDATE()
                )`

        cnn.query(qry, (err, res) => {
            let errResult = null
            let successResult = null
            if(err){
                errResult = {mensaje: 'Ocurrió un error al intentar ingresar el registro: '+err.sqlMessage, tipoMensaje: 'danger', id: -1}
            }else{
                if(res.affectedRows > 0){
                    successResult = {mensaje: 'El registro a sido ingresado exitosamente.', tipoMensaje: 'success', id: res.insertId}
                }else{
                    errResult = {mensaje: 'El registro no pudo ser ingresado.', tipoMensaje: 'danger', id: -1}
                }
            }
            cnn.release()
            return callback(errResult, successResult)
        })
    
        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}


impuestosModel.update = (id, data, callback) => {
    let validacion = validaDatos(data)
    if(Object.keys(validacion).length > 0){
        return callback({mensaje: validacion, tipoMensaje: 'danger', id: -1})
    }
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
                UPDATE impuestos SET
                    nombre = ${cnn.escape(data.nombre)},
                    sigla = ${cnn.escape(data.sigla)},
                    porcentaje = ${cnn.escape(data.porcentaje)},
                    updated_at = CURDATE()
                WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, res) => {
            let errResult = null
            let successResult = null
            if(err){
                errResult = {mensaje: 'Ocurrió un error al intentar actualizar el registro: '+err.sqlMessage, tipoMensaje: 'danger', id: -1}
            }else{
                if(res.affectedRows > 0){
                    successResult = {mensaje: 'El registro a sido actualizado exitosamente.', tipoMensaje: 'success', id}
                }else{
                    errResult = {mensaje: 'El registro no pudo ser actualizado.', tipoMensaje: 'danger', id: -1}
                }
            }
            cnn.release()
            return callback(errResult, successResult)
        })
    
        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}


impuestosModel.softDelete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `UPDATE impuestos SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, res) => {
            let errResult = null
            let successResult = null
            if(err){
                errResult = {mensaje: 'Ocurrió un error al intentar eliminar el registro: '+err.sqlMessage, tipoMensaje: 'danger', id: -1}
            }else{
                if(res.affectedRows > 0){
                    successResult = {mensaje: 'El registro a sido eliminado exitosamente.', tipoMensaje: 'success', id}
                }else{
                    errResult = {mensaje: 'El registro no pudo ser eliminado.', tipoMensaje: 'danger', id: -1}
                }
            }
            cnn.release()
            return callback(errResult, successResult)
        })
    
        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}


impuestosModel.delete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `DELETE FROM impuestos WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, res) => {
            let errResult = null
            let successResult = null
            if(err){
                errResult = {mensaje: 'Ocurrió un error al intentar eliminar el registro: '+err.sqlMessage, tipoMensaje: 'danger', id: -1}
            }else{
                if(res.affectedRows > 0){
                    successResult = {mensaje: 'El registro a sido eliminado exitosamente.', tipoMensaje: 'success', id}
                }else{
                    errResult = {mensaje: 'El registro no pudo ser eliminado.', tipoMensaje: 'danger', id: -1}
                }
            }
            cnn.release()
            return callback(errResult, successResult)
        })
    
        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}


const validaDatos = (data) => {
    let msg = {}
    if(!data.nombre)msg.nombre = 'El nombre es obligatorio.'
    if(data.nombre && data.nombre.length > 100)msg.nombre = 'El nombre debe tener hasta 100 carácteres. Ingresa un nombre más corto.'
    if(data.nombre && data.nombre.length < 3)msg.nombre = 'El nombre debe tener almenos 3 carácteres. Ingresa un nombre más largo.'

    if(!data.sigla)msg.sigla += 'La sigla es obligatoria.'
    if(data.sigla && data.sigla.length > 15)msg.sigla = 'La sigla debe tener hasta 15 carácteres. Ingresa una sigla más corto.'
    if(data.sigla && data.sigla.length < 3)msg.sigla = 'La sigla debe tener almenos 3 carácteres. Ingresa una sigla más larga.'

    if(!data.porcentaje)msg.porcentaje += 'El porcentaje es obligatoria.'
    if(data.porcentaje && isNaN(data.porcentaje))msg.porcentaje = 'El porcentaje debe ser un número.'
    if(!isNaN(data.porcentaje) && data.porcentaje < 0)msg.porcentaje = 'El porcentaje debe ser un número positivo.'

    return msg;
} 


module.exports = impuestosModel