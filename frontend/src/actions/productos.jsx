import axios from 'axios'
import { types as productosTypes} from "../redux/Productos/types"
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as alertaTypes } from '../redux/Alert/types'
import { serverEndPoint as endPoint} from '../shared/constantes'
import { getHeaderFormData, getHeader, handlerError } from '../shared/funciones'
const url = 'productos'


export const getPage = (pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/pag/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: productosTypes.LISTAR_PRODUCTOS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de productos: ')
        })
    }
}


export const getItemsPage = (pag, items, orderBy) => {
    let end_point = `${endPoint}/${url}/pag/${pag}/${items}${(orderBy.field && orderBy.direction) ? '/'+orderBy.field+'/'+orderBy.direction : ''}` 
    return (dispatch, action) => {
        axios.get(end_point,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: productosTypes.LISTAR_PRODUCTOS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de productos: ')
        })
    }
}


export const getPreciosMinMax = (pag, items) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/min/max`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: productosTypes.PRECIOS_PRODUCTOS_MIN_MAX, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de productos: ')
        })
    }
}


export const filter = (texto, pag) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/filtrar/${texto}/${pag}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: productosTypes.FILTRAR_PRODUCTOS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al filtrar el listado de productos: ')
        })
    }
}


export const filterParams = (data, pag) => {
    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}/filtrar/${pag}`, data, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: productosTypes.FILTRAR_PRODUCTOS, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al filtrar el listado de productos: ')
        })
    }
}

export const getAll = () => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/get/all`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: productosTypes.GET_ALL_PRODUCTO, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de todos productos: ')
        })
    }
}

export const find = (id) => {
    return (dispatch, action) => {
        axios.get(`${endPoint}/${url}/${id}`,{headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: productosTypes.BUSCAR_PRODUCTO, payload: res})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al buscar el producto: ')
        })
    }
}

export const insert = (data) => {

    let fd = crearFormData(data)

    return (dispatch, action) => {
        axios.post(`${endPoint}/${url}`, fd, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertaTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: productosTypes.INSERTAR_PRODUCTO, payload: data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al obtener el listado de productos: ')
        })
    }
}


export const update = (id, data) => {

    let fd = crearFormData(data)
    
    return (dispatch, action) => {
        axios.put(`${endPoint}/${url}/${id}`,fd, {headers: getHeaderFormData()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertaTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: productosTypes.ACTUALIZAR_PRODUCTO, payload: data})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al actualizar el listado de productos: ')
        })
    }
}

const crearFormData = (data) => {
    let fd = new FormData()
    Object.keys(data).forEach(i => {
        if(i === 'imagenes'){
            data[i].forEach(img => {
                fd.append('objImages',img.file)
                fd.append(i, `{"id": ${img.id}, "source_image": "${img.source_image}", "imagen_principal": ${img.imagen_principal}}`)
                //console.log('imagen_principal',img.imagen_principal)
            })
        }else{
            fd.append(i, data[i])
        }
    })

    return fd
}


export const deleteReg = (id) => {
    return (dispatch, action) => {
        axios.delete(`${endPoint}/${url}/${id}`, {headers: getHeader()}).then(res => {
            dispatch({type: spinnerTypes.HIDE_SPINNER})
            dispatch({type: alertaTypes.MOSTRAR_ALERTA, payload: {mensaje: res.data.mensaje, tipo: res.data.tipoMensaje}})
            dispatch({type: productosTypes.ELIMINAR_PRODUCTO})
        }).catch(error => {
            handlerError(dispatch, error, 'Ocurrió un error al eliminar el listado de productos: ')
        })
    }   
}