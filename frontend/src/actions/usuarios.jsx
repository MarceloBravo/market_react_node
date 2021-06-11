import axios from 'axios'
import { types } from '../redux/Users/types';
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as loginTypes } from '../redux/Login/types'
import { serverEndPoint } from '../shared/constantes'
import { getHeader } from '../shared/funciones'
const endPoint = serverEndPoint+'/usuarios'


export const buscar = (id) => {    
    return (dispatch, action) => {
        axios.get(`${endPoint}/${id}`,{headers: getHeader()}).then(data => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            if(data.data.status === "Token is Expired"){
                dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: 'Tiempo de conección expirado. ', tipo: 'danger'}})
            }else{
                data.data = {...data.data, roles_id: data.data.roles.map(r => r.id)};   //Obteniendo los id de los roles en una matriz y cargandolos en una nueva propiedad roles_id
                dispatch({type: types.BUSCAR_USUARIO, payload: data})
            }
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: 'Error al buscar el usuario: ' + error.message, tipo: 'danger'}})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}

export const insertar = (user) => {
    let jsonUser = JSON.stringify(user)
    return (dispatch, action) => {
        axios.post(`${endPoint}`,jsonUser, {headers: getHeader()}).then(data => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.INSERTAR_USUARIO})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: data.data.mensaje, tipo: data.data.tipoMensaje}})
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: 'Error al agregar el usuario: ' + error.message, tipo: 'danger'}})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}

export const actualizar = (id, user) => {
    let jsonUser = JSON.stringify(user)
    return (dispatch, action) => {
        axios.put(`${endPoint}/${id}`, jsonUser, {headers: getHeader()}).then(data => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.ACTUALIZAR_USUARIO})
            dispatch({type: loginTypes.REFRESH_USER_DATA, payload: {user}})            
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: data.data.mensaje, tipo: data.data.tipoMensaje}})
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: 'Error al actualizar el usuario: ' + error.message, tipo: 'danger'}})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}

export const eliminar = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint}/${id}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.ELIMINAR_USUARIO})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.data.mensaje, tipo: res.data.data.tipoMensaje}})
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: 'Error al eliminar el usuario: ' + error.message, tipo: 'danger'}})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}

export const listar = () => {

    return (dispatch, action) => {
        axios.get(`${endPoint}/get/all`,{headers: getHeader()}).then(data => {
            dispatch({type: types.GET_ALL_USERS, payload: data})
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: 'Error al listar los usuario: ' + error.message, tipo: 'danger'}})
        })
    }
}




