const connection = require('../../db/connection.js');
const constantes = require('../shared/constants');

let pool = connection.pool()

let tiendaModel = {}


tiendaModel.getData = (callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `
            SELECT 
                nombre_tienda,
                fono_venta,
                email,
                direccion
            FROM 
                tienda
            LIMIT 1
        ` 

        cnn.query(qry, (err, result)=>{
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al buscar los datos de la tienda: '+err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(result[0])
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


tiendaModel.save = async (data, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry =  await insertInfo(cnn) ?  
         `
            INSERT INTO tienda (
                nombre_tienda,
                fono_venta,
                email,
                direccion,
                created_at,
                updated_at
            ) VALUES (
                ${cnn.escape(data.nombre_tienda)},
                ${cnn.escape(data.fono_venta)},
                ${cnn.escape(data.email)},
                ${cnn.escape(data.direccion)},
                CURDATE(),
                CURDATE()
            )
        ` : `
            UPDATE tienda SET 
                nombre_tienda = ${cnn.escape(data.nombre_tienda)},
                fono_venta = ${cnn.escape(data.fono_venta)},
                email = ${cnn.escape(data.email)},
                direccion = ${cnn.escape(data.direccion)},
                updated_at = CURDATE() 
            WHERE 
                id = (SELECT id FROM (SELECT id FROM tienda LIMIT 1) as t)
        `

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar actualizar los datos de la tienda: ' + err.message, tipoMensaje: 'danger'})
            }else{
                resp = callback(null,{mensaje: 'Los datos de la tienda han sido actualizados', tipoMensaje: 'success'})
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


const insertInfo = async (cnn) => {
    let qry = `SELECT COUNT(*) rows_info FROM tienda`
    let res = await cnn.promise().query(qry)
    console.log('insertInfo',)
    return res[0][0].rows_info === 0
}

module.exports = tiendaModel