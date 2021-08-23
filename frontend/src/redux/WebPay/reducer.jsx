import { types } from "./types";

const INITIAL_STATE = {
    estado_transaccion: {}
}

export const WebPayReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.WEBPAY_INICIAR_TRANSACCION:  
        case types.WEBPAY_CONCRETAR_PAGO:       
        case types.WEBPAY_CONSULTAR_STATUS:
            return {
                ...state,
                estado_transaccion: action.payload
            }
        default:
            return state
    }
}