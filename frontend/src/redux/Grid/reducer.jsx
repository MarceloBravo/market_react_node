import { types } from './types'

const INITIAL_STATE = {
    data: [],
    rowsPerPage: 10,
    page: 0,
    totRows: 0
}

export const GridReducer = (state = INITIAL_STATE, action) => {
    let data
    switch (action.type) {        
        case (types.GET_DATA):
        case types.GET_FILTER_DATA:
            data = action.payload.data
            return {
                ...state,
                data: data.data,
                rowsPerPage: data.rowsPerPage,
                page: data.page,
                totRows: data.rows
            }
        case types.PAGINA_ANTERIOR:
        case types.SIGUIENTE_PAGINA:
        case types.PRIMERA_PAGINA:
        case types.ULTIMA_PAGINA:
            data = action.payload.data
            return {
                ...state,
                data: data.data,
                page: data.page
            }
        case types.GET_ALL:
            return {
                ...state,
                data: action.payload.data,
            }
        
        default:
            return state
    }
}