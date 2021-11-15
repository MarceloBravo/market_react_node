import { types } from './types'

const INITIAL_STATE = {
    marca: {
        id: '',
        nombre: '',
        created_at: '',
        updated_at: '',
        deleted_at: '',
    },
    list: [],
    dataGrid: {
        data: [],
        rowsPerPage: 10,
        totRows: 0,
        page: '',
    }
}

export const MarcasReducer = (state = INITIAL_STATE,  action) => {
    switch(action.type){
        case types.LISTAR_MARCAS:
        case types.FILTRAR_MARCAS:
            return {
                ...state,
                dataGrid: action.payload.data
            }
        case types.BUSCAR_MARCA:
        case types.INSERTAR_MARCA:
        case types.ACTUALIZAR_MARCA:
            return {
                ...state,
                marca: action.payload.data
            }
        case types.ELIMINAR_MARCA:
        case types.NUEVA_MARCA:
            return {
                ...state,
                marca: INITIAL_STATE.marca
            }
        case types.GET_ALL_MARCAS:
            return {
                ...state,
                list: action.payload.data
            }
        default:
            return state
    }
}