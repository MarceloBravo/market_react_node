import { types }  from './types'

const INITIAL_STATE = {
    infoTienda: {
        nombre_tienda: '',
        fono_venta: 0,
        email: '',
        direccion: '',
    }
}

export const InfoTiendaReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.SHOW_SHOP_INFO:
            return {
                ...state,
                infoTienda: action.payload.data
            }
        case types.UPDATE_SHOP_INFO:
            return {
                ...state,
                infoTienda: action.payload.data
            }
        default:
            return state
    }
}