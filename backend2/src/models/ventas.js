const connection = require('../../db/connection')

let pool = connection.pool()

VentasModel = {}

VentasModel.registrar = async (data, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        }
        
        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */

        let resp = null
        let errMsg = 'iniciar la transacción'
        try{
            await cnn.promise().beginTransaction();

            errMsg = 'registrar los datos de la venta'
            let ventaRes = await insertarVenta(cnn, data)

            errMsg = 'registrar los datos del cliente'
            
            if(data.cliente_id){    //Sólo llega el ID del cliente debido a que éste ya se encuentra registrado en la tabla clientes
                await registrarIdCliente(cnn, ventaRes.insertId, data.cliente_id)
            }else{  //El cliente no es un cliente registrado en la tabla cliente, por lo cual llegan todos sus datos 
                await registrarCliente(cnn, ventaRes.insertId, data.datos_cliente)
            }

            errMsg = 'registrar los datos de los productos'
            await registrarProductos(cnn, ventaRes.insertId, data.productos, data.datos_webpay.status)

            errMsg = 'registrar los datos del despacho'
            await registrarDespacho(cnn, ventaRes.insertId, data.despacho)

            errMsg = 'registrar los datos del pago con WebPay'
            await registrarDatosWebPay(cnn, ventaRes.insertId ,data.datos_webpay)

            errMsg = 'finalizar la transacción'
            await cnn.promise().commit()

            return callback(null, {mensaje: data.datos_webpay.status !== 'FAILED' ? `Tu compra ha finalizado exitosamente.` : 'La transacción no pudo llevarse a cabo o fue rechazada', tipoMensaje: data.datos_webpay.status !== 'FAILED' ? 'success' : 'danger'})

        }catch(error){
            await cnn.promise().rollback()

            resp = callback({mensaje: `Ocurrió un error al ${errMsg}: ` + error.message, tipoMensaje: 'danger'})
        }
        cnn.release()
        return resp
    })
}

const insertarVenta = (cnn, data) => {
    let qry = `INSERT INTO ventas (
        fecha_venta_tienda, 
        total, 
        created_at, 
        updated_at
    ) VALUES (
        CURDATE(), 
        ${data.total}, 
        CURDATE(), 
        CURDATE())`
    
    return new Promise((resolve, reject)=> {
        cnn.query(qry, (err, res) => {
            if(err){
                throw err
                //return reject(err);
            }else{
                return resolve(res);
            }
        });
    });
}

const registrarIdCliente = async (cnn, venta_id, cliente_id) => {
    await cnn.promise().query(
        `INSERT INTO ventas_clientes (
            venta_id,
            cliente_id,
            created_at,
            updated_at
        ) VALUES (
            ${venta_id},
            ${cnn.escape(cliente_id)},
            CURDATE(),
            CURDATE()
        )`)
}

const registrarCliente = async (cnn, venta_id, data) => {
    await cnn.promise().query(`INSERT INTO ventas_clientes_sin_registrar (
                                venta_id,
                                rut,
                                nombres,
                                apellido1,
                                apellido2,
                                fono,
                                email,
                                created_at,
                                updated_at
                            ) VALUES (
                                ${cnn.escape(venta_id)},
                                ${cnn.escape(data.rut)},
                                ${cnn.escape(data.nombres)},
                                ${cnn.escape(data.apellido1)},
                                ${cnn.escape(data.apellido2)},
                                ${cnn.escape(data.fono)},
                                ${cnn.escape(data.email)},
                                CURDATE(),
                                CURDATE()
                            )`)
}

