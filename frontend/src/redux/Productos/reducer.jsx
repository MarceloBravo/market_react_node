import { types } from './types'

const INITIAL_STATE = {
    producto: {
        id: 0,
        nombre: '',
        descripcion: '',
        precio_venta_normal: '',
        precio_actual: 0,
        precio_fecha_desde: '',
        precio_fecha_hasta: '',
        stock: 0,
        unidad_id: 0,
        marca_id: 0,
        categoria_id: 0,
        sub_categoria_id: 0,
        impuestos_id: [],
        impuestos: [],
        imagenes: [],
        objImages: [],
        created_at: '',
        updated_at: '',
        deleted_at: ''
    },
    list:[],
    dataGrid: {
        data: [],
        rowsPerPage: 10,
        page: 0,
        totRows: 0
    },
    preciosMinMax: {
        min: 0,
        max: 0
    },
    textoFiltro: '', //Texto para el filtro para productos
}

export const ProductosReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.TEXTO_FILTRO_PRODUCTO:
            return {
                ...state,
                textoFiltro: action.payload
            }
        case types.LISTAR_PRODUCTOS:
        case types.FILTRAR_PRODUCTOS:
            return {
                ...state,
                dataGrid: action.payload.data
            }
        case types.BUSCAR_PRODUCTO:
        case types.INSERTAR_PRODUCTO:
        case types.ACTUALIZAR_PRODUCTO:
            return {
                ...state,
                producto: action.payload.data
            }
        case types.ELIMINAR_PRODUCTO:
        case types.NUEVO_PRODUCTO:
            return {
                ...state,
                producto: INITIAL_STATE.producto
            }
        case types.ESTADO_INICIAL_PRODUCTO:
            return {
                ...state,
                producto: INITIAL_STATE.producto,
                dataGrid: INITIAL_STATE.dataGrid,
                list: INITIAL_STATE.list
            }
        case types.GET_ALL_PRODUCTO:
            return {
                ...state,
                list: action.payload.data
            }
        case types.PRECIOS_PRODUCTOS_MIN_MAX:
            return {
                ...state,
                preciosMinMax: action.payload.data
            }
        default:
            return state
    }
}