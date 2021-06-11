import axios from 'axios';
import { types } from '../redux/Pantalla/types';
import { types as alertTypes } from '../redux/Alert/types';
import { types as spinnerTypes } from '../redux/Spinner/types'
import { serverEndPoint } from '../shared/constantes'
import { getHeader } from '../shared/funciones'
const endPoint = serverEndPoint+'/pantallas';


export const find = (id) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.FIND_PANTALLA, payload: res});
        }).catch(error => {
            console.log('Error al buscar la pantalla: ',error);
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error, tipo: 'danger' }});
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        });
    }
}

export const insert = (pantalla) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}`, pantalla, {headers: getHeader()} ).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.INSERT_PANTALLA});
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
        }).catch(error => {
            console.log('Error al ingresar el registro: ',error);
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error, tipo: 'danger' }});
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        }); 
    }
}

export const update = (id, pantalla) => {
    console.log('action',id, JSON.stringify(pantalla))
    return (dispatch, action) => {
        axios.put(`${endPoint}/${id}`, pantalla, {headers: getHeader()} ).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.UPDATE_PANTALLA});
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
        }).catch(error => {
            console.log('Error al actualizar el registro: ',error);
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error, tipo: 'danger' }});
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        }); 
    }
}

export const deleteRec = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
            dispatch({type: types.DELETE_PANTALLA});
        }).catch(error => {
            console.log('Error al eliminar la pantalla: ',error);
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message(), tipo: 'danger' }});
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        });
    }
}


export const getAll = ()  => {
    
    return (dispatch, getAction) => {
        axios.get(`${endPoint}/get/all`, { headers: getHeader() }).then((res) => {
            if (res.data.status === "Token is Expired") {
                throw Error(res.data.status)
            } else {
                dispatch({ type: types.GET_ALL_PANTALLAS, payload: res })
            }
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
        })
    }
}