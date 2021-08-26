const connection = require('../../db/connection')
const constantes = require('../shared/constants')

let cnn = connection.conect();

let OrdenesCompraModel = {}

OrdenesCompraModel.findByOrderNum = (orderNumber, callback) => {
    if(cnn){
        let qry = `SELECT 
                dv.id, 
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
                ce.nombre AS compania_envio, 
                dv.fecha_despacho,
                v.total, 
                CONCAT('$', ' ', FORMAT(v.total, 0, 'de_DE')) as str_total, 
                dv.created_at,
                dv.updated_at
            FROM 
                despachos_ventas dv 
                INNER JOIN ventas_webpay vwp ON dv.venta_id = vwp.venta_id 
                INNER JOIN companias_envios ce ON dv.shipping_cod = ce.id 
                INNER JOIN ventas v ON dv.venta_id = v.id 
            WHERE
                dv.deleted_at IS NULL AND 
                vwp.buy_order = ${cnn.escape(orderNumber)}`
                
        cnn.query(qry, async (err, res) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al obtener el detalle de la orden de compra: ' + err.message, tipoMensaje: 'danger'})
            }else{
                let prod = await cnn.promise().query(
                    `SELECT 

                        p.nombre,
                        detv.cantidad, 
                        detv.total_producto,
                        CONCAT('$', ' ', FORMAT(detv.total_producto, 0, 'de_DE')) AS str_total_producto,
                        detv.venta_id,
                        p.descripcion 
                    FROM 
                        ventas_webpay vwp 
                        INNER JOIN detalle_ventas detv ON vwp.venta_id = detv.venta_id
                        INNER JOIN productos p ON detv.producto_id = p.id 
                    WHERE
                        vwp.deleted_at IS NULL AND 
                        detv.deleted_at IS NULL AND 
                        p.deleted_at IS NULL AND 
                        vwp.buy_order = ${cnn.escape(orderNumber)}`
                )
                if(res.length > 0){ 
                    res[0].productos = prod[0]
                }
                return callback(null, res[0])
            }
        }) 

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}

module.exports = OrdenesCompraModel