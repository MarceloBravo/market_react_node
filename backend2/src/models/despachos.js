const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let pool = connection.pool()

let DespachosModel = {}

DespachosModel.getPage = (pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let qry = `SELECT 
                        dv.id, 
                        CONCAT(vc.rut, ' ', CASE WHEN vcsr.rut IS NULL THEN '' ELSE vcsr.rut END) AS rut,
                        CONCAT(
                                CASE WHEN vc.nombres IS NULL THEN '' ELSE vc.nombres END, ' ', 
                                CASE WHEN vc.apellido1 IS NULL THEN '' ELSE vc.apellido1 END, ' ', 
                                CASE WHEN vc.apellido2 IS NULL THEN '' ELSE vc.apellido2 END, 
                                CASE WHEN vcsr.nombres IS NULL THEN '' ELSE vcsr.nombres END, ' ', 
                                CASE WHEN vcsr.apellido1 IS NULL THEN '' ELSE vcsr.apellido1 END, ' ', 
                                CASE WHEN vcsr.apellido2 IS NULL THEN '' ELSE vcsr.apellido2 END) AS cliente, 
                        CONCAT('$', ' ', FORMAT(v.total, 0, 'de_DE')) AS total,
                        dv.venta_id,
                        dv.direccion,
                        dv.region,
                        dv.provincia,
                        dv.comuna,
                        dv.ciudad,
                        dv.casa_num,
                        dv.block_num,
                        dv.referencia,
                        dv.shipping_cod,
                        vwp.buy_order AS orden,
                        dv.fecha_despacho,
                        dv.created_at,
                        dv.updated_at
                    FROM 
                        ventas v 
                        INNER JOIN despachos_ventas dv ON v.id = dv.venta_id 
                        INNER JOIN ventas_webpay vwp ON v.id = vwp.venta_id  
                        LEFT JOIN (
                            SELECT 
                                vc.venta_id, c.rut, c.nombres, c.apellido1, c.apellido2 
                            FROM 
                                clientes c 
                                INNER JOIN ventas_clientes vc ON c.id = vc.cliente_id 
                        ) vc ON v.id = vc.venta_id 
                        LEFT JOIN ventas_clientes_sin_registrar vcsr ON v.id = vcsr.venta_id 
                    WHERE
                        v.deleted_at IS NULL AND  
                        v.fecha_anulacion IS NULL AND 
                        dv.deleted_at IS NULL 
                    ORDER BY fecha_despacho, dv.created_at ASC  
                    LIMIT ${desde}, ${constantes.regPerPage}`
                
        cnn.query(qry, async (err, result) => {
            let resp = null
            if(err){
                reps = callback({mensaje: 'Ocurrió un error al intentar obtener el listado de despachos: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let despachos = await detalleProductos(cnn, result)
                let totRows = await cnn.promise().query(`SELECT count(*) AS totRows FROM ventas v INNER JOIN despachos_ventas dv ON v.id = dv.venta_id WHERE v.deleted_at IS NULL AND  dv.deleted_at IS NULL`)
                reps = callback(null, {data: despachos, totRows: totRows[0][0].totRows, rowsPerPage: constantes.regPerPage, pag})
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


const detalleProductos = async (cnn, despachos) => {
    await despachos.map(async d => {
            
            let qry = `SELECT 
                        p.id,
                        p.nombre,
                        p.descripcion,
                        p.precio_venta_normal,
                        p.stock,
                        p.unidad_id,
                        p.marca_id,
                        p.categoria_id,
                        p.sub_categoria_id,
                        p.created_at,
                        p.updated_at,
                        p.deleted_at 
                    FROM
                        detalle_ventas dv  
                        INNER JOIN productos p ON dv.producto_id = p.id 
                    WHERE 
                        dv.deleted_at IS NULL AND 
                        dv.venta_id = ${d.venta_id}`

            let res = await cnn.promise().query(qry)

            d.productos = res[0]
        })

    return despachos
    
}


DespachosModel.filter = (texto, pag, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let desde = constantes.regPerPage * pag
        let filtro = ` AND (
                        CONCAT(vc.rut, ' ', CASE WHEN vcsr.rut IS NULL THEN '' ELSE vcsr.rut END) LIKE ${cnn.escape('%'+texto+'%')} OR 
                        CONCAT(
                            CASE WHEN vc.nombres IS NULL THEN '' ELSE vc.nombres END, ' ', 
                            CASE WHEN vc.apellido1 IS NULL THEN '' ELSE vc.apellido1 END, ' ', 
                            CASE WHEN vc.apellido2 IS NULL THEN '' ELSE vc.apellido2 END, 
                            CASE WHEN vcsr.nombres IS NULL THEN '' ELSE vcsr.nombres END, ' ', 
                            CASE WHEN vcsr.apellido1 IS NULL THEN '' ELSE vcsr.apellido1 END, ' ', 
                            CASE WHEN vcsr.apellido2 IS NULL THEN '' ELSE vcsr.apellido2 END) LIKE ${cnn.escape('%'+texto+'%')} OR 
                            CONCAT('$', ' ', FORMAT(v.total, 0, 'de_DE')) LIKE ${cnn.escape('%'+texto+'%')} OR 
                            dv.venta_id LIKE ${cnn.escape('%'+texto+'%')} OR 
                            dv.direccion LIKE ${cnn.escape('%'+texto+'%')} OR 
                            dv.region LIKE ${cnn.escape('%'+texto+'%')} OR 
                            dv.provincia LIKE ${cnn.escape('%'+texto+'%')} OR 
                            dv.comuna LIKE ${cnn.escape('%'+texto+'%')} OR 
                            dv.ciudad LIKE ${cnn.escape('%'+texto+'%')} OR 
                            dv.casa_num LIKE ${cnn.escape('%'+texto+'%')} OR 
                            dv.block_num LIKE ${cnn.escape('%'+texto+'%')} OR 
                            dv.referencia LIKE ${cnn.escape('%'+texto+'%')} OR 
                            dv.shipping_cod LIKE ${cnn.escape('%'+texto+'%')} OR 
                            vwp.buy_order LIKE ${cnn.escape('%'+texto+'%')} OR 
                            DATE_FORMAT(dv.created_at, "%d/%m/%Y") LIKE ${cnn.escape('%'+texto+'%')} OR 
                            DATE_FORMAT(dv.updated_at, "%d/%m/%Y") LIKE ${cnn.escape('%'+texto+'%')} OR 
                            DATE_FORMAT(dv.created_at, "%d-%m-%Y") LIKE ${cnn.escape('%'+texto+'%')} OR 
                            DATE_FORMAT(dv.updated_at, "%d-%m-%Y") LIKE ${cnn.escape('%'+texto+'%')}  
                    )`
        let qry = `SELECT 
                        dv.id, 
                        CONCAT(vc.rut, ' ', CASE WHEN vcsr.rut IS NULL THEN '' ELSE vcsr.rut END) AS rut,
                        CONCAT(
                                CASE WHEN vc.nombres IS NULL THEN '' ELSE vc.nombres END, ' ', 
                                CASE WHEN vc.apellido1 IS NULL THEN '' ELSE vc.apellido1 END, ' ', 
                                CASE WHEN vc.apellido2 IS NULL THEN '' ELSE vc.apellido2 END, 
                                CASE WHEN vcsr.nombres IS NULL THEN '' ELSE vcsr.nombres END, ' ', 
                                CASE WHEN vcsr.apellido1 IS NULL THEN '' ELSE vcsr.apellido1 END, ' ', 
                                CASE WHEN vcsr.apellido2 IS NULL THEN '' ELSE vcsr.apellido2 END) AS cliente, 
                        CONCAT('$', ' ', FORMAT(v.total, 0, 'de_DE')) AS total,
                        dv.venta_id,
                        dv.direccion,
                        dv.region,
                        dv.provincia,
                        dv.comuna,
                        dv.ciudad,
                        dv.casa_num,
                        dv.block_num,
                        dv.referencia,
                        dv.shipping_cod,
                        vwp.buy_order AS orden,
                        dv.created_at,
                        dv.updated_at
                    FROM 
                        ventas v 
                        INNER JOIN despachos_ventas dv ON v.id = dv.venta_id 
                        -- INNER JOIN detalle_ventas det ON v.id = det.venta_id 
                        INNER JOIN ventas_webpay vwp ON v.id = vwp.venta_id 
                        LEFT JOIN (
                            SELECT 
                                vc.venta_id, c.rut, c.nombres, c.apellido1, c.apellido2 
                            FROM 
                                clientes c 
                                INNER JOIN ventas_clientes vc ON c.id = vc.cliente_id 
                        ) vc ON v.id = vc.venta_id 
                        LEFT JOIN ventas_clientes_sin_registrar vcsr ON v.id = vcsr.venta_id 
                    WHERE
                        v.deleted_at IS NULL AND  
                        dv.deleted_at IS NULL  
                        ${filtro}
                    ORDER BY fecha_despacho ASC 
                    LIMIT ${desde}, ${constantes.regPerPage}`
        
        cnn.query(qry, async (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar obtener el listado de despachos: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let despachos = await detalleProductos(cnn, res)
                let totRows = await cnn.promise().query(`
                        SELECT count(*) AS totRows 
                        FROM 
                            ventas v 
                            INNER JOIN despachos_ventas dv ON v.id = dv.venta_id 
                            INNER JOIN detalle_ventas det ON v.id = det.venta_id 
                            INNER JOIN ventas_webpay vwp ON v.id = vwp.venta_id 
                            LEFT JOIN (
                                SELECT 
                                    vc.venta_id, c.rut, c.nombres, c.apellido1, c.apellido2 
                                FROM 
                                    clientes c 
                                    INNER JOIN ventas_clientes vc ON c.id = vc.cliente_id 
                            ) vc ON v.id = vc.venta_id 
                            LEFT JOIN ventas_clientes_sin_registrar vcsr ON v.id = vcsr.venta_id
                        WHERE 
                            v.deleted_at IS NULL AND dv.deleted_at IS NULL ${filtro}
                    `)
                resp = callback(null, {data: despachos, totRows: totRows[0][0].totRows, rowsPerPage: constantes.regPerPage, pag})
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


DespachosModel.find = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                    venta_id,
                    direccion,
                    region,
                    provincia,
                    comuna,
                    ciudad,
                    casa_num,
                    block_num,
                    referencia,
                    shipping_cod,
                    fecha_despacho,
                    created_at,
                    updated_at
                FROM 
                    despachos_ventas 
                WHERE 
                    deleted_at IS NULL AND 
                    id = ${cnn.escape(id)}`

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al consultar los datos del despacho: ' + err.message, tipoMensaje: 'danger'})
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


DespachosModel.update = (id, data, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `UPDATE despachos_ventas SET 
                        venta_id = ${cnn.escape(data.venta_id)},
                        direccion = ${cnn.escape(data.direccion)},
                        region = ${cnn.escape(data.region)},
                        provincia = ${cnn.escape(data.provincia)},
                        comuna = ${cnn.escape(data.comuna)},
                        ciudad = ${cnn.escape(data.ciudad)},
                        casa_num = ${cnn.escape(data.casa_num)},
                        block_num = ${cnn.escape(data.block_num)},
                        referencia = ${cnn.escape(data.referencia)},
                        shipping_cod = ${cnn.escape(data.shipping_cod)},
                        updated_at = CURDATE() 
                    WHERE 
                        id = ${cnn.escape(id)}`
        
        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar actualizar el despacho: ' + err.message , tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    resp = callback(null, {mensaje: 'El despacho ha sido actualizado.' , tipoMensaje: 'success'})
                }else{
                    resp = callback({mensaje: 'No fue posible actualizar el despacho: ' , tipoMensaje: 'danger'})
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

DespachosModel.cambioEstado = (id, idEstado, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `UPDATE despachos_ventas SET 
                        fecha_despacho = CURDATE(),
                        updated_at = CURDATE() 
                    WHERE 
                        id = ${cnn.escape(id)}`
        
        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar actualizar el estado del despacho: ' + err.message , tipoMensaje: 'danger'})
            }else{
                if(res.affectedRows > 0){
                    resp = callback(null, {mensaje: 'El estado del despacho ha sido actualizado.' , tipoMensaje: 'success'})
                }else{
                    resp = callback({mensaje: 'No fue posible actualizar el estado del despacho: ' , tipoMensaje: 'danger'})
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

module.exports = DespachosModel
