import axios from 'axios'
import { types } from '../redux/Roles/types'
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { serverEndPoint } from '../shared/constantes'
import { getHeader } from '../shared/funciones'
const endPoint = serverEndPoint+'/roles'


export const buscar = (id) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.BUSCAR_ROL, payload: res})
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: 'Error al buscar el rol: ' + error.message, tipo: 'danger'}})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}

export const insertar = (rol) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}`, rol, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.INSERTAR_ROL, payload: {data: rol}})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload:{mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            console.log(error);
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload:{mensaje: 'Error al ingresar el rol: ' + error.message, tipo: 'danger'}})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}

export const actualizar = (id, rol) => {
    return (dispatch, action) => {
        axios.put(`${endPoint}/${id}`, rol, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.ACTUALIZAR_ROL, payload: {data: rol}})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload:{mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            console.log(error);
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload:{mensaje: 'Error al actualizar el rol: ' + error.message, tipo: 'danger'}})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}

export const eliminar = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.ELIMINAR_ROL})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload:{mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            console.log(error);
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload:{mensaje: 'Error al eliminar el rol: ' + error.message, tipo: 'danger'}})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}

export const listar = () => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/get/all`, {headers: getHeader()}).then(res => {
            dispatch({type: types.GET_ALL_ROLES, payload: res})
        }).catch(error => {
            console.log(error);
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload:{mensaje: 'Error al listar los roles: ' + error.message, tipo: 'danger'}})
        })
    }
}