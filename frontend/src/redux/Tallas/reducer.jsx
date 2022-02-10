import { types } from './types'

const INITIAL_STATE = {
    talla: {
        id: '',
        talla: '',
        categoria_id: '',
        sub_categorias: [],
        created_at: '',
        updated_at: '',
        deleted_at: ''
    },
    list: [],
    dataGrid: {
        data: [],
        page: 0,
        rowsPerPage: 10,
        totRows: 0
    }
}

export const TallasReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        case types.LISTAR_TALLAS:
        case types.FILTRAR_TALLAS:
            return {
                ...state,
                dataGrid: action.payload.data
            }
        case types.OBTENER_TODAS_TALLAS:
        case types.LISTAR_TALLAS_POR_SUBCATEGORIAS:
            return {
                ...state,
                list: action.payload
            }
        case types.VACIAR_LISTADO_TALLAS:
            return {
                ...state,
                list: []
            }
        case types.NUEVA_TALLA:
        case types.ELIMINAR_TALLA:
            return {
                ...state,
                talla: INITIAL_STATE.talla
            }
        case types.INSERTAR_TALLA:
        case types.ACTUALIZAR_TALLA:
        case types.BUSCAR_TALLAS:
            return {
                ...state,
                talla: action.payload
            }
        default:
            return state
    }
}