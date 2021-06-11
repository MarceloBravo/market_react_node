import { types } from './types';

const INITIAL_STATE = {
    logedUser: {
        user: null,
        accessToken: '',
        expiresIn: 0,
        expired: false,
        roles:[],
    },
    isLogout: false,
    
}


export const LoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.IDENTIFICAR_USUARIO:
            return {
                ...state,
                logedUser: {
                    user: action.payload.user,
                    accessToken: action.payload.access_token,
                    expires: action.payload.expires_in,
                    roles: action.payload.roles,
                },
                isLogout: false,
            }
        case types.REFRESH_USER_DATA:
            if(action.payload.user.id === state.logedUser.user.id){
                return {
                    ...state, 
                    logedUser: {
                        user: action.payload.user,
                        accessToken: state.logedUser.accessToken,
                        expires: state.logedUser.expires,
                        roles: state.logedUser.roles
                    }
                }
            }else{
                return state
            }
        case types.SET_TOKEN:
            return {
                ...state,
                logedUser: {
                    accessToken: action.token
                }
            }
        case types.GET_TOKEN:
            return state.logedUser.accessToken
        case types.LOGOUT:
            return {
                ...state,
                logedUser: INITIAL_STATE,
                isLogout: true,
            }
        default:
            return state
    }
}

export default LoginReducer;