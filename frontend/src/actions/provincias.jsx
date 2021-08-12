import axios from 'axios'
import { types as provinciasTypes } from '../redux/Provincias/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { apisDigitalGob } from '../shared/constantes'
import { handlerError } from '../shared/funciones'


//Listado de las Provincias
export const listarTodas = () => {
    return (dispatch, action) => {
        axios.get(`${apisDigitalGob}provincias`).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: provinciasTypes.LISTAR_PROVINCIAS, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de provincias')
        })
    }
}

//Listado de las Provincias pertenecientes a una Región
export const listaProvinciasRegion = (codigo) => {
    return (dispatch, action) => {
        axios.get(`${apisDigitalGob}regiones/${codigo}/provincias`).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: provinciasTypes.LISTAR_PROVINCIAS, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de provincias')
        })
    }
}


//Debuelve una provincia
export const buscar = (codigo) => {   //El código ha de ser un string de tres carácteres numéricos ej.: "071"
    return (dispatch, action) => {
        axios.get(`${apisDigitalGob}provincias/${codigo}`).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: provinciasTypes.BUSCAR_PROVINCIA, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al buscar la provincia')
        })
    }
}

//Debuelve una provincia perteneciente a una región específica
export const buscarProvinciaRegion = (codRegion, codProvincia) => {   //El código ha de ser un string de tres carácteres numéricos ej.: "071"
    return (dispatch, action) => {
        axios.get(`${apisDigitalGob}regiones/${codRegion}/provincias/${codProvincia}`).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: provinciasTypes.BUSCAR_PROVINCIA, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al buscar la provincia')
        })
    }
}