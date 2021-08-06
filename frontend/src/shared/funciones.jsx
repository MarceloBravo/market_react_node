import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as loginTypes } from '../redux/Login/types'


export const getHeader = () => {
    let token = localStorage.getItem('gimAppMabc')
    return {'Content-Type':'application/json', 'Authorization':`Bearer ${token}`}
}

export const handlerError = (dispatch, error, msg) => {
    dispatch({type: spinnerTypes.HIDE_SPINNER})
    if(error.response?.data === 'Token no válido'){
        dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: 'Tu sessión ha finalizado. Ingresa nuevamenten a la aplicación.', tipo: 'danger'}})
        dispatch({type: loginTypes.LOGOUT})
    }else{                
        console.log(msg, error)
        dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
    }
}

export const getHeaderFormData = () => {
    let token = localStorage.getItem('gimAppMabc')
    return {'Content-Type':'multipart/form-data', 'Authorization':`Bearer ${token}`}
}

export const isEmail = (val) => {
    // eslint-disable-next-line
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(val)
}

export const formatearPrecio = (neto, impuestos) => {
    let precio = parseInt(neto + (neto * impuestos / 100)).toLocaleString('de-DE', { style: 'currency', currency: 'CLP' } )
    return precio
 }