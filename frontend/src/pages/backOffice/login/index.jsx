import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../actions/login';
import { Redirect } from 'react-router-dom';
import { Content } from './content';
import { find } from '../../../actions/personalizar'
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
    

    useEffect(() => {
        //Si al cargar la pantalla de login ya existe un token, éste se elimina desde el storage y se 
        //reemplaza por el nuevo token 
        if (logedUser.accessToken) {    
            setRedirect(true);
            if (rememberMe) {
                localStorage.removeItem('gimAppMabc')
                sessionStorage.setItem('gimAppMabc', logedUser.accessToken)
            } else {
                localStorage.setItem('gimAppMabc', logedUser.accessToken)
                sessionStorage.removeItem('gimAppMabc')
            }
        }else{
            setRedirect(false)
        }
    }, [logedUser,rememberMe])


    
    

    useEffect(()=>{
        if(errorState.show && errorState.mensaje){
            setLoginError(errorState.mensaje)   //Recuperando el error en caso de que la identificación del usuario no pudo ser realizada con exito
        }
    },[errorState])


    useEffect(() => {
        if (sessionStorage.getItem("gimAppMabc") !== null) {
            setRedirect(true);        
        }    
    },[])


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
        setCredentials({ email: e.target.value, password: credentials.password })
    }

    const changePasswordHandler = (e) => {
        validaPassword(e.target.value)
        setCredentials({ email: credentials.email, password: e.target.value })
    }

    const changeRememberMeHandler = (e) => {
        setRememberMe(e.target.checked);
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