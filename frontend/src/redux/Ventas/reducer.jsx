import { types } from './types'

const INITIAL_STATE = {
    datosVenta: {
        id: null,
        total: null, 
        cliente_id: null,  //Sólo si el cliente que efectuó la compra ya se encuentra registrado en la tienda
        datos_cliente_sin_registrar: null,    //Solo si el cliente que efectuó la compra no se encuentra registrado como cliente de la tienda
        detalle_venta: [], //Array con los productos como ojeto JSON
        despacho: null,   //Datos de la dirección de despacho
        datos_webpay: null    //Objeto debuelto por webpay
    }
}

export const VentasReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.SET_DATOS_VENTA:
            return {
                ...state,
                datosVenta: action.payload
            }
        case types.GET_DATOS_VENTA:
        default:
            return state
    }
}