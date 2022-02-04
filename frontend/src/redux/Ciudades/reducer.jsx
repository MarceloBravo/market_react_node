import { types } from './types'

const INITIAL_STATE = {
    ciudad: {
        id: '',
        cod_region: '',
        cod_provincia: '',
        cod_comuna: '',
        nombre: '',
        created_at: '',
        updated_at: '',
        deleted_at: ''
    },
    list: [],
    dataGrid: {
        data: [],
        rowsPerPage: 10,
        rows: 0,
        page: 0
    }
}

export const CiudadesReducer = (state = INITIAL_STATE, action) => {
    switch(action.state){
        case types.LISTAR_CIUDADES:
        case types.TRAER_TODAS_CIUDADES:
        case types.TRAER_TODAS_POR_COMUNA_CIUDADES:
        case types.FILTRAR_CIUDADES:
            return {
                ...state,
                list: action.payload.data
            }
        case types.INSERTAR_CIUDADES:
        case types.ACTUALIZAR_CIUDADES:
            return {
                ...state,
                ciudad: action.payload.data
            }
        case types.ELIMINAR_CIUDADES:
            return {
                ...state,
                ciudad: INITIAL_STATE.ciudad
            }
        default:
            return state
    }
    
}