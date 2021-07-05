import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { findByUrl } from '../../../../actions/pantallas'
import { find, insert, update, deleteReg } from '../../../../actions/marcas'
import { types as ModalTypes } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { MarcasFormContent } from './content'


export const MarcasForm = () => {
    const { id } = useParams()
    const currentUrl = window.location.pathname.split('/')[1]
    const [ marca, setMarca ] = useState({id: '',nombre: '', created_at: '', updated_at: '', deleted_at: ''})
    const [ errors, setErrors ] = useState({nombre: ''})
    const [ accion, setAccion ] = useState(null)
    const pantalla = useSelector(state => state.PantallasReducer.pantalla)
    const state = useSelector(state => state.MarcasReducer.marca)
    const alertaTipo = useSelector(state => state.AlertaReducer.tipo)
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(()=>{
        if(id){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(find(id))
        }
    },[dispatch, id])
    

    useEffect(()=>{
        if(state){
            setMarca(state)
        }
    },[dispatch, state])


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
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            if(accion === 'grabar'){
                if(id){
                    dispatch(update(id, marca))
                }else{
                    dispatch(insert(marca))
                }
            }else{
                dispatch(deleteReg(id))
            }
        }    
    }

    const handlerChangeValue = (e) => {
        validaDatos(e.target.name, e.target.value)
        setMarca({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const grabar = (e) => {
        let errsValidacion = Object.keys(marca).map(e => validaDatos(e, marca[e])).filter(e => e === true)
        if(errsValidacion.length === 0){
            setAccion('grabar')
            dispatch({type: ModalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea grabar el registro?', titulo: 'Grabar'}})
        }
    }

    const eliminar = (e) => {
        setAccion('eliminar')
        dispatch({type: ModalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', titulo: 'Eliminar'}})
    }

    const handlerBtnCancelar = (e) => {
        history.push('/'+currentUrl)
    }

    const validaDatos = (field, value) => {
        if(!Object.keys(errors).find(e => e === field)) return false
        let res = true
        if(field === 'nombre'){
            if(value.length === 0){
                setErrors({...errors, [field]: 'El nombre es obligatorio.'})
            }else if(value.length < 3){
                setErrors({...errors, [field]: 'El nombre debe tener un mínimo de 3 carácteres. Ingresa un nombre más largo.'})
            }else if(value.length > 50){
                setErrors({...errors, [field]: 'El nombre debe tener un máximo de 50 carácteres. Ingresa un nombre más corto.'})
            }else{
                setErrors({...errors, [field]: ''})
                res = false
            }        
        }
        return res
    }
    
    return (
        <MarcasFormContent 
            response={response} 
            pantalla={pantalla} 
            marca={marca} 
            errors={errors} 
            handlerChangeValue={handlerChangeValue} 
            grabar={grabar} 
            eliminar={eliminar} 
            handlerBtnCancelar={handlerBtnCancelar} 
            id={id}
        />
    )   
}