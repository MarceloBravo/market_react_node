import axios from 'axios'
import { types as preciosTypes } from '../redux/Precios/types'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { getHeader, handlerError } from '../shared/funciones'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as alertaTypes } from '../redux/Alert/types'
const url = 'precios'

export const page = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/pag/${pag}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})            
            dispatch({type: preciosTypes.PRECIOS_GET_PAGE, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de precios:')
        })
    }
}

export const filter = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/filtrar/${texto}/${pag}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: preciosTypes.PRECIOS_FILTER, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al filtrar el listado de precios:')
        })
    }
}

export const getAll = () => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/get/all`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: preciosTypes.PRECIOS_GET_ALL, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de todos los precios registrados:')
        })
    }
}

export const save = (data, pag, texto = null) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}/save`, {data, pag, texto}, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertaTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: preciosTypes.PRECIOS_SAVE, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al actualizar los precios:')
        })
    }
}

export const getProductInfo = (id) => {
    return (dispatch, action)=>{
        axios.get(`${endPoint}/${url}/datos_producto/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertaTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: preciosTypes.PRECIOS_ADD_NEW, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al buscar el producto para configurar el nuevo precio:')
        })
    }
}