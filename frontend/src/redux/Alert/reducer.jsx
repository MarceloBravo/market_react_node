import { types } from './types'

const INITIAL_STATE = {
    show: false,
    mensaje: 'Mensaje de prueba',
    tipo: 'warning'
}

export const AlertaReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.MOSTRAR_ALERTA:
            return {
                ...state,
                show: true,
                mensaje: action.payload.mensaje,
                tipo: action.payload.tipo,
            }
        case types.OCULTAR_ALERTA:
            return {
                ...state,
                show: false,
                mensaje: '',
                tipo: ''
            }
        default:
            return state
    }
}