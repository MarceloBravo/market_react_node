import axios from 'axios'
import { getHeader, handlerError } from '../shared/funciones'
import { serverEndPoint } from '../shared/constantes'
import { types as alertasTypes } from '../redux/Alert/types'
import { types as subCategoriasTypes } from '../redux/SubCategorias/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
const url = 'sub_categorias'

export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/pag/${pag}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: subCategoriasTypes.LISTAR_SUB_CATEGORIAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al listar los registros:')
        })
    }
} 

export const filter = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/filtrar/${texto}/${pag}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: subCategoriasTypes.FILTRAR_SUB_CATEGORIAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al filtrar los registros:')
        })
    }
} 

export const getAll = () => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/get/all`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: subCategoriasTypes.LISTAR_TODAS_LAS_SUBCATEGORIAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de sub-categorías:')
        })
    }
} 

export const getAllByCategory = (id) => {
    console.log(`${serverEndPoint}/${url}/get/all/${id}`)
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/get/all/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: subCategoriasTypes.LISTAR_TODAS_LAS_SUBCATEGORIAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de sub-categorías:')
        })
    }
} 


export const find = (id) => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: subCategoriasTypes.BUSCAR_SUB_CATEGORIAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al buscar la sub-categoría: ')
        })
    }
} 

export const insert = (data) => {
    return (dispatch, action) => {
        axios.post(`${serverEndPoint}/${url}`, data, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: subCategoriasTypes.INSERTAR_SUB_CATEGORIAS, payload: data})
            dispatch({type: alertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al ingresar la sub-categoría: ')
        })
    }
} 

export const update = (id, data) => {
    return (dispatch, action) => {
        axios.put(`${serverEndPoint}/${url}/${id}`, data, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: subCategoriasTypes.ACTUALIZAR_SUB_CATEGORIAS, payload: data})
            dispatch({type: alertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al actualizar la sub-categoría: ')
        })
    }
} 

export const deleteReg = (id) => {
    return (dispatch, action) => {
        axios.delete(`${serverEndPoint}/${url}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: subCategoriasTypes.ELIMINAR_SUB_CATEGORIAS})
            dispatch({type: alertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al eliminar la sub-categoría: ')
        })
    }
} 