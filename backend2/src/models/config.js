const connection = require('../../db/connection');

let pool = connection.pool()

let configModel = {};

configModel.getData = (callback) => {
    pool.getConnection(async (err, cnn) => {
        let resp = null
        if (err) {
            resp = callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `SELECT nombre_app FROM configuracion`;

        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al solicitar los datos de la aplicación: ' + err.message, tipoMensaje: 'danger', id:-1});
            }else{
                resp = callback(null, result[0]);
            }
            cnn.release()
            return resp;
        });

        /*
        cnn.on('error', function(err) {      
            console.log('xxxxxxxxxx',err,'xxxxxxxxxxxx')
            return callback({mensaje: 'Ocurrió un error en la conexión.', tipoMensage: 'danger', id:-1})
        })
        */
    })
}

configModel.save = (data, callback) => {
    pool.getConnection(async (err, cnn) => {
        if (err) {
            return callback({mensaje: 'Conexión inactiva.', tipoMensage: 'danger', id:-1})
        } 

        let qry = `UPDATE configuracion SET nombre_app = ${cnn.escape(data.nombre_app)} WHERE id = (SELECT id FROM (SELECT id FROM configuracion LIMIT 1) as t)`;
        
        cnn.query(qry, (err, result) => {
            let resp = null
            if(err){
                resp = callback({mensaje: 'Ocurrió un error al intentar actualizar los datos de la aplicación: '+err.message, tipoMensaje: 'danger', id:-1});
            }else{
                resp = callback(null, {mensaje: 'Los datos han sido actualizados.', tipoMensaje: 'success', id: 0});
            }
            cnn.release()
            return resp;
        });

        /*
        cnn.on('error', function(err) {      
            return callback({mensaje: 'Ocurrió un error en la conexión.'+err.message, tipoMensage: 'danger', id:-1})
        })
        */
    })
}

module.exports = configModel;



