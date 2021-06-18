import { types } from './types'

const INITIAL_STATE = {
    rol: {
        name: '',
        description: '',
        created_at: null,
        updated_at: null,
        deleted_at: null
    },
    dataGrid: {
        data: [],
        rowsPerPage: 10,
        page: 0,
        totRows: 0
    },
    list: []
}

export const RolesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.LISTAR_ROLES:
        case types.FILTRAR_ROLES:
            return {
                ...state,
                dataGrid: action.payload.data
            }
        case types.BUSCAR_ROL:
        case types.INSERTAR_ROL:
        case types.ACTUALIZAR_ROL:
            return {
                ...state,
                rol: action.payload.data
            }
        case types.GET_ALL_ROLES:
            return {
                ...state,
                list: action.payload.data
            }
        case types.ELIMINAR_ROL:
        case types.NUEVO_ROL:
            return {
                ...state, 
                state: INITIAL_STATE
            }
        default:
            return state
    }
}