import { types as alertTypes } from '../redux/Alert/types'
import { types as spinnerTypes } from '../redux/Spinner/types'
import { types as loginTypes } from '../redux/Login/types'


export const getHeader = () => {
    let token = localStorage.getItem('backTkn')
    if(!token){
        token = sessionStorage.getItem('backTkn')
    }
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


 export const formatearNumero = (valor) => {
     if(!isNaN(valor)){
        let strPrecio = valor.toLocaleString('de-DE', { style: 'currency', currency: 'CLP' } )
        return strPrecio.substring(0, strPrecio.length - 4)
     }else{
         return "0"
     }
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

export const formatearFechaHora = (strFecha) => {
    if(!strFecha)return ''
    let fecha = strFecha.substring(0,10).split('-').reverse().join('-')
    let hora = strFecha.split('T')[1].substring(0,8)
    return fecha + ' ' + hora
}


export const generateHtmlPDF = (nombre_tienda, data, carrito) => {
    const element = `
        <html>
            <body>
                ${bodyPDF(nombre_tienda, data, carrito)}
            </body>
        </html>`

        return element
}


export const bodyPDF = (nombre_tienda, data, carrito) => {
    return `<div style="display: table; width: 100%;">
                <div style="display: table-cell; ">
                    <div style="font-size: 30px;">${nombre_tienda}</div>
                    <div>Descripción del giro</div>
                    <div>Fecha ${formatearFechaHora(data.transaction_date)}</div>
                    <div>N° Trajeta ${data.card_detail.card_number}</div>
                    <div>Cód de autorización ${data.authorization_code}</div>
                    <div>Forma de pago ${data.nombre}</div>
                </div>
                <div style="display: table-cell; position: absolute; width: 34%; right: 0px; top: 0px;">
                    <div style="border-style: solid; border-color: red; border-width: 5px; height: 100px; text-align: center; ">
                        <div style="top: 32%; width: 100%; color: red; font-size: 20; line-height: 3em; position: relative">Orden de Compra</div>
                        <div style="top: 32%; width: 100%; color: red; font-size: 20; line-height: 3em; position: relative">N°000000${data.buy_order}</div>
                    </div>
                </div>
            </div>
            <div style="height: 20px;">
            </div>
    
            <table style="width: 100%; border-style: solid; border-width: .5px; border-color: black;">
                <thead>
                    <tr>
                        <th >Producto</th>
                        <th style="width: 70px; text-align: right;">Cantidad</th>
                        <th style="width: 70px; text-align: right;">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.keys(carrito).map((item, key) => {
                        return  `<tr key={key}>
                                    <td>${carrito[item].nombre}</td>
                                    <td style="width: 70px; text-align: right;">${carrito[item].cantidad}</td>
                                    <td style="width: 70px; text-align: right;">${carrito[item].str_precio}</td>
                                </tr>`
                    })}
                    <tr>
                        <td></td>
                        <td style="text-align: right;">Impuestos</td>
                        <td style="width: 70px; text-align: right;">
                            $ ${formatearNumero(data.impuestos)}
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style="text-align: right;">Despacho</td>
                        <td style="width: 70px; text-align: right;">
                            $ ${formatearNumero(0)}
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style="text-align: right;">Total</td>
                        <td style="width: 70px; text-align: right;">
                            $  ${formatearNumero(data?.amount ? data.amount : 0)}
                        </td>
                    </tr>
                </tbody>
            </table>`
        }