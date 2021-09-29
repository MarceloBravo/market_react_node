import axios from 'axios'
import { types as menusTiendaTypes } from '../redux/MenusTienda/types'
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { getHeader, handlerError } from '../shared/funciones'
import { serverEndPoint as endPoint } from '../shared/constantes'
const url = 'menus_tienda'

export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/pag/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: menusTiendaTypes.LISTAR_MENUS_TIENDA, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al listar los menús: ')
        })
    }
}

export const filter = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/filtrar/${texto}/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: menusTiendaTypes.FILTRAR_MENUS_TIENDA, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al filtrar los menús: ')
        })
    }
}

export const find = (id) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/${id}`, { headers: getHeader() }).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: menusTiendaTypes.FIND_MENU_TIENDA, payload: res})
        }, error => {
            handlerError(dispatch, error, 'Ocurrió un error al uscar el menú: ')
        })
    }
}

export const insertRec = (menu) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}`, menu, { headers: getHeader() }).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})    
            dispatch({type: menusTiendaTypes.INSERT_MENU_TIENDA})        
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
            dispatch({type: menusTiendaTypes.UPDATE_MENU_TIENDA})
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
            dispatch({type: menusTiendaTypes.DELETE_MENU_TIENDA})
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
            dispatch({ type: menusTiendaTypes.GET_ALL_MENUS_TIENDA, payload: res })
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al solicitar todos los menús: ')
        })
    }
}

export const getMainMenu = () => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: menusTiendaTypes.GET_MAIN_MENU_TIENDA, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el menú de la tienda: ')
        }) 
    }
}