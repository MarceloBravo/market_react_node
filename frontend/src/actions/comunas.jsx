import axios from 'axios'
import { types as comunasTypes } from '../redux/Comunas/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { apisDigitalGob } from '../shared/constantes'
import { handlerError } from '../shared/funciones'


//Listado de las Comunas
export const listarTodas = () => {
    return (dispatch, action) => {
        axios.get(`${apisDigitalGob}comunas`).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: comunasTypes.LISTAR_COMUNAS, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de comunas')
        })
    }
}

//Listado de las Comunas pertenecientes a una provincia
export const listaComunasProvincia = (codigo) => {
    return (dispatch, action) => {
        axios.get(`${apisDigitalGob}provincias/${codigo}/comunas`).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: comunasTypes.LISTAR_COMUNAS, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de comunas de la provincia')
        })
    }
}


//Devuelve una comuna
export const buscar = (codigo) => {   //El código ha de ser un string de tres carácteres numéricos ej.: "071"
    return (dispatch, action) => {
        axios.get(`${apisDigitalGob}comunas/${codigo}`).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: comunasTypes.BUSCAR_COMUNA, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al buscar la comuna')
        })
    }
}

//Representación de una única Comuna perteneciente a una Provincia
export const buscarComunaProvincia = (codProvincia, codComuna) => {   //El código ha de ser un string de tres carácteres numéricos ej.: "071"
    return (dispatch, action) => {
        axios.get(`${apisDigitalGob}provincias/${codProvincia}/comunas/${codComuna}`).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: comunasTypes.BUSCAR_COMUNA, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al buscar la comuna')
        })
    }
}

//Listado de las Comunas pertenecientes a una Región
export const listarComunasRegion = (codigo) => {   //El código ha de ser un string de tres carácteres numéricos ej.: "071"
    return (dispatch, action) => {
        axios.get(`${apisDigitalGob}regiones/${codigo}/comunas`).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: comunasTypes.LISTAR_COMUNAS, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al listar las comunas pertenecientes a la región')
        })
    }
}

//Representación de una única Comuna perteneciente a una Región
export const buscarComunaRegion = (codRegion, codComuna) => {   //El código ha de ser un string de tres carácteres numéricos ej.: "071"
    return (dispatch, action) => {
        axios.get(`${apisDigitalGob}regiones/${codRegion}/comunas/${codComuna}`).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: comunasTypes.BUSCAR_COMUNA, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al buscar la comuna perteneciente a la región')
        })
    }
}

//Listado de las Comunas pertenecientes a una Provincia que a su vez pertenece a una Región
export const listarComunasProvinciaRegion = (codRegion, codProvincia) => {   //El código ha de ser un string de tres carácteres numéricos ej.: "071"
    return (dispatch, action) => {
        axios.get(`${apisDigitalGob}regiones/${codRegion}/provincias/${codProvincia}/comunas`).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: comunasTypes.LISTAR_COMUNAS, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al listar las comunas pertenecientes a la región y provincia')
        })
    }
}

//Representación de una única Comuna perteneciente a una Provincia que a su vez pertenece a una Región
export const buscarComunaProvinciaRegion = (codRegion, codProvincia, codComuna) => {   //El código ha de ser un string de tres carácteres numéricos ej.: "071"
    return (dispatch, action) => {
        axios.get(`${apisDigitalGob}regiones/${codRegion}/provincias/${codProvincia}/comunas`).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: comunasTypes.BUSCAR_COMUNA, payload: res.data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al buscar la comuna pertenecientes a la región y provincia')
        })
    }
}