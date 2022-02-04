import axios from 'axios'
import { types as ciudadesTypes } from '../redux/Ciudades/types'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as alertTypes } from '../redux/Alert/types'
import { getHeader, handlerError } from '../shared/funciones'
const url = '/ciudades'

export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint + url}/${pag}`,{headers: getHeader()} ).then(res => {
            dispatch({type: ciudadesTypes.LISTAR_CIUDADES, payload: res})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        }).catch( error => {
            handlerError(dispatch, error, 'Ocurrio un error al listar las ciudades:')
        })
    }
}


export const getAll = () => {
    return (dispatch, action) => {
        axios.get(endPoint + url, {headers: getHeader()}).then(res =>{
            dispatch({type: ciudadesTypes.TRAER_TODAS_CIUDADES, payload: res})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrio un error al obtener el listado de todas las ciudades: ')
        })
    }
}

export const getAllByComuna = (cod_comuna) => {
    return (dispatch, action) =>{
        axios.get(`${endPoint + url}/${cod_comuna}`, {headers: getHeader()}).then(res =>{
            dispatch({type: ciudadesTypes.TRAER_TODAS_POR_COMUNA_CIUDADES, payload: res})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        }).catch(error =>{
            handlerError(dispatch, error, 'Ocurrio un error al listar las ciudades de la comuna seleccionada: ')
        })
    }
}

export const filter = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint + url}/${texto}/${pag}`, {headers: getHeader()}).then(res => {
            dispatch({type: ciudadesTypes.FILTRAR_CIUDADES, payload: res})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrio un error al intentar filtrar las ciudades: ')
        })
    }
}

export const insert = (data) => {
    return (dispatch, action) => {
        axios.post(endPoint + url, data, {headers: getHeader()}).then(res => {
            dispatch({type: ciudadesTypes.INSERTAR_CIUDADES, payload: data})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipoMensaje: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrio un erro al intentar ingresar la nueva ciudad: ')
        })
    }
}

export const update = (id, data) => {
    return (dispatch, action) => {
        axios.put(`${endPoint + url}/${id}`, data, {headers: getHeader()}).then(res => {
            dispatch({type: ciudadesTypes.ACTUALIZAR_CIUDADES, payload: data})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload:{mensaje: res.data.mensaje, tipoMensaje: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrio un error al intentar actualizar la ciudad: ')
        })
    }
}

export const deleteReg = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint + url}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: ciudadesTypes.ELIMINAR_CIUDADES})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mnsaje, tipoMensaje: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrio un error al intentar eliminar la ciudad: ')
        })
    }
}
