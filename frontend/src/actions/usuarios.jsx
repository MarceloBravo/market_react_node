import axios from 'axios'
import { types } from '../redux/Users/types';
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as loginTypes } from '../redux/Login/types'
import { getHeader, handlerError } from '../shared/funciones'
import { serverEndPoint as endPoint } from '../shared/constantes'
const url = 'usuarios'


export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/pag/${pag}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.LISTAR_USUARIOS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al listar los usuarios: ')
        })
    }
}


export const filter = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/filtrar/${texto}/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.FILTRAR_USUARIOS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al filtrar los usuarios: ')
        })
    }
}

export const buscar = (id) => {    
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/${id}`,{headers: getHeader()}).then(data => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            if(data.data.status === "Token is Expired"){
                dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: { mensaje: 'Tiempo de conección expirado. ', tipo: 'danger'}})
            }else{
                data.data = {...data.data, roles_id: data.data.roles.map(r => r.id)};   //Obteniendo los id de los roles en una matriz y cargandolos en una nueva propiedad roles_id
                dispatch({type: types.BUSCAR_USUARIO, payload: data})
            }
        }).catch(error => {
            handlerError(dispatch, error, 'Error al buscar el usuario: ')
        })
    }
}

export const insertar = (user) => {
    let jsonUser = JSON.stringify(user)
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}`,jsonUser, {headers: getHeader()}).then(data => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.INSERTAR_USUARIO})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: data.data.mensaje, tipo: data.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al ingresar el usuario: ')
        })
    }
}

export const actualizar = (id, user) => {
    let jsonUser = JSON.stringify(user)
    return (dispatch, action) => {
        axios.put(`${endPoint}/${url}/${id}`, jsonUser, {headers: getHeader()}).then(data => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.ACTUALIZAR_USUARIO})
            dispatch({type: loginTypes.REFRESH_TOKEN, payload: {user}})            
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: data.data.mensaje, tipo: data.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al actualizar el usuario: ')
        })
    }
}

export const eliminar = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint}/${url}/${id}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.ELIMINAR_USUARIO})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.data.mensaje, tipo: res.data.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al eliminar el usuario: ')
        })
    }
}

export const listar = () => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/get/all`,{headers: getHeader()}).then(data => {
            dispatch({type: types.GET_ALL_USERS, payload: data})
        }).catch(error => {
            handlerError(dispatch, error, 'Error al obtener el listado de usuarios: ')
        })
    }
}




