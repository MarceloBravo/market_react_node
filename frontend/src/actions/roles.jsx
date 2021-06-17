import axios from 'axios'
import { types } from '../redux/Roles/types'
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { getHeader, handlerError } from '../shared/funciones'
import { serverEndPoint as endPoint } from '../shared/constantes'
const url = 'roles'


export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/pag/${pag}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.LISTAR_ROLES, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al listar los roles: ')
        })
    }
}


export const filter = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/filtrar/${texto}/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.FILTRAR_ROLES, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al filtrar los roles: ')
        })
    }
}


export const buscar = (id) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.BUSCAR_ROL, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al buscar el rol: ')
        })
    }
}

export const insertar = (rol) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}`, rol, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.INSERTAR_ROL, payload: {data: rol}})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload:{mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al ingresar el rol: ')
        })
    }
}

export const actualizar = (id, rol) => {
    return (dispatch, action) => {
        axios.put(`${endPoint}/${url}/${id}`, rol, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.ACTUALIZAR_ROL, payload: {data: rol}})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload:{mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al actualizar el rol: ')
        })
    }
}

export const eliminar = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint}/${url}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.ELIMINAR_ROL})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload:{mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al eliminar el rol: ')
        })
    }
}

export const listar = () => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/get/all`, {headers: getHeader()}).then(res => {
            dispatch({type: types.GET_ALL_ROLES, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al obtener el listado de roles: ')
        })
    }
}