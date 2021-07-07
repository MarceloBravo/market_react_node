/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { types as loginTypes } from '../../../redux/Login/types'
import './style.css'

export const TimerSession = (props) => {
    const exp = useSelector(state => state.LoginReducer.logedUser.exp)
    
    const [ seconds, setSeconds ] = useState(()=>{
        if(exp.toString().length < (new Date()).getTime().toString().length){
            return (exp - parseInt((new Date()).getTime().toString().substr(0,exp.toString().length)))+1
        }
        if(exp.toString().length > (new Date()).getTime().toString().length){
            return (parseInt(exp.toString().substr(0, (new Date()).getTime().toString().length)) - (new Date().getTime()))+1
        }
        return exp-(new Date()).getTime()+1
    })
    
    const isLogout = useSelector(state => state.LoginReducer.isLogout)
    const history = useHistory()
    const dispatch = useDispatch()


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
            dispatch({type: loginTypes.LOGOUT})
        }
    },[seconds, history,dispatch])

    
    useEffect(()=>{
        //Evalua si el usuario finalizó la sesión para redirigirlo a la pantalla de login
        if(isLogout){
            if(sessionStorage.getItem('gimAppMabc')){
                sessionStorage.removeItem('gimAppMabc')
            }
            if(localStorage.getItem('gimAppMabc')){
                localStorage.removeItem('gimAppMabc')
            }
            sessionStorage.removeItem('secs')
            history.push('/home')
        }
    },[isLogout, history])


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
            <label className="session-info">La sessión expira en {(new Date(seconds * 1000)).toISOString().substr(11, 8)} segs.</label>
        </>        
    )
}
