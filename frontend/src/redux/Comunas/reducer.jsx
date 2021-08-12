import { types } from './types'

const INITIAL_STATE = {
    comuna: {},
    list: []
}

export const ComunasReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.LISTAR_COMUNAS:
            return {
                ...state,
                list: action.payload
            }
        case types.BUSCAR_COMUNA:
            return {
                ...state,
                comuna: action.payload
            }
        default:
            return state
    }

}
