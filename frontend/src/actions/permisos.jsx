import { types } from '../redux/Permisos/types'
import { types as AlertasTypes } from '../redux/Alert/types'
import { serverEndPoint } from '../shared/constantes'
import { getHeader } from '../shared/funciones'
import axios from 'axios'
const endPoint = serverEndPoint+'/permisos'


//Obtiene los permisos asociados al rol recibido
export const leerPermisos = (idRol) => {
    return (dispatch, action)=>{
        axios.get(`${endPoint}/rol/${idRol}`,{ headers: getHeader()}).then(res => {
            dispatch({type: types.LEER_PERMISOS, payload: res})
        }).catch(error =>{
            console.log(error)
            dispatch({type: AlertasTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipoMensaje: 'danger'}})
        })
    }
}


//Ingresa, actualiza y elimina permisos
export const grabarPermisos = (idRol, permisos) => {
    return (dispatch, action)=>{
        axios.post(`${endPoint}/${idRol}`, JSON.stringify(permisos), { headers: getHeader()}).then(res => {
            dispatch({type: types.LEER_PERMISOS, payload: res})
            dispatch({type: AlertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error =>{
            console.log(error)
            if(error.response?.data === 'Token no válido'){
                dispatch({type: AlertasTypes.MOSTRAR_ALERTA, payload: {mensaje: "Token no válido o expirado.", tipo: 'danger'}})
            }else{
                dispatch({type: AlertasTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger'}})
            }
            
        })
    }
}

export const aplicarPermisos = (arrRoles, url) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/pantalla/${url}`,JSON.stringify(arrRoles),{headers: getHeader()}).then(res => {
            console.log(res.data[0])
            dispatch({type: types.APLICAR_PERMISOS, payload: res.data[0]})
        }).catch(error => {
            console.log(error);
            dispatch({type: AlertasTypes.MOSTRAR_ALERTA, payload:{mensaje: error.message, tipo: 'danger'}})
        })
    }
}