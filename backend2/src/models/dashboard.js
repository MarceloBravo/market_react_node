const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let pool = connection.pool()

let DashboardModel = {}

DashboardModel.totalVentasMes = (callback)  => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                        SUM(total) total_diario,
                        CONCAT('$ ',FORMAT(SUM(total), 0, 'de_DE')) str_total_diario, 
                        COUNT(total) ventas, 
                        DATE_FORMAT(fecha_venta_tienda, '%d-%m-%Y') fecha_venta 
                    FROM ventas 
                    WHERE 
                        deleted_at IS NULL AND 
                        fecha_venta_tienda BETWEEN DATE_ADD(CURDATE(), interval -30 day) AND CURDATE() 
                    GROUP BY DATE(fecha_venta_tienda)`

        cnn.query(qry, (err, data) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener las ventas del mes: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, data)
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


DashboardModel.totalVentasTrimestre = (callback)  => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                        SUM(total) total_trimestre,
                        CONCAT('$ ',FORMAT(SUM(total), 0, 'de_DE')) str_total_diario, 
                        COUNT(total) cantidad, 
                        CASE 
                                WHEN MONTH(fecha_venta_tienda) BETWEEN 1 AND 4 THEN 1
                                WHEN MONTH(fecha_venta_tienda) BETWEEN 5 AND 8 THEN 2
                                WHEN MONTH(fecha_venta_tienda) BETWEEN 9 AND 12 THEN 3
                        END trimestre
                    FROM ventas 
                    WHERE 
                        deleted_at IS NULL AND 
                        fecha_venta_tienda BETWEEN DATE_ADD(CURDATE(), interval -1 year) AND CURDATE() 
                    GROUP BY trimestre
                    `

        cnn.query(qry, (err, data) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener las ventas del semestre: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, data)
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

DashboardModel.totalVentasAnio = (callback)  => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                    SUM(total) total,
                    CONCAT('$ ',FORMAT(SUM(total), 0, 'de_DE')) str_total, 
                    COUNT(total) ventas, 
                    MONTH(fecha_venta_tienda) mes
                FROM ventas 
                WHERE 
                    deleted_at IS NULL AND 
                    fecha_venta_tienda BETWEEN DATE_ADD(CURDATE(), interval -1 year) AND CURDATE() 
                GROUP BY MONTH(fecha_venta_tienda)`

        cnn.query(qry, (err, data) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener las ventas del año: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, data)
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

DashboardModel.masVendidos = (callback)  => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                        COUNT(producto_id) cantidad, 
                        p.nombre,
                        p.stock 
                    FROM detalle_ventas dv 
                    INNER JOIN productos p ON dv.producto_id = p.id 
                    WHERE dv.deleted_at IS NULL
                    GROUP BY producto_id, p.nombre, p.stock 
                    ORDER BY cantidad DESC  
                    LIMIT 1, 10 
                    `

        cnn.query(qry, (err, data) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener los productos más vendidos: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, data)
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


DashboardModel.menosVendidos = (callback)  => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                        COUNT(producto_id) cantidad, 
                        p.nombre, 
                        p.stock 
                    FROM detalle_ventas dv 
                    INNER JOIN productos p ON dv.producto_id = p.id 
                    WHERE dv.deleted_at IS NULL
                    GROUP BY producto_id, p.nombre, p.stock 
                    ORDER BY cantidad ASC 
                    LIMIT 1, 10 
                    `

        cnn.query(qry, (err, data) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al obtener los meenos vendidos: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, data)
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

DashboardModel.totalPedidosDespachos = (callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                    COUNT(v.id) ventas,
                    COUNT(d.fecha_despacho) despachos
                FROM 
                    ventas v 
                    INNER JOIN despachos_ventas d ON v.id = d.venta_id 
                WHERE
                    v.deleted_at IS NULL AND 
                    d.deleted_at IS NULL AND 
                    v.fecha_anulacion IS NULL AND 
                    fecha_venta_tienda BETWEEN DATE_ADD(CURDATE(),INTERVAL -6 MONTH) AND CURDATE()   `

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = ({mensaje: 'Ocurrió un error al obtetener los pedidos y las ventas: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, res[0])
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

DashboardModel.ventasDespachosUltimoAnio = (callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT 
                    DATE_FORMAT(fecha_venta_tienda, '%d-%m-%Y') fecha_venta,
                    SUM(total) total,
                    COUNT(producto_id) productos,
                    DATE_FORMAT(fecha_despacho, '%d-%m-%Y') fecha_despacho,
                    COUNT(fecha_despacho) despachos 	
                FROM 
                    ventas v 
                    INNER JOIN detalle_ventas d ON v.id = d.venta_id 
                    INNER JOIN despachos_ventas dv ON v.id = dv.venta_id 
                WHERE
                    v.deleted_at IS NULL AND 
                    d.deleted_at IS NULL AND 
                    v.fecha_anulacion IS NULL AND 
                    fecha_venta_tienda BETWEEN DATE_ADD(CURDATE(),INTERVAL -2 MONTH) AND CURDATE()  
                GROUP BY fecha_venta_tienda, fecha_despacho 
                ORDER BY fecha_venta_tienda ASC `

        cnn.query(qry, (err, res) => {
            let resp = null
            if(err){
                resp = ({mensaje: 'Ocurrió un error al obtetener los pedidos y las ventas: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null, res)
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

module.exports = DashboardModel