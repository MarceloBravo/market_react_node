
import { useState, useEffect } from 'react'
import { isEmail } from '../../../shared/funciones'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { types as alertasTypes } from '../../../redux/Alert/types'
import { loginCliente } from '../../../actions/clientes'
import { getData } from '../../../actions/infoTienda'
import { LoginClientContent } from './content'


export const LoginClienteComponent = (props) => {
    const { alingJson, destino, cssClass } = props  //Todos los paramentros son opcionales 
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)
    const [ credenciales, setCredenciales ] = useState({email: '', password: ''})
    const [ errors, setErrors ] = useState({email: '', password: ''})
    const [ rememberMe, setRememberMe ] = useState(false)
    const [ prefijo, setPrefijo ] = useState('tienda')
    const tokenState = useSelector(state => state.ClientesReducer.token)
    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch({type: alertasTypes.OCULTAR_ALERTA})
        dispatch(getData())
    },[dispatch])


    useEffect(()=>{
        if(tokenState){
            if(rememberMe){
                localStorage.setItem( prefijo + '-cliente', JSON.stringify(tokenState))
            }else{
                sessionStorage.setItem(prefijo + '-cliente', JSON.stringify(tokenState))
            }
            history.push(destino ? destino : '/')
        }
        // eslint-disable-next-line
    },[tokenState])

    
    useEffect(()=>{
        if(infoTiendaState){
            setPrefijo(infoTiendaState.nombre_tienda)
        }
    },[infoTiendaState])

    
    const handlerInput = (e) => {
        validaDatos(e.target.name, e.target.value)
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }

    const focusInput = () => {
        dispatch({type: alertasTypes.OCULTAR_ALERTA})
    }

    const changeRememberMeHandler = (e) => {
        setRememberMe(e.target.checked);
    }


    const validaDatos = (field, value) => {
        if(field === 'email'){
            if(value.length === 0){setErrors({...errors, [field]: 'Debes ingresar tu email.'})}
            else if(!isEmail(value)){setErrors({...errors, [field]: 'El correo electrónico no es válido'})}
            else{
                setErrors({...errors, [field]: ''})
            }
        }else if(field === 'password'){ 
            if(value.length === 0){setErrors({...errors, [field]: 'Debes ingresar tu contraseña.'})}
            else if(value.length > 20){setErrors({...errors, [field]: 'La contraseña ingresada es demasiado larga'})}
            else{
                setErrors({...errors, [field]: ''})
            }
        }else{
            setErrors({...errors, [field]: ''})
        }
    }


    const login = () => {
        dispatch(loginCliente(credenciales.email, credenciales.password))
    }


    const registrarUsuario = () => {
        history.push('/registroCliente')
    }

    
    return (
        <LoginClientContent 
            handlerInput={handlerInput} 
            errors={errors} 
            registrarUsuario={registrarUsuario} 
            login={login} 
            rememberMe={rememberMe} 
            changeRememberMeHandler={changeRememberMeHandler}
            alingJson={alingJson}
            cssClass={cssClass}
            focusInput={focusInput}
        />
    )
}