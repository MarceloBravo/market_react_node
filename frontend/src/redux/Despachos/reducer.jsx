import { types } from './types'

const INITIAL_STATE = {
    despacho: {},
    list:[],
}

export const DespachosReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){
        case types.LISTAR_DESPACHOS:
        case types.FILTRAR_DESPACHOS:
            return {
                ...state,
                list: action.payload
            }        
        case types.ACTUALIZAR_DESPACHO:
            return {
                ...state,
                despacho: action.payload
            }
        case types.CAMBIAR_ESTADO_DESPACHO:
            return {
                ...state,
                "despacho.estado_id": action.payload
            }
        default:
            return state
    }
}
