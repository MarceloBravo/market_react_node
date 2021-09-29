import { types } from './types';

const INITIAL_STATE = {
    logedUser: {
        user: null,
        accessToken: '',
        refreshToken: '',
        expiresIn: 0,
        expired: false,
        roles:[],
        exp: 0,
        iat: 0,
        rememberMe: false,
    },
    isLogout: false,
    tryRestartSession: false,
}


export const LoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.IDENTIFICAR_USUARIO:
            let tokenArr = action.payload.access_token.split(".")
            return {
                ...state,
                logedUser: {
                    user: action.payload.user,
                    accessToken: action.payload.access_token,
                    refreshToken: action.payload.refresh_token,
                    expiresIn: action.payload.expires_in,
                    roles: action.payload.roles,
                    exp: JSON.parse(atob(tokenArr[1])).exp,
                    iat: JSON.parse(atob(tokenArr[1])).iat,
                    rememberMe: action.payload.remember,
                },
                isLogout: false,
                tryRestartSession: false,
            }
        case types.REFRESH_TOKEN:
            if(action.payload.user.id === state.logedUser.user.id){
                let tokenArr = action.payload.access_token.split(".")
                return {
                    ...state, 
                    logedUser: {
                        user: action.payload.user,
                        accessToken: action.payload.access_token,
                        refreshToken: action.payload.refresh_token,
                        expiresIn: action.payload.expires_in,
                        roles: action.payload.roles,
                        exp: JSON.parse(atob(tokenArr[1])).exp,
                        iat: JSON.parse(atob(tokenArr[1])).iat,
                        rememberMe: action.payload.remember,
                    },
                    isLogout: false,
                    tryRestartSession: false,
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
        case types.TRY_RESTART_SESSION:
            return {
                ...state,
                isLogout: false,
                tryRestartSession: true,
            }
        case types.LOGOUT:
            return {
                ...state,
                logedUser: INITIAL_STATE.logedUser,
                isLogout: true,
                tryRestartSession: false,
            }
        default:
            return state
    }
}

export default LoginReducer;