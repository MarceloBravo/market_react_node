import { types } from './types'

const INITIAL_STATE = {
    rol: {
        name: '',
        description: '',
        created_at: null,
        updated_at: null,
        deleted_at: null
    },
    list: []
}

export const RolesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
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
            console.log('NUEVO_ROL')
            return {
                ...state, 
                state: INITIAL_STATE
            }
        default:
            return state
    }
}