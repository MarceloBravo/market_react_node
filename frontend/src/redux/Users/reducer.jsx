/* eslint-disable no-undef */
import { types } from './types'

const INITIAL_STATE = {
    user: {
        name: '',
        email: '',
        password: '',
        a_paterno: '',
        a_materno: '',
        fono: '',
        foto : '',
        objImagen: '',
        direccion:'',
        confirmPassword: '',
        roles: [],
        roles_id: [],
    },
    dataGrid: {
        data: [],
        rowsPerPage: 10,
        page: 0,
        totRows: 0
    },
    list: [],
}


export const UsersReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.LISTAR_USUARIOS:
        case types.FILTRAR_USUARIOS:
            return {
                ...state,
                dataGrid: action.payload.data
            }
        case types.BUSCAR_USUARIO:
            return {
                ...state,
                user: Object.keys(action.payload.data).length > 2 ? action.payload.data : INITIAL_STATE.user,
            }
        case types.INSERTAR_USUARIO:
        case types.ACTUALIZAR_USUARIO:
        case types.ELIMINAR_USUARIO:
        case types.NUEVO_USUARIO:
            return {
                ...state,
                user: INITIAL_STATE.user,
            }
        case types.GET_ALL_USERS:
            return {
                ...state,
                list: action.payload.data,
            }
        default:
            return state
    }
}