import { types } from './types'

const INITIAL_STATE = {
    show: false,
    titulo: '',
    mensaje: '',
}

export const ModalDialogReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case types.SHOW_MODAL_DIALOG:
            return {
                ...state,
                show: true,
                titulo: action.payload.titulo,
                mensaje: action.payload.mensaje
            }
        case types.HIDE_MODAL_DIALOG:
            return {
                ...state,
                show: false,
                titulo: '',
                mensaje: ''
            }
        default:
            return state
    }
}