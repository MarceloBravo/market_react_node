import { types } from './types'

const INITIAL_STATE = {
    dataGrid: {
        data: [],
        rowsPerPage: 10,
        page: 0,
        totRows: 0
    },
    list: [],
}

export const PreciosReducer = (state = INITIAL_STATE, action) => {

    switch(action.type){
        case types.PRECIOS_GET_PAGE:
        case types.PRECIOS_FILTER:
        case types.PRECIOS_SAVE:
            return {
                ...state,
                dataGrid: action.payload.data
            }
        case types.PRECIOS_GET_ALL:
            return {
                ...state,
                list: action.payload.data
            }
        case types.PRECIOS_ADD_NEW:
            return {
                ...state,
                "dataGrid.data": state.dataGrid.data.push(action.payload.data)
            }
        default:
            return state
    }
}