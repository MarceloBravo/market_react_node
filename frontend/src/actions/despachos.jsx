import axios from 'axios'
import { serverEndPoint } from '../shared/constantes'
import { getHeader, handlerError } from '../shared/funciones'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as despachosTypes } from '../redux/Despachos/types'
import { types as alertasTypes } from '../redux/Alert/types'
const url = 'despachos'

export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/pag/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: despachosTypes.LISTAR_DESPACHOS, payload: res.data})

        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al solicitar el listado de despachos.')
        })
    }
}


export const filtrar = (texto, pag) => {
    console.log('FILTRO DESPACHOS',`${serverEndPoint}/${url}/filter/${texto}/${pag}`)
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/filter/${texto}/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: despachosTypes.LISTAR_DESPACHOS, payload: res.data})

        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al solicitar el listado de despachos.')
        })
    }
}


export const update = (id, data) => {
    return (dispatch, action) => {
        axios.put(`${serverEndPoint}/${url}/${id}`, data,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: despachosTypes.ACTUALIZAR_DESPACHO, payload: data})

        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al solicitar el listado de despachos.')
        })
    }
}


export const cambiarEstado = (id, idEstado) => {
    return (dispatch, action) => {
        axios.put(`${serverEndPoint}/${url}/estado/${id}/${idEstado}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: despachosTypes.CAMBIAR_ESTADO_DESPACHO, payload: idEstado})

        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al cambiar el estado del despacho.')
        })
    }
}
