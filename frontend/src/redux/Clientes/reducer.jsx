import { types } from './types'

const INITIAL_STATE = {
    cliente: {
        id: null,
        rut: '',
        nombres: '',
        apellido1: '',
        apellido2: '',
        direccion: '',
        cod_region: '',
        cod_provincia: '',
        cod_comuna: '',
        ciudad: '',
        password: '',
        confirm_password: '',
        email: '',
        fono: '',
        foto: '',
        casa_num: '',
        block_num: '',
        referencia: '',
        created_at: '',
        updated_at: '',
        deleted_at: null
    },
    token: '',
    exp: '',
    iat: '',
    LIST: [],
    dataGrid: {
        data: [],
        rowsPerPage: 10,
        totRows: 0,
        page: '',
    }
}

export const ClientesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.LISTAR_CLIENTES:
        case types.FILTRAR_CLIENTES:
            return {
                ...state,
                dataGrid: action.payload
            }
        case types.BUSCAR_CLIENTES:
        case types.INSERTAR_CLIENTES:
        case types.ACTUALIZAR_CLIENTES:
            return {
                ...state,
                cliente: action.payload
            }
        case types.ELIMINAR_CLIENTES:
        case types.ELIMINAR_REGISTRO_CLIENTES:
            return {
                ...state,
                cliente: INITIAL_STATE.cliente,
                list: INITIAL_STATE.list,
                dataGrid: INITIAL_STATE.dataGrid,
            }
        case types.GET_ALL_CLIENTES:
            return {
                ...state,
                list: action.payload,
            }
        case types.LOGIN_CLIENTE:
            let tokenArr = action.payload.split(".")
            return {
                ...state,
                cliente: JSON.parse(atob(tokenArr[1])).user,
                exp: JSON.parse(atob(tokenArr[1])).exp,
                iat: JSON.parse(atob(tokenArr[1])).iat,
                token: action.payload
            }
        case types.CERRAR_SESSION_CLIENTE:
            return {
                ...state,
                token: ''
            }
        default:
            return state
    }
}