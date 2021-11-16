const connection = require('../../db/connection')
const regPerPage = require('../shared/constants');

let pool = connection.pool()

let TipoPagosModel = {}

TipoPagosModel.getPage = (pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = regPerPage * pag
        let qry =  `SELECT 
                        id,
                        codigo,
                        nombre,
                        descripcion,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        tipos_de_pago 
                    WHERE 
                        deleted_at IS NULL 
                    LIMIT ${desde}, ${regPerPage}`

            cnn.query(qry, async (err, result) => {
                let resp = null
                if(err){
                    resp = callback({mensaje: 'Ocurrió un error al filtrar los tipos de pago: ' + err.message, tipoMendsaje: 'danger'})
                }else{
                    let totRows = await cnn.promise().query(`SELECT COUNT(id) as Total FROM tipos_de_pago WHERE deleted_at IS NULL`)
                    //console.log('RESPONSE', totRows)
                    resp = callback(null, {data: result, rowsPerPage: constantes.regPerPage, totRows: totRows[0][0].Total, page: pag})
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

TipoPagosModel.filter = (texto, pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = regPerPage * pag
        let filtro = ` AND (
                    id LIKE ${cnn.escape('%'+texto+'%')} OR 
                    codigo LIKE ${cnn.escape('%'+texto+'%')} OR 
                    nombre LIKE ${cnn.escape('%'+texto+'%')} OR 
                    descripcion LIKE ${cnn.escape('%'+texto+'%')} OR
                    CONVERT(p.created_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
                    CONVERT(p.updated_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')}
                    )
                `
        let qry =  `SELECT 
                        id,
                        codigo,
                        nombre,
                        descripcion,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        tipos_de_pago 
                    WHERE 
                        deleted_at IS NULL 
                        ${filtro}
                    LIMIT ${desde}, ${regPerPage}`

            cnn.query(qry, async (err, result) => {
                let resp = null
                if(err){
                    resp = callback({mensaje: 'Ocurrió un error al filtrar los tipos de pago: ' + err.message, tipoMendsaje: 'danger'})
                }else{
                    let totRows = await cnn.promise().query(`SELECT COUNT(id) as Total FROM tipos_de_pago WHERE deleted_at IS NULL ${filtro}`)
                    //console.log('RESPONSE', totRows)
                    resp = callback(null, {data: result, rowsPerPage: constantes.regPerPage, totRows: totRows[0][0].Total, page: pag})
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

TipoPagosModel.getAll = (callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry =  `SELECT 
                        id,
                        codigo,
                        nombre,
                        descripcion,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        tipos_de_pago 
                    WHERE 
                        deleted_at IS NULL`

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al buscar el tipo de pago: ' + err.message, tipoMendsaje: 'danger'})
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

TipoPagosModel.findByCode = (codigo, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry =  `SELECT 
                        id,
                        codigo,
                        nombre,
                        descripcion,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        tipos_de_pago 
                    WHERE 
                        deleted_at IS NULL AND 
                        codigo = ${cnn.escape(codigo)}`

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al buscar el tipo de pago: ' + err.message, tipoMendsaje: 'danger'})
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

TipoPagosModel.find = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry =  `SELECT 
                        id,
                        codigo,
                        nombre,
                        descripcion,
                        created_at,
                        updated_at,
                        deleted_at
                    FROM 
                        tipos_de_pago 
                    WHERE 
                        deleted_at IS NULL AND 
                        id = ${cnn.escape(id)}`
        
        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al buscar el tipo de pago: ' + err.message, tipoMendsaje: 'danger'})
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


TipoPagosModel.insert = (data, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry =  `INSERT INTO tipos_de_pago ( 
                        id,
                        codigo,
                        nombre,
                        descripcion,
                        created_at,
                        updated_at
                    ) VALUES (
                        ${cnn.escape(data.id)},
                        ${cnn.escape(data.codigo)},
                        ${cnn.escape(data.nombre)},
                        ${cnn.escape(data.descripcion)},
                        CURDATE(),
                        CURDATE()
                    )`
        
        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al actualizar el tipo de pago: ' + err.message, tipoMendsaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback(null, {mensaje: 'El tipo de pago ha sido actualizado.', tipoMendsaje: 'success'})
                }else{
                    resp = callback(null, {mensaje: 'No fue posible actualizar el registro.', tipoMendsaje: 'danger'})
                }
                cnn.release()
                return resp
            }
        })

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}


TipoPagosModel.update = (id, data, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry =  `UPDATE tipos_de_pago SET 
                        id = ${cnn.escape(data.id)},
                        codigo = ${cnn.escape(data.codigo)},
                        nombre = ${cnn.escape(data.nombre)},
                        descripcion = ${cnn.escape(data.descripcion)},
                        updated_at = CURDATE() 
                    WHERE 
                        id = ${cnn.escape(id)}`
        
        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al actualizar el tipo de pago: ' + err.message, tipoMendsaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback(null, {mensaje: 'El tipo de pago ha sido actualizado.', tipoMendsaje: 'success'})
                }else{
                    resp = callback(null, {mensaje: 'No fue posible actualizar el registro.', tipoMendsaje: 'danger'})
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


TipoPagosModel.softDelete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry =  `UPDATE tipos_de_pago SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`
        
        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al borrar el registro: ' + err.message, tipoMendsaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback(null, {mensaje: 'El registro ha sido borrado.', tipoMendsaje: 'success'})
                }else{
                    resp = callback(null, {mensaje: 'No fue posible borrar el registro.', tipoMendsaje: 'danger'})
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


TipoPagosModel.delete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 
        
        let qry =  `DELETE FROM tipo_de_pago WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al eliminar el registro: ' + err.message, tipoMendsaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback(null, {mensaje: 'El registro ha sido eliminado.', tipoMendsaje: 'success'})
                }else{
                    resp = callback(null, {mensaje: 'No fue posible eliminar el registro.', tipoMendsaje: 'danger'})
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

module.exports = TipoPagosModel