import { types } from './types'

const INITIAL_STATE = {
    showSpinner: false
}

export const SpinnerReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.SHOW_SPINNER:
            return {
                ...state,
                showSpinner: true,
            }
        case types.HIDE_SPINNER:
            return {
                ...state,
                showSpinner: false,
            }
        default:
            return state
    }
}