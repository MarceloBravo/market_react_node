import axios from  'axios'
import { getHeader, handlerError } from '../shared/funciones'
import { serverEndPoint as endPoint } from '../shared/constantes'
import { types as tiposPagoTypes } from '../redux/TiposPago/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
const url = 'tipo_pago'


//Busca por el tipo de pago por su código no por su ID
export const searchByCode = (codigo) => {
    return (dispatch, action)=>{
        axios.get(`${endPoint}/${url}/cod/${codigo}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: tiposPagoTypes.TIPOS_PAGO_BUSCAR, payload: res.data})
        }).catch(error=>{
            handlerError(dispatch, error, 'Ocurrió un error al buscar el tipo de pago.')
        })
    }
}