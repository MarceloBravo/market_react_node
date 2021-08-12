import axios from 'axios'
import { types as clientesTypes } from '../redux/Clientes/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as alertTypes } from '../redux/Alert/types'
import { serverEndPoint } from '../shared/constantes'
import { getHeader, handlerError} from '../shared/funciones'
const url = 'clientes'

export const getPage = (pag) => {
    return (dispatch, action)=>{
        axios.get(`${serverEndPoint}/${url}/pag/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: clientesTypes.LISTAR_CLIENTES, payload: res})
        }).catch(error=>{
            handlerError(dispatch, error, 'Ha ocurrido un error al intentar obtener el listado de clientes')
        })
    }
}


export const filter = (texto, pag) => {
    return (dispatch, action)=>{
        axios.get(`${serverEndPoint}/${url}/filter/${texto}/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: clientesTypes.FILTRAR_CLIENTES, payload: res})
        }).catch(error=>{
            handlerError(dispatch, error, 'Ha ocurrido un error al intentar filtrar el listado de clientes')
        })
    }
}

export const getAll = () => {
    return (dispatch, action)=>{
        axios.get(`${serverEndPoint}/${url}/get/all`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: clientesTypes.GET_ALL_CLIENTES, payload: res})
        }).catch(error=>{
            handlerError(dispatch, error, 'Ha ocurrido un error al intentar obtener todo el listado de clientes')
        })
    }
}

export const find = (id) => {
    return (dispatch, action)=>{
        axios.get(`${serverEndPoint}/${url}/${id}`,{headers: getHeader()}).then(res => {
            console.log(res.data)
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: clientesTypes.BUSCAR_CLIENTES, payload: res.data})
        }).catch(error=>{
            handlerError(dispatch, error, 'Ha ocurrido un error al buscar registro')
        })
    }
}

export const findByRut = (rut) => {
    return (dispatch, action)=>{
        axios.get(`${serverEndPoint}/${url}/rut/${rut}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: clientesTypes.BUSCAR_CLIENTES, payload: res.data})
        }).catch(error=>{
            handlerError(dispatch, error, 'Ha ocurrido un error al buscar el registro')
        })
    }
}

export const emailIsInUse = (email, rut) => {
    return (dispatch, action)=>{
        axios.get(`${serverEndPoint}/${url}/email_en_uso/${email}/${rut}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: clientesTypes.BUSCAR_CLIENTES, payload: res.data})
        }).catch(error=>{
            handlerError(dispatch, error, 'Ha ocurrido un error al buscar el registro')
        })
    }
}

export const insert = (data) => {
    return (dispatch, action)=>{
        axios.post(`${serverEndPoint}/${url}`, data, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: clientesTypes.INSERTAR_CLIENTES, payload: data})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error=>{
            handlerError(dispatch, error, 'Ha ocurrido un error al intentar ingresar el cliente')
        })
    }
}

export const update = (id, data) => {
    return (dispatch, action)=>{
        axios.put(`${serverEndPoint}/${url}/${id}`, data, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: clientesTypes.ACTUALIZAR_CLIENTES, payload: data})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error=>{
            handlerError(dispatch, error, 'Ha ocurrido un error al intentar actualizar el cliente')
        })
    }
}

export const deleteReg = (id) => {
    return (dispatch, action)=>{
        axios.delete(`${serverEndPoint}/${url}/${id}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: clientesTypes.ELIMINAR_CLIENTES})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error=>{
            handlerError(dispatch, error, 'Ha ocurrido un error al intentar eliminar el clientes')
        })
    }
}

export const eraseReg = (id) => {
    return (dispatch, action)=>{
        axios.delete(`${serverEndPoint}/${url}/kill/${id}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: clientesTypes.ELIMINAR_CLIENTES})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
        }).catch(error=>{
            handlerError(dispatch, error, 'Ha ocurrido un error al intentar borrar el cliente')
        })
    }
}

export const loginCliente = (email, password) => {
    return (dispatch, action) => {
        axios.post(`${serverEndPoint}/${url}/login`, {email, password}, {headers: getHeader()}).then(res => {
            dispatch({type:spinnerTypes.HIDE_SPINNER})
            if(res.data.tipoMensaje === 'danger'){
                dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            }else{
                dispatch({type: alertTypes.OCULTAR_ALERTA})
                dispatch({type: clientesTypes.LOGIN_CLIENTE, payload: res.data.access_token})
            }
        }).catch(error => {
            handlerError(dispatch, error, 'Ha ocurrido un error al intentar borrar el cliente')
        })
    }
}




