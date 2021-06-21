import { types } from './types'

const INITIAL_STATE = {
    unidad:{
        id: '',
        nombre: '',
        created_at: '',
        updated_at: '',
        deleted_at: ''
    },
    list: [],
    dataGrid: {
        data: [],
        rowsPerPage: 0,
        page: 0,
        totRows: 0
    }
}

export const UnidadesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.LISTAR_UNIDADES:
        case types.FILTRAR_UNIDADES:
            return {
                ...state,
                dataGrid: action.payload.data
            }
        case types.BUSCAR_UNIDADES:
        case types.INSERTAR_UNIDADES:
        case types.ACTUALIZAR_UNIDADES:
            return {
                ...state,
                unidad: action.payload.data
            }
        case types.ELIMINAR_UNIDADES:
            return {
                ...state,
                unidad: state.INITIAL_STATE
            }
        case types.GET_ALL_UNIDADES:
            return {
                ...state,
                list: action.payload.data 
            }
        default:
            return state
    }
}