const registrarProductos = async (cnn, venta_id, data, status) => {
    await data.map(async e => {

        await cnn.promise().query(`INSERT INTO detalle_ventas (
                                    venta_id,
                                    producto_id,
                                    precio_neto,
                                    impuesto,
                                    JSON_impuestos,
                                    precio_venta,
                                    cantidad,
                                    talla,
                                    total_producto,
                                    created_at,
                                    updated_at
                                ) VALUES (
                                    ${venta_id},
                                    ${cnn.escape(e.producto_id)},
                                    ${cnn.escape(e.precio)},
                                    ${cnn.escape(e.impuestos)},
                                    ${cnn.escape(e.JSON_impuestos)}, 
                                    ${cnn.escape(parseInt(e.precio_venta.substring(1).split('.').join('')))},
                                    ${cnn.escape(e.cantidad)},
                                    ${cnn.escape(e.talla)},
                                    ${cnn.escape(parseInt(e.precio_venta.substring(1).split('.').join('')) * e.cantidad)},
                                    CURDATE(),
                                    CURDATE()
                                )`)

                                
        if(status !== 'FAILED'){
            await descontarStock(cnn, e.producto_id, e.cantidad)
        }
    })
}

const registrarDespacho = async (cnn, venta_id, data) => {    
    await cnn.promise().query(`INSERT INTO despachos_ventas (
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
                                    created_at,
                                    updated_at
                                ) VALUES (
                                    ${venta_id},
                                    ${cnn.escape(data.direccion)},
                                    ${cnn.escape(data.cod_region)},
                                    ${cnn.escape(data.cod_provincia)},
                                    ${cnn.escape(data.cod_comuna)},
                                    ${cnn.escape(data.ciudad)},
                                    ${cnn.escape(data.casa_num)},
                                    ${cnn.escape(data.block_num)},
                                    ${cnn.escape(data.referencia)},
                                    ${cnn.escape(data.shipping_cod)},
                                    CURDATE(),
                                    CURDATE()
                                )`)
}

const registrarDatosWebPay = async (cnn, venta_id, data) => {
    await cnn.promise().query(`INSERT INTO ventas_webpay (
                                    venta_id,
                                    vci,
                                    amount,
                                    buy_order,
                                    status,
                                    session_id,
                                    card_number,
                                    card_detail,
                                    accounting_date,
                                    transaction_date,
                                    authorization_code,
                                    payment_type_code,
                                    response_code,
                                    installments_number,
                                    created_at,
                                    updated_at
                                ) VALUES (
                                    ${venta_id},
                                    ${cnn.escape(data.vci)},
                                    ${cnn.escape(data.amount)},
                                    ${cnn.escape(data.buy_order)},
                                    ${cnn.escape(data.status)},
                                    ${cnn.escape(data.session_id)},
                                    ${cnn.escape(data.card_detail?.card_number)},
                                    ${cnn.escape(data.card_detail)},
                                    ${cnn.escape(data.accounting_date)},
                                    ${cnn.escape(data.transaction_date)},
                                    ${cnn.escape(data.authorization_code)},
                                    ${cnn.escape(data.payment_type_code)},
                                    ${cnn.escape(data.response_code)},
                                    ${cnn.escape(data.installments_number)},
                                    CURDATE(),
                                    CURDATE()
                                )`)
}

const descontarStock = async (cnn, id, cantidad) => {
    let qry = `UPDATE productos SET stock = stock -${cnn.escape(cantidad)} WHERE id = ${cnn.escape(id)}`
    cnn.query(qry, (err, res) => {
        if(err){
            throw err
        }else{
            return true
        }
    })
}


VentasModel.anularVenta = (id, callback) => {
    pool.getConnection((err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `UPDATE ventas SET fecha_anulacion = CURDATE() WHERE id = ${cnn.escape(id)}`

        cnn.query(qry, (err, result)=>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ha ocurrido un error al intentar anular la venta: ' + err.message, tipoMensaje: 'danger'})
            }else{
                if(result.affectedRows > 0){
                    resp = callback(null,{mensaje: 'La venta ha sido anulada.', tipoMensaje: 'success'})
                }else{
                    resp = callback({mensaje: 'La venta no fue encontrada o no pudo se anulada.', tipoMensaje: 'danger'})
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

module.exports = VentasModel