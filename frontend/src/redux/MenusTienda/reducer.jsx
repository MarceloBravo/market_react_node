import { types } from './types'

const INITIAL_STATE = { 
    menu: {
        id: null,
        nombre: '',
        url: '',
        menu_padre: '',
        menu_padre_id: null,
        posicion: 0,
        created_at: null,
        updated_at: null,
        deleted_at: null
    },
    dataGrid: {
            data: [],
            rowsPerPage: 10,
            page: 0,
            totRows: 0
    },
    list: [],   //Contiene los menús que se mostrarán en los listados existentes en los formularios de la aplicación
    displayedMenus: [], //Contiene el listado de Menús que se mostrarán cómo menú principal de la de la tienda
}

export const MenusTiendaReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LISTAR_MENUS_TIENDA:
        case types.FILTRAR_MENUS_TIENDA:       
            return {
                ...state,
                dataGrid: action.payload.data
            }
        case types.FIND_MENU_TIENDA:        
            return {
                ...state,
                menu: action.payload.data
            }
        case types.INSERT_MENU_TIENDA:
        case types.UPDATE_MENU_TIENDA:
        case types.DELETE_MENU_TIENDA:
            return {
                ...state,
                state: INITIAL_STATE
            }
        case types.GET_ALL_MENUS_TIENDA:
            return {
                ...state,
                list: action.payload.data,
            }
        case types.GET_MAIN_MENU_TIENDA:
            return {
                ...state,
                displayedMenus: action.payload,
            }
        default:
            return state;
    }
}