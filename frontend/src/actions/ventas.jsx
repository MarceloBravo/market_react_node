import axios from 'axios'
import { getHeader, handlerError } from '../shared/funciones'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { types as ventasTypes } from '../redux/Ventas/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as alertasTypes } from '../redux/Alert/types'
const url = 'ventas'

export const registrar = (data) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}/registrar`, data, {headers: getHeader()}).then(res => {
            console.log('registrando venta')
            debugger
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            if(res.data.tipoMensaje === 'success'){
                dispatch({type: ventasTypes.SET_DATOS_VENTA, payload: data})
            }
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al intentar registrar la venta.')
        })
    }
}


export const anularVenta = (idVenta) => {
    return (dispatch, action) => {
        axios.put(`${endPoint}/${url}/anular/${idVenta}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: ventasTypes.ANULAR_VENTA})
            dispatch({type: alertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al intentar anular la venta.')
        })
    }
}