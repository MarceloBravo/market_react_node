import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { validaRut, isEmail } from '../../../shared/funciones'
import { types as clientesTypes } from '../../../redux/Clientes/types'
import { IdentificacionClienteContent } from './content'
import { useDispatch } from 'react-redux'

export const IdentificacionCliente = () => {
    const [ cliente, setCliente ] = useState({rut: '', nombres: '', apellido1: '', apellido2: '', fono: '', email: '', direccion: '', region: '', provincia: '', comuna: '', ciudad: '', casa_num: '', block_num: '', referecia: ''})
    const [ errors, setErrors ] = useState({rut: '', nombres: '', apellido1: '', apellido2: '', fono:'', email: ''})
    const [ continuar, setContinuar ] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    

    const handlerInput = (e) => {
        validaDatos(e.target.name, e.target.value)
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }


    useEffect(()=>{
        setContinuar(Object.keys(errors).filter(e => errors[e] !== "").length === 0 && Object.keys(cliente).filter(c => cliente[c] !== "" && c !== 'apellido2').length >= Object.keys(errors).length - 1)
    },[errors, cliente])


    const continuarCompra = () => {
        dispatch({type: clientesTypes.ACTUALIZAR_CLIENTES, payload: cliente})
        history.push('/datosDespacho')
    }


    const validaDatos = (field, value) =>  {
        switch(field){
            case 'rut':
                if(value.length > 14 || !validaRut(value.split('.').join(''))){
                    setErrors({...errors, [field]:'El rut ingresado no es válido'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'nombres':
                if(value.length === 0){
                    setErrors({...errors, [field]:'El nombre es obligatorio.'})
                }else if(value.length < 3){
                    setErrors({...errors, [field]:'Ingrese un nombre más largo.'})
                }else if(value.length > 50 ){
                    setErrors({...errors, [field]:'Ingrese un nombre más corto.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'apellido1':
                if(value.length === 0 && field === 'apellido1'){
                    setErrors({...errors, [field]:'El apellido es obligatorio.'})
                }else if(value.length > 50 ){
                    setErrors({...errors, [field]:'Ingrese un apellido más corto.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'apellido2':
                if(value.length > 0 && value.length < 3){
                    setErrors({...errors, [field]:'Ingrese un apellido más largo.'})
                }else if(value.length > 50 ){
                    setErrors({...errors, [field]:'Ingrese un apellido más corto.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'fono':
                if(value.length === 0){
                    setErrors({...errors, [field]:'Debe ingresar un número celular.'})
                }else if(value.length < 7){
                    setErrors({...errors, [field]:'Ingrese un número más largo.'})
                }else if(value.length > 20 ){
                    setErrors({...errors, [field]:'Ingrese un número más corto.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'email':
                if(!isEmail(value)){
                    setErrors({...errors, [field]:'El email ingresado no es válido.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            default:
                setErrors({...errors, [field]: ''})
        }
    }


    return (
        <IdentificacionClienteContent 
            cliente={cliente} 
            handlerInput={handlerInput} 
            errors={errors} 
            continuarCompra={continuarCompra} 
            continuar={continuar}
        />       
    )
}