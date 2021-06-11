import axios from 'axios'
import { types } from '../redux/Grid/types'
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { getHeader } from '../shared/funciones'


export const list = (destino, pag)  => {

    return (dispatch, getAction) => {
        axios.get(`${endPoint}/${destino}/pag/${pag}`, { headers: getHeader() }).then((res) => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            if (res.data.status === "Token is Expired") {
                throw Error(res.data.status)
            } else {
                dispatch({ type: types.GET_DATA, payload: res })
            }
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}

export const siguientePagina = (destino, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${destino}/get/${pag+1}`, { headers: getHeader() }).then(res => {
            dispatch({ type: types.SIGUIENTE_PAGINA, payload: res })
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
        });
    }
}

export const paginaAnterior = (destino, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${destino}/get/${pag-( pag > 0 ? 1 : 0)}`, { headers: getHeader() }).then(res => {
            dispatch({ type: types.PAGINA_ANTERIOR, payload: res })
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
        });
    }
}

export const primeraPagina = (destino) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${destino}/pag/0`, { headers: getHeader() }).then(res => {
            dispatch({type: types.GET_DATA, payload: res})
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
        })
    }
    
}

export const ultimaPagina = (destino, totRows) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${destino}/pag/${totRows-1}`, { headers: getHeader() }).then(res => {
            dispatch({type: types.GET_DATA, payload: res})
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
        })
    }
}

export const filter = (destino, texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${destino}/filtrar/${texto}/${pag}`, { headers: getHeader() }).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: types.GET_FILTER_DATA, payload: res})
        }).catch(error => {
            console.log(error)
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
            dispatch({type: spinnerTypes.HIDE_SPINNER})
        })
    }
}
