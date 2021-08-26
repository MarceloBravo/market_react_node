import axios from 'axios'
import { serverEndPoint } from '../shared/constantes'
import { getHeader, handlerError } from '../shared/funciones'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as ordenCompraTypes } from '../redux/OrdenesCompra/types'
const url = 'ordenes_compra'

export const findByBuyOrden = (numOrden) => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${url}/order_number/${numOrden}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: ordenCompraTypes.BUSCAR_NUMERO_ORDEN, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al solicitar el listado de despachos.')
        })
    }
}