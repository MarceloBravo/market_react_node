import { types } from './types'

const INITIAL_STATE = {
    tipoPago: {},
    list: [],
    dataGrid: {
        data: [],
        rowsPerPage: 10,
        page: 0,
        totRows: 0
    },
}

export const TiposPagoReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){
        case types.TIPOS_PAGO_LISTAR:
        case types.TIPOS_PAGO_FILTRAR:
            return {
                ...state,
                dataGrid: action.payload
            }
        case types.TIPOS_PAGO_BUSCAR:
        case types.TIPOS_PAGO_INSERTAR:
        case types.TIPOS_PAGO_ACTUALIZAR:
            return {
                ...state,
                tipoPago: action.payload
            }
        case types.TIPOS_PAGO_GET_ALL:
            return {
                ...state,
                list: action.payload.data
            }
        case types.TIPOS_PAGO_ELIMINAR:
        case types.TIPOS_PAGO_NUEVO:
            return {
                ...state, 
                state: INITIAL_STATE
            }
        default:
            return state
    }
}