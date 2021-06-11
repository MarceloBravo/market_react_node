import { types } from './types'

const INITIAL_STATE = {
    permisos: [],
    aplicar_permisos: [],
}

export const PermisosReducer =  (state = INITIAL_STATE, action)  => {
    switch(action.type){
        case types.LEER_PERMISOS:
            return {
                ...state,
                permisos: action.payload.data,
            }
        case types.GRABAR_PERMISOS:
            return {
                ...state,
                permisos: action.payload.data,
            }
        case types.APLICAR_PERMISOS:
            return {
                ...state,
                aplicar_permisos: action.payload,
            }
        default:
            return state
    }
}