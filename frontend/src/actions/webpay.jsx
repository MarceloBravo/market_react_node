import axios from  'axios'
import { getHeader, handlerError } from '../shared/funciones'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { types as webPayTypes } from '../redux/WebPay/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as alertasTypes } from '../redux/Alert/types'
const url = 'webpay_plus'

//Crear una transacción para la obtención del token y la URL de pago
export const initTransaction = (data) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}/transaccion`, data, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: webPayTypes.WEBPAY_INICIAR_TRANSACCION, payload: res.data.resp})
        }).catch(error =>{
            handlerError(dispatch, error, 'Ocurrió un error al intentar iniciar la transacción: ' + error.message)
        })
    }
}


//Redireccionar a la página de WebPay
export const navigateToWebpay = (token, url) => {
    return (dispatch, action) => {
        axios.post(url, {token_ws: token},{headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(res => {
            console.log('navigateToWebpay',res)
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al intentar efectuar el pago: ' + error.message)
        })
    }
}

//Confirmar o concretar la transacción
export const confirmTransaction = (token) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}/confirm`, {token},{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: webPayTypes.WEBPAY_CONCRETAR_PAGO, payload: res.data.data})
            dispatch({type: alertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el estado de la transacción: ' + error.message)
        })
    }
}

//Obtener el estado de la transacción (Inicializada, autorizada, etc) desde WebPay
export const statusTransaction = (token) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}/status`, {token},{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: webPayTypes.WEBPAY_STATUS, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el estado de la transacción: ' + error.message)
        })
    }
}