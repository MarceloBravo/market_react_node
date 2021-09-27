import axios from 'axios'
import { types } from '../redux/Login/types'
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { serverEndPoint as endPoint } from '../shared/constantes'


const header = { 'Content-Type': 'application/json' }

export const login = (credenciales) => {
    return (dispatch, getAction) => {
        axios.post(`${endPoint}/login`, JSON.stringify(credenciales), { headers: header}).then(res => {
            dispatch({type: types.IDENTIFICAR_USUARIO, payload: res.data})
            dispatch({type: alertTypes.OCULTAR_ALERTA})
        }).catch(error => {
            const mensaje = error.response.status === 403 ?  'Usuario y/o contraseña no válidos' : error.response.statusText;
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: mensaje, tipo: 'danger' }})
        })
    }
}

export const logout = (token) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/logout`, {token}, {headers: header}).then(res => {
            dispatch({type: types.LOGOUT})
        }).catch(error => {
            const mensaje = 'Ocurrió un error al intentar salir de la aplicación: ' + error.message;
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: mensaje, tipo: 'danger' }})
        })
    }
}

export const refreshToken = (token) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/refresh_token`, {refresh: token}, {headers: header}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.REFRESH_TOKEN, payload: res.data})
        }).catch(error => {
            dispatch({type: types.LOGOUT})
            const mensaje = 'Ocurrió un error al intentar extender la duración sesión. Vuelve a identificarte.';
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: mensaje, tipo: 'danger' }})
        })
    }
}