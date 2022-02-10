import axios from 'axios'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { getHeader, handlerError } from '../shared/funciones'
import { types as TallasTypes } from '../redux/Tallas/types'
import { types as SpinnerTypes } from '../redux/Spinner/types'
import { types as AlertasTypes } from '../redux/Alert/types'
let url = '/tallas'


export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint + url}/pag/${pag}`, {headers: getHeader()}).then(res => {
            dispatch({type: SpinnerTypes.HIDE_SPINNER})
            dispatch({type: TallasTypes.LISTAR_TALLAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrio un error al listar las tallas.')
        })
    }
} 

export const filter = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint + url}/filter/${texto}/${pag}`, {headers: getHeader()}).then( res => {
            dispatch({type: SpinnerTypes.HIDE_SPINNER})
            dispatch({type: TallasTypes.FILTRAR_TALLAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrio un error al filtrar las tallas.')
        })
    }
}

export const getBySubCategory = (idSubCategoria) => {
    console.log(`${endPoint + url}/sub_categoria/${idSubCategoria}`)
    return (dispatch, action)=>{
        axios.get(`${endPoint + url}/sub_categoria/${idSubCategoria}`,{headers: getHeader()}).then(res => {
            dispatch({type: SpinnerTypes.HIDE_SPINNER})
            dispatch({type: TallasTypes.LISTAR_TALLAS_POR_SUBCATEGORIAS, payload: res.data})
        }).catch(error => {
            handlerError(dispatch,error,'Ocurrio un error al obtener el listado de tallas por subcategoría')
        })
    }
}

export const find = (id) => {
    return (dispatch, action) => {
        axios.get(`${endPoint + url}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: SpinnerTypes.HIDE_SPINNER})
            dispatch({type: TallasTypes.BUSCAR_TALLAS, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrio un error al buscar el registro')
        })
    }
}


export const getAll = () => {
    return (dispatch, action) => {
        axios.get(`${endPoint + url}/get/all`, {headers: getHeader()}).then(res => {
            dispatch({type: SpinnerTypes.HIDE_SPINNER})
            dispatch({type: TallasTypes.OBTENER_TODAS_TALLAS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrio un error al obtener todas las tallas.')
        })
    }
}

export const insert = (data) => {
    return (dispatch, action) => {
        axios.post(endPoint+url,data,{headers: getHeader()}).then(res => {
            dispatch({type: SpinnerTypes.HIDE_SPINNER})
            dispatch({type: TallasTypes.INSERTAR_TALLA, payload: data})
            dispatch({type: AlertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error =>{
            handlerError(dispatch, error, 'Ocurrio un error al ingresar la talla.')
        })
    }
}

export const update = (id, data) => {
    return (dispatch, action) => {
        axios.put(`${endPoint+url}/${id}`, data, {headers: getHeader()}).then(res => {
            dispatch({type: SpinnerTypes.HIDE_SPINNER})
            dispatch({type: TallasTypes.ACTUALIZAR_TALLA, payload: data})
            dispatch({type: AlertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrio un error al actualizar la talla.')
        })
    }
}

export const deleteReg = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint+url}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: SpinnerTypes.HIDE_SPINNER})
            dispatch({type: TallasTypes.ELIMINAR_TALLA})
            dispatch({type: AlertasTypes, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrio un error al eliminar la talla.')
        })
    }
}