import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { buscar, insertar, actualizar, eliminar } from '../../../../actions/roles'
import { types as modalTypes } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { useHistory } from 'react-router-dom'
import { RolesForm } from './content'

export const FormRoles = () => {
    const { id } = useParams();
    const [ rol, setRol ] = useState({id: '', name: '', description: '', created_at: '', updated_at: '', deleted_at: ''})
    const [ errors, setErrors ] = useState({name: '', description: ''})
    const rolState = useSelector(state => state.RolesReducer.rol)
    const ok = useSelector(state => state.AlertaReducer.tipo)
    const [ accion, setAccion ] = useState('');
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(buscar(id))
    },[id, dispatch])


    useEffect(()=>{
        if(id){
            setRol(rolState);
        }else{
            setRol({id: '', name: '', description: '', created_at: '', updated_at: '', deleted_at: ''})
        }
    },[rolState, id])

    
    useEffect(()=>{
        if(ok === 'success'){
            history.push('/roles');
        }
    },[ok, history])
    
    const response = (res) => {
        if(res){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            if(accion === 'grabar'){
                if(id){
                    dispatch(actualizar(id, rol));
                }else{
                    dispatch(insertar(rol));
                }
            }else{
                dispatch(eliminar(id));
            }
        }
    }

    const mostrarOcultarModal = (e) => {
        dispatch({ type: modalTypes.SHOW_MODAL_DIALOG, action: false})
    }

    const handlerChangeValue = (e) => {
        validaDatos(e.target.name, e.target.value)
        setRol({
            ...rol,
            [e.target.name]: e.target.value
        })
    }

    const grabar = () => {
        Object.keys(errors).forEach(e => validaDatos(e, rol[e]))
        if(Object.keys(errors).filter(e => rol[e] === '').length === 0){
            dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload:{titulo: 'Grabar', mensaje:'¿Desea grabar el registro?'}})
            setAccion('grabar');
        }
    }

    const showModalEeliminar = () => {
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload:{titulo: 'Eliminar', mensaje:'¿Desea eliminar el registro?'}})
        setAccion('eliminar');
    }

    const cancelar = () => {
        history.push('/roles')
    }

    const validaDatos = (campo, valor) => {
        switch(campo){            
            case 'name':
                if(valor.length < 3){
                    setErrors(prevState => ({...prevState, [campo]: 'El nombre del rol es demasiado corto.'}))
                }else if(valor.length > 50){
                    setErrors(prevState => ({...prevState, [campo]: 'El nombre del rol es demasiado largo.'}))
                }else{
                    setErrors(prevState => ({...prevState, [campo]: ''}))
                }
                break;
            case 'description':
                if(valor.length < 10){
                    setErrors(prevState => ({...prevState, [campo]: 'La descripción del rol es demasiado corto.'}))
                }else if(valor.length > 255){
                    setErrors(prevState => ({...prevState, [campo]: 'La descripción del rol es demasiado largo.'}))
                }else{
                    setErrors(prevState => ({...prevState, [campo]: ''}))
                }
                break;
            default:
                setErrors(prevState => ({...prevState, [campo]: ''}))
        }
    }

    return (
        <RolesForm 
            response={response}
            mostrarOcultarModal={mostrarOcultarModal}
            rol={rol} 
            handlerChangeValue={handlerChangeValue} 
            errors={errors} 
            grabar={grabar} 
            eliminar={showModalEeliminar} 
            cancelar={cancelar} 
            id={id}
        />
    )
}