import axios from 'axios'
import  { types as alertasTypes } from '../redux/Alert/types' 
import  { types as infoTiendaTypes } from '../redux/InfoTienda/types' 
import { serverEndPoint as endPoint } from '../shared/constantes'
import { getHeader, handlerError } from '../shared/funciones'
const url = 'tienda'

export const getData = () => {
    return (dispacth, action)=>{
        axios.get(`${endPoint}/${url}`,{headers: getHeader()}).then(res => {
            dispacth({type: infoTiendaTypes.SHOW_SHOP_INFO, payload: res})

        }).catch(error => {
            handlerError(dispacth, error, 'Ocurrió un error al solicitar los datos de la tienda: ' + error.message)
        })
    }
}


export const save = (data) => {
    return (dispacth, action)=>{
        axios.post(`${endPoint}/${url}`, data, {headers: getHeader()}).then(res => {
            dispacth({type: alertasTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispacth({type: infoTiendaTypes.UPDATE_SHOP_INFO, payload: data})

        }).catch(error => {
            handlerError(dispacth, error, 'Ocurrió un error al actualizar los datos de la tienda: ' + error.message)
        })
    }
}