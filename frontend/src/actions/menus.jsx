import axios from 'axios'
import { types } from '../redux/Menus/types'
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
//import { types as loginTypes } from '../redux/Login/types'
import { getHeader, handlerError } from '../shared/funciones'
import { serverEndPoint as endPoint } from '../shared/constantes'
const url = 'menus'

export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/pag/${pag}`,{headers: getHeader()}).then(res => {            
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.LISTAR_MENUS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al listar los menús: ')
        })
    }

}

export const filter = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/filtrar/${texto}/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.FILTRAR_MENUS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al filtrar los menús: ')
        })
    }
}

export const find = (id) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/${id}`, { headers: getHeader() }).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.FIND_MENU, payload: res})
        }, error => {
            handlerError(dispatch, error, 'Ocurrió un error al uscar el menú: ')
        })
    }
}

export const insertRec = (menu) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}`, menu, { headers: getHeader() }).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})    
            dispatch({type: types.INSERT_MENU})        
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
        }, error => {
            handlerError(dispatch, error, 'Ocurrió un error al ingresar el menú: ')
        })
    }
}

export const updateRec = (id, menu) => {
    return (dispatch, action) => {
        axios.put(`${endPoint}/${url}/${id}`, menu, { headers: getHeader() }).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.UPDATE_MENU})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
        }, error => {
            handlerError(dispatch, error, 'Ocurrió un error al actualizar el menú: ')
        })
    }
}

export const deleteRec = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint}/${url}/${id}`, { headers: getHeader() }).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.DELETE_MENU})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje }})
        }, error => {
            handlerError(dispatch, error, 'Ocurrió un error al eliminar el menú: ')
            
        })
    }
}


export const getAll = ()  => {
    
    return (dispatch, getAction) => {
        axios.get(`${endPoint}/${url}/get/all`, { headers: getHeader() }).then((res) => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({ type: types.GET_ALL_MENUS, payload: res })
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al solicitar todos los menús: ')
        })
    }
}

export const getMainMenu = (idRoles) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/rol/${idRoles}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.GET_MAIN_MENU, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el menú principal: ')
        }) 
    }
}

/*
const handlerError = (dispatch, error, msg) => {
    dispatch({type: spinnerTypes.HIDE_SPINNER})
    if(error.response?.data === 'Token no válido'){
        dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: 'Tu sessión ha finalizado. Ingresa nuevamenten a la aplicación.', tipo: 'danger'}})
        dispatch({type: loginTypes.LOGOUT})
    }else{                
        console.log(msg, error)
        dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
    }
}
*/