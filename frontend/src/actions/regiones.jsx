import axios from 'axios'
import { types as regionesTypes } from '../redux/Regiones/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { apisDigitalGob } from '../shared/constantes'
import { handlerError } from '../shared/funciones'


export const listar = () => {
    return (dispatch, action) => {
        axios.get(`${apisDigitalGob}regiones`).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: regionesTypes.LISTAR_REGIONES, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de regiones')
        })
    }
}

export const buscar = (codigo) => {   //El código ha de ser un string de tres carácteres numéricos ej.: "071"
    return (dispatch, action) => {
        axios.get(`${apisDigitalGob}regiones/${codigo}`).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: regionesTypes.BUSCAR_REGION, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al buscar la región')
        })
    }
}