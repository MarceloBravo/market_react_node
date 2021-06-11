import { axios } from 'axios'
import { types as selectTypes } from '../Selects/type'
import { getHeader } from '../shared/funciones'
import { serverEndPoint } from '../shared/constantes'


export const getOptionList = (tipoListado) => {
    return (dispatch, action) => {
        axios.get(`${serverEndPoint}/${tipoListado}`, { headers: getHeader() }).then(res => {
            dispatch({type: selectTypes.GET_ALL_MENUS_RECORDS , payload: res})
        }, error => {
            console.log('Error al obtener el listado de opciones: ',error)
        })
    }
}