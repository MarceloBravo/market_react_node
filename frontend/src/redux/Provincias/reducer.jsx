import { types } from './types'

const INITIAL_STATE = {
    provincia: {},
    list: []
}

export const ProvinciasReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.LISTAR_PROVINCIAS:
            return {
                ...state,
                list: action.payload
            }
        case types.BUSCAR_PROVINCIA:
            return {
                ...state,
                provincia: action.payload
            }
        default:
            return state
    }
}