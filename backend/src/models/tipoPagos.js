const connection = require('../../db/connection')
const regPerPage = require('../shared/constants');

let cnn = connection.conect()

let TipoPagosModel = {}

TipoPagosModel.getPage = (pag, callback) => {
    if(cnn){
        let desde = regPerPage * pag
        let hasta = desde * regPerPage
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
                    LIMIT ${desde}, ${hasta}`

            cnn.query(qry, async (err, res) => {
                if(err){
                    return callback({mensaje: 'Ocurrió un error al filtrar los tipos de pago: ' + err.message, tipoMendsaje: 'danger'})
                }else{
                    let totRows = await cnn.promise().query(`SELECT COUNT(id) as Total FROM tipos_de_pago WHERE deleted_at IS NULL`)
                    //console.log('RESPONSE', totRows)
                    return callback(null, {data: res, rowsPerPage: constantes.regPerPage, totRows: totRows[0][0].Total, page: pag})
                }
            })

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

TipoPagosModel.filter = (texto, pag, callback) => {
    if(cnn){
        let desde = regPerPage * pag
        let hasta = desde * regPerPage
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
                    LIMIT ${desde}, ${hasta}`

            cnn.query(qry, async (err, res) => {
                if(err){
                    return callback({mensaje: 'Ocurrió un error al filtrar los tipos de pago: ' + err.message, tipoMendsaje: 'danger'})
                }else{
                    let totRows = await cnn.promise().query(`SELECT COUNT(id) as Total FROM tipos_de_pago WHERE deleted_at IS NULL ${filtro}`)
                    //console.log('RESPONSE', totRows)
                    return callback(null, {data: res, rowsPerPage: constantes.regPerPage, totRows: totRows[0][0].Total, page: pag})
                }
            })
        
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

TipoPagosModel.getAll = (callback) => {
    if(cnn){
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

            cnn.query(qry, (err, res) => {
                if(err){
                    return callback({mensaje: 'Ocurrió un error al buscar el tipo de pago: ' + err.message, tipoMendsaje: 'danger'})
                }else{
                    console.log('RESPONSE', res)
                    return callback(null, res)
                }
            })
        
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

TipoPagosModel.findByCode = (codigo, callback) => {
    if(cnn){
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

            cnn.query(qry, (err, res) => {
                if(err){
                    return callback({mensaje: 'Ocurrió un error al buscar el tipo de pago: ' + err.message, tipoMendsaje: 'danger'})
                }else{
                    return callback(null, res[0])
                }
            })
        
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

TipoPagosModel.find = (id, callback) => {
    if(cnn){
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
        
        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al buscar el tipo de pago: ' + err.message, tipoMendsaje: 'danger'})
            }else{
                return callback(null, res[0])
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}


TipoPagosModel.insert = (data, callback) => {
    if(cnn){
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
        
        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al actualizar el tipo de pago: ' + err.message, tipoMendsaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'El tipo de pago ha sido actualizado.', tipoMendsaje: 'success'})
                }else{
                    return callback(null, {mensaje: 'No fue posible actualizar el registro.', tipoMendsaje: 'danger'})
                }
            }
        })
        
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}


TipoPagosModel.update = (id, data, callback) => {
    if(cnn){
        let qry =  `UPDATE tipos_de_pago SET 
                        id = ${cnn.escape(data.id)},
                        codigo = ${cnn.escape(data.codigo)},
                        nombre = ${cnn.escape(data.nombre)},
                        descripcion = ${cnn.escape(data.descripcion)},
                        updated_at = CURDATE() 
                    WHERE 
                        id = ${cnn.escape(id)}`
        
        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al actualizar el tipo de pago: ' + err.message, tipoMendsaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'El tipo de pago ha sido actualizado.', tipoMendsaje: 'success'})
                }else{
                    return callback(null, {mensaje: 'No fue posible actualizar el registro.', tipoMendsaje: 'danger'})
                }
            }
        })
        
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}


TipoPagosModel.softDelete = (id, callback) => {
    if(cnn){
        let qry =  `UPDATE tipos_de_pago SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`
        
        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al borrar el registro: ' + err.message, tipoMendsaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'El registro ha sido borrado.', tipoMendsaje: 'success'})
                }else{
                    return callback(null, {mensaje: 'No fue posible borrar el registro.', tipoMendsaje: 'danger'})
                }
            }
        })
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
} 


TipoPagosModel.delete = (id, callback) => {
    if(cnn){
        let qry =  `DELETE FROM tipo_de_pago WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al eliminar el registro: ' + err.message, tipoMendsaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    return callback(null, {mensaje: 'El registro ha sido eliminado.', tipoMendsaje: 'success'})
                }else{
                    return callback(null, {mensaje: 'No fue posible eliminar el registro.', tipoMendsaje: 'danger'})
                }
            }
        })
        
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

module.exports = TipoPagosModel