import { types } from './types'

const INITIAL_STATE = {
    categoria: {
        id: '',
        nombre: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
    list:[]
}


export const CategoriasReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.LISTAR_CATEGORIAS:
        case types.FILTRAR_CATEGORIAS:
            return {
                ...state,
                list: action.payload.data
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
            console.log('NUEVA_CATEGORIA')
            return {
                ...state,
                categoria: INITIAL_STATE.categoria
            }
        default:
            return state
    }
}