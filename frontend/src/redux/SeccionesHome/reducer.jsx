import { types } from './types'

const INITIAL_STATE = {
    secciones: {
        id: -1,
        nombre: '',
        productos: []
    },
    dataGrid: {
        data: [],
        page: 0,
        totRows: 0,
        rowsPerPage: 10
    },
    list: []
}

export const SeccionesHomeReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.GET_PAGE_SECCIONES_HOME:        
        case types.FILTER_SECCIONES_HOME:
            return {
                ...state,
                dataGrid: action.payload.data
            }
        case types.GET_ALL_SECCIONES_HOME:
            return {
                ...state,
                list: action.payload.data
            }
        case types.FIND_SECCIONES_HOME:
        case types.INSERT_SECCIONES_HOME:
        case types.UPDATE_SECCIONES_HOME:
            return {
                ...state,
                secciones: action.payload.data
            }
        case types.DELETE_SECCIONES_HOME:
        case types.NEW_SECCIONES_HOME:
            return {
                ...state,
                secciones: {}
            }
        default:
            return state
    }
}