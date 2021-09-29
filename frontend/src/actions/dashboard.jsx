import axios from 'axios'
import { getHeader, handlerError } from '../shared/funciones'
import { types as dashBoardTypes } from '../redux/Dashboard/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { serverEndPoint } from '../shared/constantes'
const url = 'dashboard'

export const ventasUltimoMes = () => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/mes`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: dashBoardTypes.DASHBOARD_VENTAS_MENSUALES, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al solicitar las ventas por mes: ')
        })
    }
}


export const ventasTrimestrales = () => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/trimestre`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: dashBoardTypes.DASHBOARD_VENTAS_TRIMESTRALES, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al solicitar las ventas de los últimos 3 semestres: ')
        })
    }
}


export const ventasAnuales = () => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/anio`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: dashBoardTypes.DASHBOARD_VENTAS_ANUALES, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al solicitar las ventas del último año: ')
        })
    }
}

export const masVendidos = () => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/mas_vendidos`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: dashBoardTypes.DASHBOARD_MAS_VENDIDOS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al solicitar los productos más vendidos: ')
        })
    }
}

export const menosVendidos = () => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/menos_vendidos`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: dashBoardTypes.DASHBOARD_MENOS_VENDIDOS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al solicitar los productos menos vendidos: ')
        })
    }
}

export const totalesVentasDespachos = () => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/total_pedidos_despachos`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: dashBoardTypes.DASHBOARD_TOTALES_VENTAS_DESPACHOS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al solicitar el resumen de ventas v/s despachos de los últimos 6 meses: ')
        })
    }
}

export const ventasDespachosUltimoAnio = () => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/ventas_despachos_ultimo_anio`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: dashBoardTypes.DASHBOARD_VENTAS_DESPACHOS_ULTIMO_ANIO, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al solicitar el resumen de ventas y despachos del último año: ')
        })
    }
}