import { types } from './types'

const INITIAL_STATE = {
    orden: {
        venta_id: null,
        direccion: null,
        region: null,
        provincia: null,
        comuna: null,
        ciudad: null,
        casa_num: null,
        block_num: null,
        referencia: null,
        shipping_cod: null,
        compania_envio: null,
        estado_id: null,
        created_at: null,
        updated_at: null,
        productos: []
    }
}

export const OrdenesCompraReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.BUSCAR_NUMERO_ORDEN:
            return {
                ...state,
                orden: action.payload
            }
        default:
            return state
    }
}