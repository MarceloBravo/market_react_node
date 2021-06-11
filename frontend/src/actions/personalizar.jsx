import axios from 'axios'
import { types } from '../redux/Personalizar/types'
import { types as alertTypes} from '../redux/Alert/types'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { getHeader } from '../shared/funciones'


export const find = () => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/configuracion`, {headers: getHeader()}).then(res => {
            dispatch({type: types.GET_CUSTOM_CONFIG, payload: {data:res.data, isOk: true}})
        }).catch(error => {
            console.log(error)
            dispatch({type: types.SAVE_CUSTOM_CONFIG, payload: {data: {nombre_app: ''}, isOk: false}})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload:{mensaje: error.message, tipo: 'danger'}})
        })
    }
}

export const save = (data) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/configuracion`, data, {headers: getHeader()}).then(res => {
            let detalleErrores = ''
            if(res && res.data && res.data.errores){
                detalleErrores = ': ' + Object.keys(res.data.errores).map(e => res.data.errores[e]).join('')
            }

            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload:{mensaje: res.data.mensaje + detalleErrores, tipo: res.data.tipoMensaje}})
            dispatch({type: types.SAVE_CUSTOM_CONFIG, payload: {data, isOk: res.data.tipoMensaje === 'success'}})
        }).catch(error => {
            console.log(error)
            dispatch({type: types.SAVE_CUSTOM_CONFIG, payload: {data: {nombre_app: ''}, isOk: false}})
            dispatch({type: alertTypes.MOSTRAR_ALERTA, payload:{mensaje: error.message, tipo: 'danger'}})
        })
    }

}