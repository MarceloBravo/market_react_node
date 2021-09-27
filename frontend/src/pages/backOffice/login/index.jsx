import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../actions/login';
import { Redirect } from 'react-router-dom';
import { Content } from './content';
import { find } from '../../../actions/personalizar'
import { types as loginTypes } from '../../../redux/Login/types'
import './style.css';

export const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({password: null, contrasena: null})
    const dispatch = useDispatch()
    const logedUser = useSelector(state => state.LoginReducer.logedUser)
    const [ redirect, setRedirect ] = useState(false)
    const [ loginError, setLoginError ] = useState(false)
    const errorState = useSelector(state => state.AlertaReducer)
    const nombre_app = useSelector(state => state.PersonalizarReducer.config.nombre_app)  
    const [ token, setToken ] = useState(null)
    

    useEffect(() => {
        //Si al cargar la pantalla de login ya existe un token, éste se elimina desde el storage y se 
        //reemplaza por el nuevo token 
        if (logedUser.accessToken) {    
            setRedirect(true);
            if (rememberMe) {
                sessionStorage.removeItem('backTkn')
                localStorage.setItem('backTkn', logedUser.accessToken)
                localStorage.setItem('backRefreshTkn', logedUser.refreshToken)
            } else {
                sessionStorage.setItem('backTkn', logedUser.accessToken)
                localStorage.removeItem('backTkn')
                localStorage.removeItem('backRefreshTkn')
            }
        }else{
            setRedirect(false)
        }
    }, [logedUser, rememberMe])


    
    

    useEffect(()=>{
        if(errorState.show && errorState.mensaje){
            setLoginError(errorState.mensaje)   //Recuperando el error en caso de que la identificación del usuario no pudo ser realizada con exito
        }
    },[errorState])


    useEffect(() => {
        if (localStorage.getItem("backTkn") !== null) {
            setToken(localStorage.getItem("backTkn"))
            setRememberMe(true)
        }    
    },[])


    useEffect(()=>{
        if(token){
            let obj = JSON.parse(atob(token.split('.')[1]))
            dispatch({type: loginTypes.IDENTIFICAR_USUARIO, payload: 
            {
                user: obj.user,
                access_token: token,
                refresh_token: localStorage.getItem("backRefreshTkn") ? localStorage.getItem("backRefreshTkn") : null,
                expires_in: obj.exp,
                roles: obj.roles,
            }})
            setRedirect(true);        
        }
    },[dispatch, token])


    useEffect(()=>{
        dispatch(find())
    },[dispatch])

    
    useEffect(()=>{
        document.title = nombre_app
    },[nombre_app])

    const sendLogin = () => {
        dispatch(login(credentials))
    }

    const changeEmailHandler = (e) => {
        validaEmail(e.target.value)
        setCredentials({...credentials, email: e.target.value})
    }

    const changePasswordHandler = (e) => {
        validaPassword(e.target.value)
        setCredentials({...credentials, password: e.target.value})
    }

    const changeRememberMeHandler = (e) => {
        setRememberMe(e.target.checked);
        setCredentials({...credentials, remember: e.target.checked })
    }

    /* ---------  Validaciones ------------ */
    const validaEmail = (email = '') => {
        let pos1 = email.indexOf('@')
        let pos2 = email.substr(pos1).indexOf('.')
        
        setErrors({email: validar(pos1, pos2) ? 'El email ingresado no es válido.' : null,password: errors.password});

        function validar(pos1, pos2) {
            return !(pos1 > 0 && pos2 > 0 && pos2 < (email.substr(pos1).length - 1))
        }
    }
    

    const validaPassword = (pwd = '') => {
        setErrors({ email: errors.email, password: (pwd.length === 0) ? 'Debe ingresar la contraseña.' : null})
    }
    /* ---------  /Validaciones ------------ */

    if (redirect && logedUser.accessToken) {
        return (<Redirect to="/Home"/>)
    }
     
    return (
        <Content
            credentials={credentials}
            changeEmailHandler={changeEmailHandler}
            errors={errors}
            changePasswordHandler={changePasswordHandler}
            rememberMe={rememberMe}
            changeRememberMeHandler={changeRememberMeHandler}
            sendLogin={sendLogin} 
            loginError={loginError} 
            nombre_app={nombre_app}
        />
    );
}