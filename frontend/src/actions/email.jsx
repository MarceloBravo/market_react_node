import axios from 'axios'
import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { getHeader, handlerError } from '../shared/funciones'

export const sendEmail = (content) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/send_email`, content, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje , tipo: res.data.tipoMensaje}})
        }).catch(error => {
            handlerError(dispatch, error, 'El email no pudo ser enviado: ')
        })
    }
}