import axios from 'axios'
import { types } from '../redux/Menus/types'
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { serverEndPoint } from '../shared/constantes'
import { getHeader } from '../shared/funciones'
const endPoint = serverEndPoint+'/menus'


export const find = (id) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${id}`, { headers: getHeader() }).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.FIND_MENU, payload: res})
        }, error => {
            console.log('Error al buscar el menú: ', error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error, tipo: 'danger' }})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}

export const insertRec = (menu) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}`, menu, { headers: getHeader() }).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})    
            dispatch({type: types.INSERT_MENU})        
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
        }, error => {
            console.log('Error al registrar el menú: ', error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error, tipo: 'danger' }})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}

export const updateRec = (id, menu) => {
    return (dispatch, action) => {
        axios.put(`${endPoint}/${id}`, menu, { headers: getHeader() }).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.UPDATE_MENU})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
        }, error => {
            console.log('Error al actualizar el menú: ', error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error, tipo: 'danger' }})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}

export const deleteRec = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint}/${id}`, { headers: getHeader() }).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.DELETE_MENU})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
        }, error => {
            console.log('Error al eliminar el menú: ', error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error, tipo: 'danger' }})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}


export const getAll = ()  => {
    
    return (dispatch, getAction) => {
        axios.get(`${endPoint}/get/all`, { headers: getHeader() }).then((res) => {
            if (res.data.status === "Token is Expired") {
                throw Error(res.data.status)
            } else {
                dispatch({ type: types.GET_ALL_MENUS, payload: res })
            }
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
        })
    }
}

export const getMainMenu = (idRoles) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/rol/${idRoles}`, {headers: getHeader()}).then(res => {
            
            if (res.data.status === "Token is Expired") {
                throw Error(res.data.status)
            }else{
                dispatch({type: types.GET_MAIN_MENU, payload: res.data})
            }

        }).catch(error => {
            console.log(error);
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger'}})
        }) 
    }
}
