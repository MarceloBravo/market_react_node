import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { find, insert, update, deleteReg } from '../../../../actions/unidades'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { types as modalTypes } from '../../../../redux/ModalDialog/types'
import { types as unidadTypes } from '../../../../redux/Unidades/types'
import { findByUrl } from '../../../../actions/pantallas'
import { UnidadesFormComponent } from './content'

export const UnidadesForm = () => {
    const { id } = useParams()
    const currentUrl = window.location.pathname.split('/')[1]
    const pantalla = useSelector(state => state.PantallasReducer.pantalla)
    const unidadState = useSelector(state => state.UnidadesReducer.unidad)
    const alertaTipo = useSelector(state => state.AlertaReducer.tipo)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const [ unidad, setUnidad ] = useState({id: '', nombre: '', nombre_plural: '', created_at: '', updated_at:'', deleted_at: ''})
    const [ errors, setErrors ] = useState({nombre: '', nombre_plural: '',})
    const [ accion, setAccion ] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(()=>{
        if(id){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(find(id))
        }else{
            dispatch({type: unidadTypes.NUEVA_UNIDAD})
        }
    },[dispatch, id])


    useEffect(()=>{
        if(unidadState){
            setUnidad(unidadState)
        }
    },[unidadState])


    useEffect(()=>{
        dispatch(findByUrl(currentUrl))
    },[dispatch, currentUrl])


    useEffect(()=>{
        if(alertaTipo === 'success'){
            history.push('/'+currentUrl)
        }
    },[alertaTipo, currentUrl, history])


    const response = (e) => {
        if(e){
            if(accion === 'grabar'){
                if(id){
                    dispatch(update(id, unidad))
                }else{
                    dispatch(insert(unidad))
                }
            }else{
                dispatch(deleteReg(id))
            }
        }
    }


    const handlerChangeValue = (e) => {
        validaDatos(e.target.name, e.target.value)
        setUnidad({
            ...unidad,
            [e.target.name]: e.target.value
        })

    }


    const grabar = (e) => {
        if(validaDatos('nombre',unidad.nombre) && validaDatos('nombre_plural',unidad.nombre_plural)){
            setAccion('grabar')
            dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea grabar el registro?', tipo:'Grabar'}})
        }
    }


    const eliminar = (e) => {
        setAccion('eliminar')
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', tipo:'eliminar'}})
    }


    const cancelar = (e) => {
        history.push('/'+currentUrl)
    }


    const validaDatos = (field, valor) => {
        let res = false
        if(valor.length === 0){
            setErrors(prevState => ({...prevState, [field]: `Debe ingresar el ${field} para la unidad de medida.`}))
        }else if(valor.length < 3){
            setErrors(prevState => ({...prevState, [field]: `El campo debe tener almenos 3 carácteres. Ingresa un nombre más largo.`}))
        }else if(valor.length > 50){
            setErrors(prevState => ({...prevState, [field]: 'El campo debe tener de hasta 50 carácteres. Ingresa un nombre más corto.'}))
        }else{
            setErrors(prevState => ({...prevState, [field]: ''}))
            res = true
        }
        return res
    }


    return (
        <UnidadesFormComponent 
            response={response} 
            pantalla={pantalla} 
            unidad={unidad} 
            handlerChangeValue={handlerChangeValue} 
            errors={errors} 
            grabar={grabar} 
            eliminar={eliminar} 
            cancelar={cancelar} 
            id={id}
            togleMenu={togleMenu}
        />
    )
}