import axios from 'axios'
import { types } from '../redux/Categorias/types'
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { getHeader, handlerError } from '../shared/funciones'
const url = 'categorias'



export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/pag/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.LISTAR_CATEGORIAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al listar las categorías: ')
        })
    }

}

export const filter = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/filtrar/${texto}/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.FILTRAR_CATEGORIAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al filtrar las categorías: ')
        })
    }
}

export const getAll = () => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/get/all`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.GET_ALL_CATEGORIAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al filtrar las categorías: ')
        })
    }
}

export const getCategoriasSubCategorias = () => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}_subCategorias`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.LISTAR_CATEGORIAS_SUBCATEGORIAS, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al filtrar las categorías: ')
        })
    }
}

export const find = (id) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/${id}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.BUSCAR_CATEGORIAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al buscar la categoría: ')
        })
    }
}

export const insert = (data) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}`, data,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: types.INSERTAR_CATEGORIAS, payload: data})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al ingresar la categoría: ')
        })
    }
}

export const update = (id, data) => {
    return (dispatch, action) => {
        axios.put(`${endPoint}/${url}/${id}`, data, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: types.ACTUALIZAR_CATEGORIAS, payload: data})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al actualizar la categoría: ')
        })
    }
}

export const deleteReg = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint}/${url}/${id}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: types.ELIMINAR_CATEGORIAS})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al eliminar la categoría: ')
        })
    }
}
