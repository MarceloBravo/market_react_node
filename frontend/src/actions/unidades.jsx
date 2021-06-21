import axios from 'axios'
import { types as unidadesTypes} from '../redux/Unidades/types'
import { types as alertaTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { getHeader, handlerError } from '../shared/funciones'
const url = 'unidades'

export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/pag/${pag}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: unidadesTypes.LISTAR_UNIDADES, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de unidades: ')
        })
    }
}

export const filter = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/filtrar/${texto}/${pag}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: unidadesTypes.FILTRAR_UNIDADES, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al filtrar el listado de unidades: ')
        })
    }
}

export const getAll = () => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/get/all`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: unidadesTypes.GET_ALL_UNIDADES, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de todas las unidades: ')
        })
    }
}

export const find = (id) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: unidadesTypes.BUSCAR_UNIDADES, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al buscar la unidad: ')
        })
    }
}

export const insert = (data) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}`, data, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertaTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: unidadesTypes.INSERTAR_UNIDADES, payload: data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de unidades: ')
        })
    }
}

export const update = (id, data) => {
    return (dispatch, action) => {
        axios.put(`${endPoint}/${url}/${id}`, data, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertaTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: unidadesTypes.ACTUALIZAR_UNIDADES, payload: data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de unidades: ')
        })
    }
}

export const deleteReg = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint}/${url}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertaTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: unidadesTypes.ELIMINAR_UNIDADES})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de unidades: ')
        })
    }
}
