import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { buscar, insertar, actualizar, eliminar } from '../../../../actions/usuarios'
import { listar } from '../../../../actions/roles'
import { types as modalTypes } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { types as userTypes } from '../../../../redux/Users/types'
import { ContentUsuariosForm } from './content';
import { isEmail } from '../../../../shared/funciones'

export const UsuariosForm = () => {
    const { id } = useParams()
    const [ usuario, setUsuario ] = useState({id: '', name:'', a_paterno: '', a_materno: '', direccion: '', fono:'', email:'', foto: '', objImagen: '', roles: [], roles_id:[], password: '', confirmPassword: '', created_at: '', updated_at:'', deleted_at: ''})
    const [ errors, setErrors ] = useState({name:'', a_paterno:'' , a_materno:'' , direccion:'', fono:'',  email:'', foto: '', roles:'', password: '', confirmPassword: ''})
    const [ accion, setAccion ] = useState('')
    const roles = useSelector(state => state.RolesReducer.list)
    const user = useSelector(state => state.UsersReducer.user)
    const ok = useSelector(state => state.AlertaReducer.tipo)   //Si ok es verdadero se redirecciona al listado de registros
    const dispatch = useDispatch()
    const history = useHistory()
    const fileAvatar = useRef(null)
    
    useEffect(()=>{
        if(id){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(buscar(id ? id : '0'))
        }else{
            dispatch({type: userTypes.NUEVO_USUARIO })
        }
    },[dispatch, id])


    useEffect(()=>{
        dispatch(listar())  //Obtiene el listado de roles para cargar el control <select/>
    },[dispatch])


    useEffect(()=>{
        if(ok === 'success'){
            history.push('/usuarios');
        }
    },[ok, history])

    
    useEffect(()=>{
        if(user){
            user.password = ''
            user.confirmPassword = ''
            setUsuario(user);
        }
    },[user])


    const response = (res) => {
        if(res){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            if(accion === 'grabar'){
                if(id){
                    dispatch(actualizar(id, usuario))
                }else{
                    dispatch(insertar(usuario))
                }
            }else{
                dispatch(eliminar(id))
            }
        }
    }


    const mostrarOcultarModal = () => {
        dispatch({ type: modalTypes.SHOW_MODAL_DIALOG, action: false})
    }

    const handlerChangeValue = (e) => {
        if(e.target.name === 'roles_id'){
            let value = Array.from(e.target.selectedOptions, option => option.value) ;
            let selectedRoles = []
            // eslint-disable-next-line
            value.map(v => roles.filter(r => r.id == v)).map(a => Array.prototype.push.apply(selectedRoles, a))
            setUsuario({...usuario, [e.target.name]:value, roles: selectedRoles})
        }else{
            validaDatos(e.target.name, e.target.value)
            setUsuario({...usuario, [e.target.name]:e.target.value})
        }
    }


    const fnGrabar = () =>{
        if(Object.keys(errors).filter(e => errors[e] !== '').length === 0){
            setAccion('grabar')
            dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload:{titulo: 'Grabar', mensaje:'¿Desea grabar el registro?'}})
        }
    }
    
    const fnEliminar = () => {
        setAccion('eliminar')
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload:{titulo: 'Eliminar', mensaje:'¿Desea eliminar el usuario?'}})
    }
    
    const cancelar = () => {
        history.push('/usuarios')
    }

    const handlerFile = (e) => {
        fileAvatar.current.click()
    }
    
    const fnRefgreshImage = (e) => {
        //La arrow function actualiza el estado del useState sin necesidad de utilizar el useEffect
        //Al no utilizar la arrow function el objeto usuario recibe el nuevo estado, pero no se ve 
        //reflejado a menos que se utilize un useEffect o una función de flecha como la utilizada
        //esto permite que la nueva imágen seleccionada se vea reflejada en el control image
        if(e.target.files.length > 0){
            setUsuario(usuario => ({...usuario, foto: e.target.value.split('\\')[2], objImagen: URL.createObjectURL(e.target.files[0])})) 
        }
    }

    const validaDatos = (campo, valor) => {
        if(campo === 'roles_id')return
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
                }
                break;
            case 'a_paterno':
                if(valor.length === 0){
                    setErrors({...errors, [campo]: 'El apellido 1 es obligatorio.'})
                }else if(valor.length < 3){
                    setErrors({...errors, [campo]: 'El apellido 1 debe tener almenos 3 caráctreres. Ingresa un apellido más largo.'})
                }else if(valor.length > 50){
                    setErrors({...errors, [campo]: 'El apellido 1 debe tener hasta 50 caráctreres. Ingresa un apellido más corto.'})
                }else{
                    setErrors({...errors, [campo]: ''})
                }
                break;
            case 'a_materno':
                if(valor.length > 0 && valor.length < 3){
                    setErrors({...errors, [campo]: 'El apellido 2 debe tener almenos 3 caráctreres. Ingresa un apellido más largo.'})
                }else if(valor.length > 50){
                    setErrors({...errors, [campo]: 'El apellido 2 debe tener hasta 50 caráctreres. Ingresa un apellido más corto.'})
                }else{
                    setErrors({...errors, [campo]: ''})
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
        }
    }
    
    
    const validaPassword = (campo, pwd, confirmPwd) =>{
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
    
    return (
        <ContentUsuariosForm 
            response={response}  
            mostrarOcultarModal={mostrarOcultarModal}  
            usuario={usuario}
            handlerChangeValue={handlerChangeValue} 
            errors={errors} 
            roles={roles} 
            fnGrabar={fnGrabar} 
            fnEliminar={fnEliminar} 
            cancelar={cancelar} 
            id={id}
            fileReference={fileAvatar}  //Referencia al control file
            fnLoadImage={handlerFile} //Función que muestra el cuadro de dialogo para buscar una imágen
            fnRefgreshImage={fnRefgreshImage}   //Función que recibe los cambios de imágen del avatar del usuario
        />       
    )
}