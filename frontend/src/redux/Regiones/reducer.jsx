import { types } from './types'

const INITIAL_STATE = {
    ciudad: {},
    list:[]
}

export const RegionesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.LISTAR_REGIONES:
            return {
                ...state,
                list: action.payload
            }
        case types.BUSCAR_REGION:
            return {
                ...state,
                ciudad: action.payload
            }
        default:
            return state
    }
}