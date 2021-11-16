//yarn add transbank-sdk 
//Instalación https://www.npmjs.com/package/transbank-sdk
//Integración https://www.transbankdevelopers.cl/referencia/webpay?l=javascript#crear-una-transaccion
const WebpayPlus = require('transbank-sdk').WebpayPlus;
const connection = require('../../db/connection.js')
 
//let cnn = connection.conect()

let webpayModel = {}

webpayModel.initTransaction = async (data, callback) => {
    //if(cnn){
        try{
            const respTransact = await WebpayPlus.Transaction.create(data.buy_order, data.session_id, data.amount, data.return_url);

            return callback(null, {resp: respTransact})
        }catch(error){
            return callback({mensaje: `Ocurrió un error al efectuar el pago: ${error.message}`, tipoMensaje:'danger'})
        }

    //}else{
    //    return callback({mensaje: 'Conexión inactiva.', tipoMensaje: 'danger'})
    //}
}

//La página de WebPay retorna a ésta función
webpayModel.success = async (data, callback) => {
    try{
        return callback(null, {mensaje: 'La venta ha sido concretada exitosamente.', tipoMensaje: 'success', resp: data})
    }catch(error){
        return callback({mensaje: `Ocurrió un error al efectuar el pago: ${error.message}`, tipoMensaje:'danger'})
    }
}


webpayModel.comfirm = async (data, callback) => {
    try{
        const response = await WebpayPlus.Transaction.commit(data.token);
        return callback(null, {mensaje: 'La transacción a sido finalizada exitosamente.', tipoMensaje: 'success', data: response})
    }catch(error){
        return callback({mensaje: 'Ocurrió un error al finalizar la transacción: '+error.message, tipoMensaje: 'danger'})
    }
}


webpayModel.status = async (data, callback) => {
    try{
        const response = await WebpayPlus.Transaction.status(data.token);
        return callback(null, response)
    }catch(error){
        return callback({mensaje: 'Ocurrió un error al consultar el estado de la transacción: '+error.message, tipoMensaje: 'danger'})
    }
}

module.exports = webpayModel
