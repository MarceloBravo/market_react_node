import { types } from '../redux/Impuestos/types'
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { getHeader } from '../shared/funciones'
import axios from 'axios'
const url = 'impuestos'

export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/pag/${pag}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.LISTAR_IMPUESTOS, payload: res.data})
        }).catch(error => {
            console.log('Error al listar los impuestos: ', error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}


export const filtrar = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/filtrar/${texto}/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.FILTRAR_IMPUESTOS, payload: res.data})
        }).catch(error => {
            console.log('Error al filtrar los impuestos: ', error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
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
            console.log('Error al listar los impuestos: ', error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
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
            console.log('Error al insertar los impuestos: ', error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
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
            console.log('Error al actualizar los impuestos: ', error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
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
            console.log('Error al eliminar el impuesto: ', error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}
