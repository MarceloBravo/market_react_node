import { types } from '../redux/Impuestos/types'
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
//import { types as loginTypes } from '../redux/Login/types'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { getHeader, handlerError } from '../shared/funciones'
import axios from 'axios'
const url = 'impuestos'

export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/pag/${pag}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.LISTAR_IMPUESTOS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al listar los impuestos: ')
        })
    }
}


export const filtrar = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/filtrar/${texto}/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.FILTRAR_IMPUESTOS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al filtrar los impuestos: ')
        })
    }
}


export const find = (id) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/${id}`, {headers: getHeader()}).then(data => {
            console.log('success',data)
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.BUSCAR_IMPUESTOS, payload: data})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al buscar el impuesto: ')
        })
    }
}


export const insert = (data) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}`, data, {headers: getHeader()}).then(res => {
            console.log('success',res)
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.INSERTAR_IMPUESTOS, payload: data})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al insertar el impuesto: ')
        })
    }
}


export const update = (id, data) => {
    return (dispatch, action) => {
        axios.put(`${endPoint}/${url}/${id}`, data, {headers: getHeader()}).then(res => {
            console.log('success',res)
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.ACTUALIZAR_IMPUESTOS, payload: data})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al actualizar el impuesto: ')
        })
    }
}


export const deleteReg = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint}/${url}/${id}`, {headers: getHeader()}).then(res => {
            console.log('success',res)
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.ELIMINAR_IMPUESTOS})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al eliminar el impuesto: ')
        })
    }
}

/*
const handlerError = (dispatch, error, msg) => {
    dispatch({type: spinnerTypes.HIDE_SPINNER})
    if(error.response?.data === 'Token no válido'){
        dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: 'Tu sessión ha finalizado. Ingresa nuevamenten a la aplicación.', tipo: 'danger'}})
        dispatch({type: loginTypes.LOGOUT})
    }else{                
        console.log(msg, error)
        dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
    }
}
*/