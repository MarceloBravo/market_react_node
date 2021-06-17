import axios from 'axios';
import { types } from '../redux/Pantalla/types';
import { types as alertTypes } from '../redux/Alert/types';
import { types as spinnerTypes } from '../redux/Spinner/types'
import { getHeader, handlerError } from '../shared/funciones'
import { serverEndPoint as endPoint } from '../shared/constantes'
const url = 'pantallas'


export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/pag/${pag}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.LISTAR_PANTALLAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al listar las pantallas: ')
        })
    }
}


export const filter = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/filtrar/${texto}/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.FILTRAR_PANTALLAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al filtrar las pantallas: ')
        })
    }
}

export const find = (id) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.FIND_PANTALLA, payload: res});
        }).catch(error => {
            handlerError(dispatch, error, 'Error al buscar la pantalla: ')
        });
    }
}

export const insert = (pantalla) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}`, pantalla, {headers: getHeader()} ).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.INSERT_PANTALLA});
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al ingresar la pantalla: ')
        }); 
    }
}

export const update = (id, pantalla) => {
    return (dispatch, action) => {
        axios.put(`${endPoint}/${url}/${id}`, pantalla, {headers: getHeader()} ).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.UPDATE_PANTALLA});
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al actualizar la pantalla: ')
        }); 
    }
}

export const deleteRec = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint}/${url}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
            dispatch({type: types.DELETE_PANTALLA});
        }).catch(error => {
            handlerError(dispatch, error, 'Error al eliminar la pantalla: ')
        });
    }
}


export const getAll = ()  => {
    
    return (dispatch, getAction) => {
        axios.get(`${endPoint}/${url}/get/all`, { headers: getHeader() }).then((res) => {
            if (res.data.status === "Token is Expired") {
                throw Error(res.data.status)
            } else {
                dispatch({ type: types.GET_ALL_PANTALLAS, payload: res })
            }
        }).catch(error => {
            handlerError(dispatch, error, 'Error al obtener el listado de pantallas la pantalla: ')
        })
    }
}