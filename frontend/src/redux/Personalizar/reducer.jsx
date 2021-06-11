import { types } from './types'

const INITIAL_STATE = {
    config: {
        created_atp: '',
        id: 0,
        nombre_app: '',
        updated_at: ''
    },
    isOk: false
}

export const PersonalizarReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.GET_CUSTOM_CONFIG:
            return {
                ...state,
                config: action.payload.data,
                isOk: null
            }
        case types.SAVE_CUSTOM_CONFIG:
            return {
                ...state,
                config: action.payload.data,
                isOk: action.payload.isOk,
            }
            
        default:
            return state
    }
}

