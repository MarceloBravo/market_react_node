/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { find } from '../../../../actions/tallas'
import { getAll } from '../../../../actions/categorias'
import { getAllByCategory } from '../../../../actions/subCategorias'
import { findByUrl } from '../../../../actions/pantallas'
import { useState } from 'react'
import { types as ModalTypes } from '../../../../redux/ModalDialog/types'
import { types as TallasTypes } from '../../../../redux/Tallas/types'
import { insert, update, deleteReg } from '../../../../actions/tallas'
import { TallasContent } from './content'

export const TallasForm = () => {
    const { id } = useParams()
    const url = window.location.pathname.split('/')[1]
    const [ talla, setTalla ] = useState({id:'', talla:'', categoria_id: '', sub_categorias:[], created_at:'', updated_at:'', deleted_at:''})
    const [ errors, setErrors ] = useState({talla:'', categoria_id:'', sub_categorias:''})
    const [ accion, setAccion ] = useState(null)
    const tallaState = useSelector(state => state.TallasReducer.talla )
    const togleMenu = useSelector(state => state.MenusReducer.togle )
    const pantalla = useSelector(state => state.PantallasReducer.pantalla )
    const categorias = useSelector(state => state.CategoriasReducer.list )
    const subCategorias = useSelector(state => state.SubCategoriasReducer.list )
    const mensajeState = useSelector(state => state.AlertaReducer.tipo)
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(() =>{
        dispatch(getAll())
    },[])


    useEffect(()=>{
        dispatch(findByUrl(url))
    },[url])


    useEffect(()=>{
        if(id){
            dispatch(find(id))
        }else{
            dispatch({type: TallasTypes.NUEVA_TALLA})
        }
    },[id])

    useEffect(()=>{
        if(mensajeState === 'success'){
            history.push('/'+url)
        }
    },[mensajeState])

    
    useEffect(()=>{
        
        
            setTalla({
                    id:tallaState.id, 
                    talla: tallaState.talla, 
                    categoria_id: tallaState.categoria_id,
                    sub_categorias: tallaState.sub_categorias.map(e => e.id),
                    created_at: tallaState.created_at,
                    updaated_at: tallaState.updated_at
                })
        if(tallaState.categoria_id){
            dispatch(getAllByCategory(tallaState.categoria_id))
        }
    },[tallaState])


    useEffect(()=>{
        if(talla.categoria_id === ''){
            dispatch(getAllByCategory(0))   //Resetea las sub_categorias
        }
    },[talla])


    const handlerChangeValue = (e) => {
        if(e.target.name === 'sub_categorias'){
            let arrSelected = Array.from(e.target.selectedOptions, option => option.value)
            setTalla({
                ...talla,
                [e.target.name]: arrSelected
            })
        }else{
            validaDatos(e.target.name, e.target.value)
            setTalla({
                ...talla, 
                [e.target.name]:e.target.value
            })
        }
        
        if(e.target.name === 'categoria_id'){
            dispatch(getAllByCategory(e.target.value))
        }
    }


    const response = res => {
        if(res){
            if(accion === 'grabar'){
                if(id){
                    dispatch(update(id, talla))
                }else{
                    dispatch(insert(talla))
                }
            }else{
                dispatch(deleteReg(id))
            }
        }
    }


    const grabar = () => {
        let validacion = Object.keys(errors).map(e => validaDatos(e, talla[e])).filter(e => errors[e] === '')
        if(validacion.length === 0){
            dispatch({type: ModalTypes.SHOW_MODAL_DIALOG, payload:{mensaje: '¿Desea grabar el registro?', titulo:'Grabar'}})
            setAccion('grabar')
        }
    }


    const eliminar = () => {
        dispatch({type: ModalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', tipo: 'Eliminar'}})
        setAccion('eliminar')
    }


    const cancelar = () => {
        console.log('BTN CANCELAR',tallaState, talla)
        history.push('/' + url)
    }


    const validaDatos = (field, value) => {
        let res = false
        switch(field){
            case 'talla':
                if(value.trim().length === 0){
                    setErrors({...errors, field: 'El campo talla es obligatorio.'})
                }else if(value.length > 10){
                    setErrors({...errors, field: 'El campo talla debe tener un máximo de 10 carácteres. Ingresa un texto mas corto.'})
                }else{
                    setErrors({...errors, field: ''})
                    res = true
                }
                break;
            case 'categoria_id':
                if(value === ''){
                    setErrors({...errors, field: 'Debe seleccionar una categoría.'})
                }else{
                    setErrors({...errors, field: ''})
                    res = true
                }
                break;
            case 'sub_categorias':
                if(value === ''){
                    setErrors({...errors, field: 'Debe seleccionar una subcategoría.'})
                }else{
                    setErrors({...errors, field: ''})
                    res = true
                }
                break;
            default:
                setErrors({...errors, field: ''})
        }
        return res
    }


    return (
        <TallasContent
            response={response}
            togleMenu={togleMenu}
            pantalla={pantalla}
            talla={talla}
            handlerChangeValue={handlerChangeValue}
            errors={errors}
            categorias={categorias}
            subCategorias={subCategorias}
            grabar={grabar}
            eliminar={eliminar}
            cancelar={cancelar}
            id={id}
        />
    )
}