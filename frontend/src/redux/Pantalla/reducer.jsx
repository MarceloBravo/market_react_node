import { types } from './types';

const INITIAL_STATE = {
    pantalla: {
        id: null,
        nombre: '',
        menus_id: null,
        permite_crear: false,
        permite_modificar: false,
        permite_eliminar: false,
        created_at: null,
        updated_at: null,
        deleted_at: null,
    },
    list: []
}

export const PantallasReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.FIND_PANTALLA:
            return {
                ...state,
                pantalla: action.payload.data,
            }
        case types.INSERT_PANTALLA:
        case types.UPDATE_PANTALLA:
        case types.DELETE_PANTALLA:
            return {
                ...state,
                state: INITIAL_STATE,
            }
        case types.GET_ALL_PANTALLAS:
            return {
                ...state,
                list: action.payload.data,
            }
        default:
            return state;
    }
}