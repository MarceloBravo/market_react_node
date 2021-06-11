//Estas funciones son compartidas por el mantenedor de usuarios y el formulario de Perfil de Usuario

export  const validaDatos = (campo, valor, usuario, setErrors, errors) => {
    let res = false;
    if(['roles_id','roles','id'].includes(campo))return
    if(valor === null)valor = ''
    valor = valor.trim()
    switch(campo){
        case 'name':
            if(valor.length === 0){
                setErrors({...errors, [campo]: 'El nombre del usuario es obligatorio.'})
            }else if(valor.length < 3){
                setErrors({...errors, [campo]: 'El nombre debe tener almenos 3 caráctreres. Ingresa un nombre más largo.'})
            }else if(valor.length > 50){
                setErrors({...errors, [campo]: 'El nombre debe tener hasta 50 caráctreres. Ingresa un nombre más corto.'})
            }else{
                setErrors({...errors, [campo]: ''})
                res = true
            }
            break;
        case 'apellido1':
            if(valor.length === 0){
                setErrors({...errors, [campo]: 'El apellido 1 es obligatorio.'})
            }else if(valor.length < 3){
                setErrors({...errors, [campo]: 'El apellido 1 debe tener almenos 3 caráctreres. Ingresa un apellido más largo.'})
            }else if(valor.length > 50){
                setErrors({...errors, [campo]: 'El apellido 1 debe tener hasta 50 caráctreres. Ingresa un apellido más corto.'})
            }else{
                setErrors({...errors, [campo]: ''})
                res = true
            }
            break;
        case 'apellido2':
            if(valor.length > 0 && valor.length < 3){
                setErrors({...errors, [campo]: 'El apellido 2 debe tener almenos 3 caráctreres. Ingresa un apellido más largo.'})
            }else if(valor.length > 50){
                setErrors({...errors, [campo]: 'El apellido 2 debe tener hasta 50 caráctreres. Ingresa un apellido más corto.'})
            }else{
                setErrors({...errors, [campo]: ''})
                res = true
            }
            break;
        case 'direccion':
            if(valor.length === 0){
                setErrors({...errors, [campo]: 'La dirección es obligatoria.'})
            }else if(valor.length < 10){
                setErrors({...errors, [campo]: 'La dirección debe tener almenos 10 caráctreres. Ingresa una dirección más larga.'})
            }else if(valor.length > 150){
                setErrors({...errors, [campo]: 'La dirección debe tener hasta 255 caráctreres. Ingresa una dirección más corta.'})
            }else{
                setErrors({...errors, [campo]: ''})
                res = true
            }
            break;
        case 'fono':
            if(valor.length === 0){
                setErrors({...errors, [campo]: 'El teléfono es obligatorio.'})
            }else if(valor.length < 3){
                setErrors({...errors, [campo]: 'El teléfono debe tener almenos 8 caráctreres. Ingresa un teléfono más largo.'})
            }else if(valor.length > 50){
                setErrors({...errors, [campo]: 'El teléfono debe tener hasta 15 caráctreres. Ingresa un teléfono más corto.'})
            }else{
                setErrors({...errors, [campo]: ''})
                res = true                
            }
            break;
        case 'email':
            if(valor.length === 0){
                setErrors({...errors, [campo]: 'El correo electrónico es obligatorio.'})
            }else if(!isEmail(valor)){
                setErrors({...errors, [campo]: 'El email ingresado no es válido.'})
            }else if(valor.length > 50){
                setErrors({...errors, [campo]: 'El email debe tener hasta 150 caráctreres. Ingresa una dirección de correo electrónico más corta.'})
            }else{
                setErrors({...errors, [campo]: ''})
                res = true
            }
            break;
        case 'password':                
            validaPassword(campo, valor, usuario.confirmPassword)
            break;
        case 'confirmPassword':
            validaPassword(campo, usuario.password, valor)
            break;
        default:
            setErrors({...errors, [campo]: ''})
            res = true
    }
    return res
}

export  const isEmail = (val) => {
    // eslint-disable-next-line
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(val)
}

export const validaPassword = (campo, pwd, confirmPwd, usuario, setErrors, errors) =>{
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
            (campo === 'confirmPassword' && valor === usuario.password) || 
            (campo === 'password' && valor === usuario.confirmPassword)
        ){
            setErrors({...errors, password: '', confirmPassword: ''})
        }else{
            setErrors({...errors, [campo]: ''})
        }  
    }
}