import { types } from './types'

const INITIAL_STATE = {
    categoria: {
        id: '',
        nombre: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
    list:[],
    dataGrid: {
        data: [],
        rowsPerPage: 10,
        page: 0,
        totRows: 0
    },
    categoriasSubCategorias: []
}


export const CategoriasReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.LISTAR_CATEGORIAS:
        case types.FILTRAR_CATEGORIAS:
            return {
                ...state,
                dataGrid: action.payload.data
            }
        case types.LISTAR_CATEGORIAS_SUBCATEGORIAS:
            return {
                ...state,
                categoriasSubCategorias: action.payload
            }
        case types.BUSCAR_CATEGORIAS:
        case types.INSERTAR_CATEGORIAS:
        case types.ACTUALIZAR_CATEGORIAS:
            return {
                ...state,
                categoria: action.payload.data
            }
        case types.ELIMINAR_CATEGORIAS:
        case types.NUEVA_CATEGORIA:
            return {
                ...state,
                categoria: INITIAL_STATE.categoria
            }
        case types.GET_ALL_CATEGORIAS:
            return {
                ...state,
                list: action.payload.data
            }
        default:
            return state
    }
}