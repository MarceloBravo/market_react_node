import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { types as ModalTypes } from '../../../../redux/ModalDialog/types'
import { find, insert, update, deleteReg } from '../../../../actions/impuestos'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { types as impuestosTypes } from '../../../../redux/Impuestos/types'
import { ContentImpuestos } from './content'

export const ImpuestosForm = (props) => {
    const { id } = useParams()
    const data = useSelector(state => state.ImpuestosReducer.impuesto)
    const ok = useSelector(state => state.AlertaReducer.tipo) 
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const [ impuesto, setImpuesto ] = useState({nombre:'', sigla:'', porcentaje: '', created_at: '', updated_at: '', deleted_at:''})
    const [ errors, setErrors ] = useState({nombre:'', sigla:'', porcentaje: ''})
    const [ accion, setAccion ] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()

    
    useEffect(()=>{
        if(id){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(find(id))
        }else{
            dispatch({type: impuestosTypes.NUEVO_IMPUESTO})
        }
    },[id, dispatch])


    useEffect(()=> {
        if(data){
            setImpuesto(data)
        }
    },[data])


    useEffect(()=>{
        if(ok === 'success'){
            history.push('/impuestos')
        }
    },[ok,history])
    

    const response = e => {
        if(e){
            if(id){
                if(accion === 'eliminar'){
                    eliminarReg()
                }else{
                    actualizar()
                }
            }else{
                insertar()
            }
        }
    }


    const handlerChangeValue = (e) => {
        validaDatos(e.target.name, e.target.value)
        setImpuesto({...impuesto, [e.target.name]: e.target.value})
    }



    const grabar = (e) => {
        let errs = Object.keys(impuesto).map(f => validaDatos(f, impuesto[f])).filter(e => e === false).length > 0
        
        if(!errs){
            setAccion('grabar')
            dispatch({type: ModalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea grabar el registro?', tipo: 'Grabar'}})
        }
    }

    const eliminar = (e) => {
        setAccion('eliminar')
        dispatch({type: ModalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea grabar el eliminar?', tipo: 'Eliminar'}})
    }

    const handlerBtnCancelar = (e) => {
        history.push('/impuestos')
    }

    const insertar = () => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(insert(impuesto))
    }

    const actualizar = () => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(update(id, impuesto))
    }

    const eliminarReg = () => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(deleteReg(id))
    }


    const validaDatos = (field, value) => {
        let res = false
        switch(field){
            case 'nombre':
                if(value.length === 0){
                    setErrors(prevState => ({...prevState, [field]: 'El nombre del impuesto es obligatorio.'}))
                }else if(value.length < 3){
                    setErrors(prevState => ({...prevState, [field]: 'El nombre debe tener un mínimo de 3 carácteres. Ingresa un nombre más largo.'}))
                }else if(value.length > 100){
                    setErrors(prevState =>  ({...prevState, [field]: 'El nombre debe tener hasta 100 carácteres. Ingresa un nombre más corto.'}))
                }else{
                    setErrors(prevState => ({...prevState, [field]:''}))
                    res = true
                }
                break;
            case 'sigla':
                if(value.length === 0){
                    setErrors(prevState => ({...prevState, [field]: 'La sigla del impuesto es obligatoria.'}))
                }else if(value.length < 3){
                    setErrors(prevState => ({...prevState, [field]: 'La sigla debe tener un mínimo de 3 carácteres. Ingresa una sigla más larga.'}))
                }else if(value.length > 15){
                    setErrors(prevState => ({...prevState, [field]: 'La sigla debe tener hasta 15 carácteres. Ingresa una sigla más corta.'}))
                }else{
                    setErrors(prevState => ({...prevState, [field]:''}))
                    res = true
                }
                break;
            case 'porcentaje':
                if(value.length === 0){
                    setErrors(prevState => ({...prevState, [field]: 'El porcentaje de impuesto es obligatorio.'}))
                }else if(isNaN(value)){
                    setErrors(prevState => ({...prevState, [field]: 'El porcentaje de impuesto debe ser un número.'}))
                }else if(value < 0){
                    setErrors(prevState => ({...prevState, [field]: 'El porcentaje de impuesto debe ser un valor positivo.'}))
                }else{
                    setErrors(prevState => ({...prevState, [field]:''}))
                    res = true
                }
                break;
            default:
                setErrors(prevState => ({...prevState, [field]: ''}))
                res = true
        }
        return res
    }

    
    return (
        <ContentImpuestos 
            response={response} 
            impuesto={impuesto} 
            handlerChangeValue={handlerChangeValue} 
            errors={errors} 
            grabar={grabar} 
            eliminar={eliminar} 
            handlerBtnCancelar={handlerBtnCancelar} 
            id={id}
            togleMenu={togleMenu}
        />        
    )
}
