/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { types as loginTypes } from '../../../redux/Login/types'
import { refreshToken, logout } from '../../../actions/login'
import { getTokenFromStorage } from '../../../shared/funciones'
import './style.css'

export const TimerSession = (props) => {
    const exp = useSelector(state => state.LoginReducer.logedUser.exp)
    
    const [ seconds, setSeconds ] = useState(()=>{
        if(exp){
            if(exp.toString().length < (new Date()).getTime()?.toString().length){
                return (exp - parseInt((new Date()).getTime().toString().substr(0,exp.toString().length)))+1
            }
            if(exp.toString().length > (new Date()).getTime()?.toString().length){
                return (parseInt(exp.toString().substr(0, (new Date()).getTime().toString().length)) - (new Date().getTime()))+1
            }
        
            return exp-(new Date()).getTime()+1
        }else{
            return (new Date()).getTime()
        }
    })
    
    const isLogout = useSelector(state => state.LoginReducer.isLogout)
    const refreshTokenState = useSelector(state => state.LoginReducer.logedUser.refreshToken)
    const accessTokenState = useSelector(state => state.LoginReducer.logedUser.accessToken)
    const tryRestartSession = useSelector(state => state.LoginReducer.tryRestartSession)
    const [ showTimer, setShowTimer ] = useState(false) 
    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(()=>{
        setShowTimer(localStorage.getItem('backTkn'))
    },[showTimer])

    
    useEffect(()=>{
        if(seconds !== null && seconds > 0 && exp){
            let restaSeg = restaSegundos((new Date()).getTime())
            const interval = setInterval(()=> setSeconds(restaSeg), 1000)
            return ()=>clearInterval(interval)
        }
        // eslint-disable-next-line
    },[exp, seconds])
    


    useEffect(()=>{
        if(seconds !== null && seconds <= 0){
            if(localStorage.getItem('backRefreshTkn')){
                //extender sesssion
                dispatch(refreshToken(localStorage.getItem('backRefreshTkn')))
                localStorage.removeItem('backRefreshTkn')
            }else{
                dispatch(logout(getTokenFromStorage()))
                //dispatch({type: loginTypes.LOGOUT})
            }
        }
    },[seconds, history,dispatch])

    

    useEffect(()=>{
        if(tryRestartSession && localStorage.getItem('backRefreshTkn')){
            dispatch(refreshToken(localStorage.getItem('backRefreshTkn')))
            localStorage.removeItem('backRefreshTkn')
        }
    },[tryRestartSession, dispatch])


    
    useEffect(()=>{
        //Evalua si el usuario finalizó la sesión para redirigirlo a la pantalla de login
        if(isLogout){
            //Borrando los tokens
            if(sessionStorage.getItem('backTkn')){
                sessionStorage.removeItem('backTkn')
            }
            if(localStorage.getItem('backTkn')){
                localStorage.removeItem('backTkn')
            }
            if(localStorage.getItem('backRefreshTkn')){
                localStorage.removeItem('backRefreshTkn')
            }
            sessionStorage.removeItem('secs')
            history.push('/')
        }
    // eslint-disable-next-line
    },[isLogout, history, dispatch])


    useEffect(()=>{
        //Actualizando los tokens en el almacenamiento local luego de recibir los nuevos token 
        //para extender el tiempo de la sesión
        if(accessTokenState && refreshTokenState){
            localStorage.setItem('backRefreshTkn',refreshTokenState)
            localStorage.setItem('backTkn',accessTokenState)
            let obj = JSON.parse(atob(accessTokenState.split('.')[1]))
            dispatch({type: loginTypes.IDENTIFICAR_USUARIO, payload: 
            {
                user: obj.user,
                access_token: accessTokenState,
                refresh_token: refreshTokenState ? refreshTokenState : null,
                expires_in: obj.exp,
                roles: obj.roles,
            }})
        }
    },[accessTokenState, dispatch, refreshTokenState])


    useEffect(()=>{
        if(exp){
            if(exp.toString().length < (new Date()).getTime()?.toString().length){
                setSeconds((exp - parseInt((new Date()).getTime().toString().substr(0,exp.toString().length)))+1)
            }else if(exp.toString().length > (new Date()).getTime()?.toString().length){
                setSeconds((parseInt(exp.toString().substr(0, (new Date()).getTime().toString().length)) - (new Date().getTime()))+1)
            }else{        
                setSeconds( exp-(new Date()).getTime()+1)
            }
        }
        
    },[exp])


    const restaSegundos = (now) => {
        const sec1 = exp.toString().length
        const sec2 = now.toString().length
        if(sec1 < sec2){
            return (exp - parseInt(now.toString().substr(0,sec1)))
        }
        if(sec1 > sec2){
            return (parseInt(exp.toString().substr(0, sec2)) - now)
        }
        return exp-now
    }

    
   
    return (
        <>
        {!showTimer && 
            <div className="session-info">
                <label className="session-info-label">La sessión expira en {(new Date(seconds * 1000)).toISOString().substr(11, 8)} segs.</label>
            </div>        
        }
        </>
    )
}
