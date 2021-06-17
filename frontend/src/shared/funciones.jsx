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