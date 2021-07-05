import { types } from './types'

const INITIAL_STATE = {
    impuesto: {
        nombre: '',
        sigla: '',
        porcentaje: 0,
        created_at: '',
        updated_at: '',
        deleted_at: ''
    },
    list: [],
    dataGrid: {
        data: [],
        rowsPerPage: 10,
        page: 0,
        totRows: 0
    }
}

export const ImpuestosReducer = (state = INITIAL_STATE,  action) => {
    switch(action.type){
        case types.LISTAR_IMPUESTOS:
        case types.FILTRAR_IMPUESTOS:
            return {
                ...state,
                dataGrid: action.payload.data
            }
        case types.BUSCAR_IMPUESTOS:
        case types.INSERTAR_IMPUESTOS:
        case types.ACTUALIZAR_IMPUESTOS:
            return {
                ...state,
                impuesto: action.payload.data
            }
        case types.ELIMINAR_IMPUESTOS:
            return {
                ...state, 
                state: INITIAL_STATE.impuesto
            }

        case types.GET_ALL_IMPUESTOS:
            return {
                ...state,
                list: action.payload.data
            }
        default:
            return state
    }
}