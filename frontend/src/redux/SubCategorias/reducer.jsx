import { types } from './types'

const INITIAL_STATE = {
    subCategoria:{
        id: '',
        nombre: '',
        categoria_id: 0,
        created_at: '',
        updated_at: '',
        deleted_at: ''

    },
    dataGrid:{
        data: [],
        totRows: 0,
        rowsPerPage: 10,
        page: 0
    },
    list: []
}

export const SubCategoriasReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.LISTAR_SUB_CATEGORIAS:
        case types.FILTRAR_SUB_CATEGORIAS:  
            return {
                ...state,
                dataGrid: action.payload.data
            }
        case types.LISTAR_TODAS_LAS_SUBCATEGORIAS:
            return {
                ...state,
                list: action.payload.data
            }
        case types.BUSCAR_SUB_CATEGORIAS:
        case types.INSERTAR_SUB_CATEGORIAS:
        case types.ACTUALIZAR_SUB_CATEGORIAS:
            return {
                ...state,
                subCategoria: action.payload.data
            }
        case types.NUEVA_SUB_CATEGORIA:
        case types.ELIMINAR_SUB_CATEGORIAS:
            return {
                ...state, INITIAL_STATE
            }
        case types.VACIAR_LISTADO_TODAS_LAS_SUBCATEGORIAS:
            return {
                ...state,
                list: []
            }
        default:
            return state
    }
}