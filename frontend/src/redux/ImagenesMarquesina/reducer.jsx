import { types } from './types'

const INITIAL_STATE = {
    imagenes: [],
    objImage: []
}

export const ImagenesMarquesinaReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.GET_IMAGES_MARQUESINA:
        case types.SAVE_IMAGES_MARQUESINA:
            return {
                ...state,
                imagenes: action.payload.imagenes,
                objImage: action.payload.objImage
            }
        default:
            return state
    }
}