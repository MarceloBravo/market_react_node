import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as loginTypes } from '../redux/Login/types'


export const getHeader = () => {
    let token = localStorage.getItem('gimAppMabc')
    return {'Content-Type':'application/json', 'Authorization':`Bearer ${token}`}
}

export const handlerError = (dispatch, error, msg) => {
    dispatch({type: spinnerTypes.HIDE_SPINNER})
    if(error.response?.data === 'Token no válido'){
        dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: 'Tu sessión ha finalizado. Ingresa nuevamenten a la aplicación.', tipo: 'danger'}})
        dispatch({type: loginTypes.LOGOUT})
    }else{                
        console.log(msg, error)
        dispatch({type: alertTypes.MOSTRAR_ALERTA, payload: {mensaje: error.message, tipo: 'danger' }})
    }
}


// Valida el rut con su cadena completa "XXXXXXXX-X"
export const validaRut = (rutCompleto) => {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
        return false;
    var tmp 	= rutCompleto.split('-');
    var digv	= tmp[1]; 
    var rut 	= tmp[0];
    // eslint-disable-next-line
    if ( digv == 'K' ) digv = 'k' ;
    // eslint-disable-next-line
    return (dv(rut) == digv );
}

const dv = (T) => {
    var M=0,S=1;
    for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
    return S?S-1:'k';
}


export const getHeaderFormData = () => {
    let token = localStorage.getItem('gimAppMabc')
    return {'Content-Type':'multipart/form-data', 'Authorization':`Bearer ${token}`}
}

export const isEmail = (val) => {
    // eslint-disable-next-line
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(val)
}

export const formatearPrecio = (neto, impuestos) => {
    let precio = parseInt(neto + (neto * impuestos / 100)).toLocaleString('de-DE', { style: 'currency', currency: 'CLP' } )
    return precio
 }

 export const validaPassword = (campo, nombreCampoPassword, pwd, nombreCampoConfirmarPassword, confirmPwd, errors, setErrors) =>{
    let valor = campo === 'password' ? pwd : confirmPwd;
    let fieldStr = campo === 'password' ? 'contraseña' : 'confirmación de contraseña';
    
    if(valor.length < 6){
        setErrors({...errors, [campo]: `La ${fieldStr} debe tener almenos 6 caráctreres. Ingresa una ${fieldStr} más larga.`})
    }else if(valor.length > 20){
        setErrors({...errors, [campo]: `La ${fieldStr} debe tener un máximo de 20 caráctreres. Ingresa una ${fieldStr} más corta.`})
    }else if(pwd !== confirmPwd){
        setErrors({...errors, [campo]: 'La contraseña y la confirmación de contraseña no coinciden.'})
    }else {
        if(
            (campo === nombreCampoConfirmarPassword && valor === confirmPwd) || 
            (campo === nombreCampoPassword && valor === pwd)
        ){
            setErrors({...errors, [nombreCampoPassword]: '', [nombreCampoConfirmarPassword]: ''})
        }else{
            setErrors({...errors, [campo]: ''})
        }  
    }
}

