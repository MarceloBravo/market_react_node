export const types = {
    WEBPAY_CONSULTAR_STATUS: 'WEBPAY_CONSULTAR_STATUS', //Obtener el estado de la transacción (Inicializada, autorizada, etc) desde WebPay
    WEBPAY_OBTENER_STATUS: 'WEBPAY_OBTENER_STATUS',
    WEBPAY_INICIAR_TRANSACCION: 'INICIAR_TRANSACCION',  //Crear una transacción para la obtención del token y la URL de pago
    WEBPAY_PAGAR: 'WEBPAY_PAGAR',                       //Redireccionar a la página de WebPay
    WEBPAY_CONCRETAR_PAGO: 'WEBPAY_CONCRETAR_PAGO',     //Confirmar o concretar la transacción
}