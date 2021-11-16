const connection = require('../../db/connection')
const constants = require('../shared/constants')

const PreciosModel = {}

let pool = connection.pool()

let select = `SELECT 
    pp.id,
    p.id as producto_id,
    p.nombre, 
    p.descripcion, 	
    p.stock, 
    p.unidad_id, 
    u.nombre unidad, 
    p.marca_id, 
    m.nombre marca, 
    p.categoria_id,
    cat.nombre categoria,
    p.sub_categoria_id, 
    s_cat.nombre sub_categoria, 
    p.precio_venta_normal,
    CONCAT('$', ' ', FORMAT(p.precio_venta_normal,0, 'de_DE')) AS str_precio_venta_normal,     
    pp.precio, 
    CONCAT('$', ' ', FORMAT(pp.precio,0, 'de_DE')) AS str_precio, 
    pp.descuento, 
    pp.descuento_maximo,
    pp.fecha_desde,
    pp.fecha_hasta,
    pp.created_at,
    pp.updated_at `

let from = ` FROM 
                productos p 
            INNER JOIN unidades u ON p.unidad_id = u.id 
            INNER JOIN marcas m ON p.marca_id = m.id 
            INNER JOIN categorias cat ON p.categoria_id = cat.id 
            INNER JOIN sub_categorias s_cat ON p.sub_categoria_id = s_cat.id  
            LEFT JOIN precios_productos pp ON p.id = pp.producto_id 
            WHERE 
                p.deleted_at IS NULL AND 
                pp.deleted_at IS NULL`

const getQueryFilter = (cnn, texto) => {
    return from + ` AND 
            (
                p.nombre LIKE ${cnn.escape('%'+texto+'%')} OR
                p.descripcion LIKE ${cnn.escape('%'+texto+'%')} OR
                u.nombre LIKE ${cnn.escape('%'+texto+'%')} OR
                m.nombre LIKE ${cnn.escape('%'+texto+'%')} OR
                cat.nombre LIKE ${cnn.escape('%'+texto+'%')} OR
                s_cat.nombre LIKE ${cnn.escape('%'+texto+'%')} OR
                CONVERT(p.precio_venta_normal, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
                CONVERT(pp.precio, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
                CONVERT(p.stock, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
                CONVERT(pp.descuento, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
                CONVERT(pp.descuento_maximo, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
                CONVERT(pp.fecha_desde, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
                CONVERT(pp.fecha_hasta, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
                CONVERT(pp.created_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')} OR
                CONVERT(pp.updated_at, CHAR) LIKE ${cnn.escape('%'+texto+'%')}
            )`
}

PreciosModel.get = (pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constants.regPerPage * pag
        let qry = select + from + ` ORDER BY nombre LIMIT ${desde}, ${constants.regPerPage}`

        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener el listado de precios: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(p.id) as totRows ${from}`) 
                resp = callback(null, {data: result, totRows: totRows[0][0].totRows, rowsPerPage: constants.regPerPage, page: pag})
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

PreciosModel.getAll = (callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        cnn.query(select + from, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener el listado de precios: ' + err.message, tipoMensaje: 'danger'})
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

PreciosModel.filter = (texto, pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constants.regPerPage * pag
        let qry = select + getQueryFilter(texto) + ` LIMIT ${desde}, ${constants.regPerPage}`

        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener el listado de precios: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let totRows = await cnn.promise().query(`SELECT COUNT(p.id) as totRows ${getQueryFilter(texto)}`) 
                resp = callback(null, {data: result, totRows: totRows[0][0].totRows, rowsPerPage: constants.regPerPage, page: pag})
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


PreciosModel.save = async (data, callback) => {
    let transactionStart = false
    try{
        pool.getConnection(async (err, cnn) => {
            if (err) {
                return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
            } 
    
            let desde = constants.regPerPage * data.pag
            data.data.forEach(i => {
                i.fecha_desde = i.fecha_desde ? i.fecha_desde.toLocaleString().replace('T',' ').replace('Z','') : null 
                i.fecha_hasta = i.fecha_hasta ? i.fecha_hasta.toLocaleString().replace('T',' ').replace('Z','') : null 
            })

            await cnn.promise().beginTransaction();
            transactionStart = true
            await insertPrice(cnn, data.data.filter(i => i.id === null || i.id < 0))
            await updatePrice(cnn, data.data.filter(i => i.id !== null && i.id > 0))
            await deletePrice(cnn, data.data.filter(i => i.deleted).map(i => i.id))
            await cnn.promise().commit();
            
            let qry = select + (data.texto ? getQueryFilter(data.texto) : from) + ` LIMIT ${desde}, ${constants.regPerPage}`
            
            cnn.query(qry, async (err, result) => {
                let resp = null
                if(err){
                    resp = callback({mensaje: 'Los precios han sido actualizados pero ocurrió un error al obtener el listado de precios actualizado: ' + err.message, tipoMensaje: 'danger'})
                }else{
                    let totRows = await cnn.promise().query(`SELECT COUNT(p.id) as totRows ${data.texto ? getQueryFilter(data.texto) : from}`)
                    resp = callback(null, {data: result, totRows: totRows[0][0].totRows, rowsPerPage: constants.regPerPage, pag: data.pag, mensaje: 'Los precios han sido actualizados exitosamente', tipoMensaje: 'success'})
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

    }catch(err){
        if(transactionStart)await cnn.promise().rollback();
        return callback({mensaje: 'Ocurrió un error al registrar los precios: ' + err.message, tipoMensaje: 'danger'})
    }

}

const insertPrice = async (cnn, data) => {
    console.log(data)
    data.forEach(async i => {
        let qry = `INSERT INTO precios_productos (
                        producto_id,
                        precio,
                        descuento,
                        descuento_maximo,
                        fecha_desde,
                        fecha_hasta,
                        created_at,
                        updated_at
                    ) VALUES (
                        ${cnn.escape(i.producto_id)},
                        ${cnn.escape(i.precio)},
                        ${cnn.escape(i.descuento)},
                        ${cnn.escape(i.descuento_maximo)},
                        ${cnn.escape(i.fecha_desde)},
                        ${cnn.escape(i.fecha_hasta)},
                        CURDATE(),
                        CURDATE()
                    )`
                    
        await cnn.promise().query(qry)
    })
}

const updatePrice = async (cnn, data) =>{
    data.forEach(async i => {
        let qry = `UPDATE precios_productos SET 
                        precio = ${cnn.escape(i.precio)},
                        descuento = ${cnn.escape(i.descuento)},
                        descuento_maximo = ${cnn.escape(i.descuento_maximo)},
                        fecha_desde = ${cnn.escape(i.fecha_desde)},
                        fecha_hasta = ${cnn.escape(i.fecha_hasta)},
                        updated_at = CURDATE()
                    WHERE id = ${cnn.escape(i.id)}`
                    
        await cnn.promise().query(qry)
    })
}


const deletePrice = async (cnn, arrIds) => {
    if(arrIds.length > 0){
        let qry = `UPDATE precios_productos SET deleted_at = CURDATE() WHERE id IN (${arrIds})`
        await cnn.promise().query(qry)
    }
}



PreciosModel.softDelete = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `UPDATE precios_productos SET deleted_at = CURDATE() WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar eliminar el precio: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, {mensaje: 'El precio ha sido eliminado.', tipoMensaje: 'success'})
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


PreciosModel.destroy = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `DELETE FROM precios_productos WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar borrar el precio: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, {mensaje: 'El precio ha sido borrado.', tipoMensaje: 'success'})
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

module.exports = PreciosModel