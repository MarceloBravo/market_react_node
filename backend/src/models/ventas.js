const connection = require('../../db/connection')

let cnn = connection.conect()

VentasModel = {}

VentasModel.registrar = async (data, callback) => {
    if(cnn){
        let errMsg = 'iniciar la transacción'
        try{
            await cnn.promise().beginTransaction();

            errMsg = 'registrar los datos de la venta'
            let ventaRes = await insertarVenta(data)

            errMsg = 'registrar los datos del cliente'
            
            if(data.cliente_id){    //Sólo llega el ID del cliente debido a que éste ya se encuentra registrado en la tabla clientes
                await registrarIdCliente(ventaRes.insertId, data.cliente_id)
            }else{  //El cliente no es un cliente registrado en la tabla cliente, por lo cual llegan todos sus datos 
                console.log('registrarCliente', data.datos_cliente)
                await registrarCliente(ventaRes.insertId, data.datos_cliente)
            }

            errMsg = 'registrar los datos de los productos'
            await registrarProductos(ventaRes.insertId, data.productos)

            errMsg = 'registrar los datos del despacho'
            await registrarDespacho(ventaRes.insertId, data.despacho)

            errMsg = 'registrar los datos del pago con WebPay'
            await registrarDatosWebPay(ventaRes.insertId ,data.datos_webpay)

            errMsg = 'finalizar la transacción'
            await cnn.promise().commit()

            return callback(null, {mensaje: `Tu compra ha finalizado exitosamente.`, tipoMensaje: 'success'})

        }catch(error){
            await cnn.promise().rollback()
            return callback({mensaje: `Ocurrió un error al ${errMsg}: ` + error.message, tipoMensaje: 'danger'})
        }
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    }
}


const insertarVenta = (data) => {
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


const registrarIdCliente = async (venta_id, cliente_id) => {
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


const registrarCliente = async (venta_id, data) => {
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


const registrarProductos = async (venta_id, data) => {
    await data.map(async e => {

    await cnn.promise().query(`INSERT INTO detalle_ventas (
                                    venta_id,
                                    producto_id,
                                    precio_neto,
                                    impuesto,
                                    JSON_impuestos,
                                    precio_venta,
                                    cantidad,
                                    total_producto,
                                    created_at,
                                    updated_at
                                ) VALUES (
                                    ${venta_id},
                                    ${cnn.escape(e.producto_id)},
                                    ${cnn.escape(e.precio)},
                                    ${cnn.escape(e.impuestos)},
                                    ${cnn.escape(e.JSON_impuestos)}, 
                                    ${cnn.escape(e.precio_venta.substring(1)*1)},
                                    ${cnn.escape(e.cantidad)},
                                    ${cnn.escape(e.precio_venta.substring(1) * e.cantidad)},
                                    CURDATE(),
                                    CURDATE()
                                )`)
    })
}

const registrarDespacho = async (venta_id, data) => {
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
                                    CURDATE(),
                                    CURDATE()
                                )`)
}


const registrarDatosWebPay = async (venta_id, data) => {
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