import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { find, update, insert, deleteReg } from '../../../../actions/categorias'
import { types as modalTypes } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { types as typesCategorias } from '../../../../redux/Categorias/types'
import { ContentCategoriasForm } from './content'

export const CategoriasForm = (props) => {
    const { id } = useParams()
    const [ accion, setAccion ] = useState(null)
    const [ errors, setErrors ] = useState({nombre: ''})
    const [ categoria, setCategoria ] = useState({id: '', nombre: '', created_at: '', updated_at: '', deleted_at: ''})
    const data = useSelector(state => state.CategoriasReducer.categoria)
    const alertaState = useSelector(state => state.AlertaReducer)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(()=> {
        if(id){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(find(id))
        }else{
            dispatch({type: typesCategorias.NUEVA_CATEGORIA})
        }
    },[id, dispatch])
    

    useEffect(()=> {
        if(data){
            setCategoria(data)
        }
    },[data])


    useEffect(()=>{
        if(alertaState.tipo === 'success'){
            history.push('/categorias')
        }
    },[alertaState, history])


    const handlerChangeValue = (e) => {
        validaDatos(e.target.name, e.target.value)
        setCategoria({...categoria, [e.target.name]: e.target.value})
    }

    const grabar = (e) => {
        validaDatos('nombre', categoria.nombre)
        if(errors.nombre !== '' && errors.nombre !== null){
            setAccion('grabar')
            dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea grabar el registro?', titulo: 'Grabar'}})
        }
    }

    const eliminar = (e) => {
        setAccion('eliminar')
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', titulo: 'Eliminar'}})
    }

    const response = (e) => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        if(e){
            if(accion === 'grabar'){
                if(id){
                    dispatch(update(id, categoria))
                }else{
                    dispatch(insert(categoria))
                }
            }else{
                dispatch(deleteReg(id))        
            }
        }
    }


    const handlerBtnCancelar = (e) => {
        history.push('/categorias')
    }

    const validaDatos = (field, value) => {
        let res = false
        if(value.length === 0){
            setErrors(prevState => ({...prevState, [field]: 'El nombre es obligatorio.'}))
        }else if(value.length > 50){
            setErrors(prevState => ({...prevState, [field]: 'El nombre no debe sobrepasar los 50 carácteres. Ingresa un nombre más corto.'}))
        }else if(value.length < 3){
            setErrors(prevState => ({...prevState, [field]: 'El nombre debe tener un mínimo de 3 carácteres. Ingresa un nombre más largo'}))
        }else{
            setErrors(prevState => ({...prevState, [field]:''}))
            res = true
        }
        return res
    }


    return (
        <ContentCategoriasForm 
            response={response} 
            errors={errors} 
            categoria={categoria} 
            handlerChangeValue={handlerChangeValue} 
            grabar={grabar} 
            eliminar={eliminar} 
            handlerBtnCancelar={handlerBtnCancelar} 
            id={id}
            togleMenu={togleMenu}
        />
    )
}