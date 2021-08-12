import axios from 'axios'
import { types as seccionesHomeTypes } from '../redux/SeccionesHome/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as alertasTypes } from '../redux/Alert/types'
import { getHeader, handlerError } from '../shared/funciones'
import { serverEndPoint } from '../shared/constantes'
const url = 'secciones_home'

export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/pag/${pag}`, { headers: getHeader()}).then( res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: seccionesHomeTypes.GET_PAGE_SECCIONES_HOME, payload: res})
        }).catch(err => {
            handlerError(dispatch, err, 'Ocurrió un error al obtener el listado de secciones: ')
        })
    }
}

export const filter = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/filtrar/${texto}/${pag}`, { headers: getHeader()}).then( res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: seccionesHomeTypes.FILTER_SECCIONES_HOME, payload: res})
        }).catch(err => {
            handlerError(dispatch, err, 'Ocurrió un error al filtrar el listado de secciones: ')
        })
    }
}

export const getAll = () => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/get/all`, { headers: getHeader()}).then( res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: seccionesHomeTypes.GET_ALL_SECCIONES_HOME, payload: res})
        }).catch(err => {
            handlerError(dispatch, err, 'Ocurrió un error al filtrar el listado de secciones: ')
        })
    }
}


export const find = (id) => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/${id}`, { headers: getHeader()}).then( res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: seccionesHomeTypes.FIND_SECCIONES_HOME, payload: res})
        }).catch(err => {
            handlerError(dispatch, err, 'Ocurrió un error al buscar el registro: ')
        })
    }
}



export const insert = (data) => {
    return (dispatch, action) => {
        axios.post(`${serverEndPoint}/${url}`, data, { headers: getHeader()}).then( res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: seccionesHomeTypes.INSERT_SECCIONES_HOME, payload: data})
        }).catch(err => {
            handlerError(dispatch, err, 'Ocurrió un error al filtrar el listado de secciones: ')
        })
    }
}

export const update = (id, data) => {
    return (dispatch, action) => {
        axios.put(`${serverEndPoint}/${url}/${id}`, data, { headers: getHeader()}).then( res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: seccionesHomeTypes.UPDATE_SECCIONES_HOME, payload: data})
        }).catch(err => {
            handlerError(dispatch, err, 'Ocurrió un error al filtrar el listado de secciones: ')
        })
    }
}

export const deleteReg = (id) => {
    return (dispatch, action) => {
        axios.delete(`${serverEndPoint}/${url}/${id}`, { headers: getHeader()}).then( res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: seccionesHomeTypes.DELETE_SECCIONES_HOME})
        }).catch(err => {
            handlerError(dispatch, err, 'Ocurrió un error al filtrar el listado de secciones: ')
        })
    }
}