const connection = require('../../db/connection');

let cnn = connection.conect();

let configModel = {};

configModel.getData = (callback) => {
    if(cnn){
        let qry = `SELECT nombre_app FROM configuracion`;

        cnn.query(qry, (err, result) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al solicitar los datos de la aplicación: ' + err.message, tipoMensaje: 'danger', id:-1});
            }else{
                return callback(null, result[0]);
            }
        });
    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1})
    }
}

configModel.save = (data, callback) => {
    if(cnn){
        let qry = `UPDATE configuracion SET nombre_app = ${cnn.escape(data.nombre_app)} WHERE id = (SELECT id FROM (SELECT id FROM configuracion LIMIT 1) as t)`;
        console.log(qry)
        cnn.query(qry, (err, result) => {
            if(err){
                return callback({mensaje: 'Ocurrió un error al intentar actualizar los datos de la aplicación: '+err.message, tipoMensaje: 'danger', id:-1});
            }else{
                return callback(null, {mensaje: 'Los datos han sido actualizados.', tipoMensaje: 'success', id: 0});
            }
        });

    }else{
        return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger', id:-1})
    }
}

module.exports = configModel;



