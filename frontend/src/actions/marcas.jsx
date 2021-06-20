import axios from 'axios'
import { types as marcasTypes } from '../redux/Marcas/types'
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { getHeader, handlerError } from '../shared/funciones'
const url = 'marcas'

export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/pag/${pag}`, {headers: getHeader()}).then(res => {  
            dispatch({type: spinnerTypes.HIDE_SPINNER})  
            dispatch({type: marcasTypes.LISTAR_MARCAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de marcas: '+error.message)
        })
    }
}

export const filter = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/filtrar/${texto}/${pag}`, {headers: getHeader()}).then(res => {  
            dispatch({type: spinnerTypes.HIDE_SPINNER})  
            dispatch({type: marcasTypes.FILTRAR_MARCAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al filtrar el listado de marcas: '+error.message)
        })
    }
} 

export const getAll = () => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/get/all`, {headers: getHeader()}).then(res => {  
            dispatch({type: spinnerTypes.HIDE_SPINNER})  
            dispatch({type: marcasTypes.GET_ALL_MARCAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de todas las marcas: '+error.message)
        })
    }
}

export const find = (id) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/${id}`, {headers: getHeader()}).then(res => {  
            dispatch({type: spinnerTypes.HIDE_SPINNER})  
            dispatch({type: marcasTypes.BUSCAR_MARCA, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al buscar la marca: '+error.message)
        })
    }
} 

export const insert = (data) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}`, data, {headers: getHeader()}).then(res => {  
            dispatch({type: spinnerTypes.HIDE_SPINNER})  
            dispatch({type: marcasTypes.INSERTAR_MARCA, payload: data})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de marcas: '+error.message)
        })
    }
}

export const update = (id, data) => {
    return (dispatch, action) => {
        axios.put(`${endPoint}/${url}/${id}`, data, {headers: getHeader()}).then(res => {  
            dispatch({type: spinnerTypes.HIDE_SPINNER})  
            dispatch({type: marcasTypes.ACTUALIZAR_MARCA, payload: data})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de marcas: '+error.message)
        })
    }
}

export const deleteReg = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint}/${url}/${id}`, {headers: getHeader()}).then(res => {  
            dispatch({type: spinnerTypes.HIDE_SPINNER})  
            dispatch({type: marcasTypes.ELIMINAR_MARCA})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de marcas: '+error.message)
        })
    }
}