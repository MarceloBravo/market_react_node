import axios from 'axios'
import { types } from '../redux/Categorias/types'
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as loginTypes } from '../redux/Login/types'
import { serverEndPoint as endPoint, msgErrConection } from '../shared/constantes'
import { getHeader } from '../shared/funciones'
const url = 'categorias'



export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/pag/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            if(res?.data?.status === "Token is Expired"){
                dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: msgErrConection, tipo: 'danger'}})
                dispatch({type: loginTypes.LOGOUT})
            }else{
                dispatch({type: types.LISTAR_CATEGORIAS, payload: res.data})
            }
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: 'Ocurrió un error al listar los registros: '+ error.message, tipoMensaje: 'danger'}})
        })
    }

}

export const filter = (texto, pag) => {
    console.log(`${endPoint}/${url}/filtrar/${texto}/${pag}`)
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/filtrar/${texto}/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            if(res?.data?.status === "Token is Expired"){
                dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: msgErrConection, tipo: 'danger'}})
                dispatch({type: loginTypes.LOGOUT})
            }else{
                dispatch({type: types.FILTRAR_CATEGORIAS, payload: res.data})
            }
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: 'Ocurrió un error al filtrar los registros: '+ error.message, tipoMensaje: 'danger'}})
        })
    }
}

export const find = (id) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/${id}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            if(res?.data?.status === "Token is Expired"){
                dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: msgErrConection, tipo: 'danger'}})
                dispatch({type: loginTypes.LOGOUT})
            }else{
                dispatch({type: types.BUSCAR_CATEGORIAS, payload: res})
            }
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: 'Ocurrió un error al buscar el registro: '+ error.message, tipoMensaje: 'danger'}})
        })
    }
}

export const insert = (data) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}`, data,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            if(res?.data?.status === "Token is Expired"){
                dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: msgErrConection, tipo: 'danger'}})
                dispatch({type: loginTypes.LOGOUT})
            }else{
                dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
                dispatch({type: types.INSERTAR_CATEGORIAS, payload: data})
            }
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: 'Ocurrió un error al agregar el registro: '+ error.message, tipoMensaje: 'danger'}})
        })
    }
}

export const update = (id, data) => {
    return (dispatch, action) => {
        axios.put(`${endPoint}/${url}/${id}`, data, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            if(res?.data?.status === "Token is Expired"){
                dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: msgErrConection, tipo: 'danger'}})
                dispatch({type: loginTypes.LOGOUT})
            }else{
                dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
                dispatch({type: types.ACTUALIZAR_CATEGORIAS, payload: res.data})
            }
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: 'Ocurrió un error al actualizar el registro: '+ error.message, tipoMensaje: 'danger'}})
        })
    }
}

export const deleteReg = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint}/${url}/${id}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            if(res?.data?.status === "Token is Expired"){
                dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: msgErrConection, tipo: 'danger'}})
                dispatch({type: loginTypes.LOGOUT})
            }else{
                dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
                dispatch({type: types.ELIMINAR_CATEGORIAS, payload: res.data})
            }
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: 'Ocurrió un error al eliminar el registro: '+ error.message, tipoMensaje: 'danger'}})
        })
    }
}
