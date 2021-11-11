import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { find } from '../../../../actions/subCategorias' 
import { useHistory } from 'react-router-dom'
import { types } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { types as subCategoriasTypes } from '../../../../redux/SubCategorias/types'
import { insert, update, deleteReg } from '../../../../actions/subCategorias'
import { getAll } from '../../../../actions/categorias'
import { SubCategoriasContent } from './content'


export const SubCategoriasForm = () => {
    const currentPath = window.location.pathname.split('/')[1]
    const { id } = useParams()
    const [ accion , setAccion ] = useState(null)
    const [ errors, setErrors ] = useState({nombre: '', categoria_id: ''})
    const [ sub_categoria, setSub_Categoria ] = useState({id: '', nombre: '', categoria_id: '', created_at: '', updated_at: '', deleted_at:''})
    const subCategoria = useSelector(state => state.SubCategoriasReducer.subCategoria)
    const categorias = useSelector(state => state.CategoriasReducer.list)
    const pantalla = useSelector(state => state.PantallasReducer.pantalla)
    const tipo = useSelector(state => state.AlertaReducer.tipo)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const dispatch = useDispatch()
    const history = useHistory()

    
    useEffect(()=>{
        dispatch(getAll())
    },[dispatch])


    useEffect(()=>{
        if(id){
            dispatch(find(id))
        }else{
            dispatch({type: subCategoriasTypes.NUEVA_SUB_CATEGORIA})
        }
    },[id, dispatch])

    
    useEffect(()=>{
        setSub_Categoria(subCategoria)
    },[subCategoria, dispatch])


    useEffect(()=>{
        if(tipo === 'success'){
            history.push('/'+currentPath)
        }
    },[currentPath, history, tipo])


    const handlerChangeValue = (e) => {
        validaDatos(e.target.name, e.target.value)
        setSub_Categoria({
            ...sub_categoria,
            [e.target.name]: e.target.value
        })
    }

    const response = (e) => {
        if(e){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            if(accion === 'grabar'){
                if(id){
                    dispatch(update(id, sub_categoria))
                }else{
                    dispatch(insert(sub_categoria))
                }
            }else{
                dispatch(deleteReg(id))
            }
        }
    }


    const grabar = (e) => {
        let errValidacion = Object.keys(sub_categoria).map(e => validaDatos(e,sub_categoria[e])).filter(e => !e).length
        if(errValidacion ===  0){
            setAccion('grabar')
            dispatch({type: types.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea grabar el registro?', tipo: 'Grabar'}})
        }
    }

    const eliminar = (e) => {
        setAccion('eliminar')
        dispatch({type: types.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', tipo: 'Eliminar'}})
    }
    

    const cancelar = (e) => {
        history.push('/'+currentPath)
    }

    const validaDatos = (field, value) => {
        let res = false
        switch(field){
            case 'nombre':
                if(value.length === 0){
                    setErrors(prevState => ({...prevState, [field]:'Debe ingresar un nombre para la sub-categoría.'}))
                }else if(value.length < 3){
                    setErrors(prevState => ({...prevState, [field]:'El nombre debe tener almenos 3 carácteres. Ingresa un nombre más largo.'}))
                }else if(value.length > 50){
                    setErrors(prevState => ({...prevState, [field]:'El nombre debe tener hasta 50 carácteres. Ingresa un nombre más corto'}))
                }else{
                    setErrors(prevState => ({...prevState, [field]:''}))
                    res = true
                }
                break;
            case 'categoria_id':
                if(!value || value === 0 || value === '-- Seleccione --'){
                    setErrors(prevState => ({...prevState, [field]:'Debe seleccionar una categoría.'}))
                }else{
                    setErrors(prevState => ({...prevState, [field]:''}))
                    res = true
                }
                break;
            default:
                setErrors(prevState => ({...prevState,[field]:''}))
                res = true
        }
        return res
    }

    return (
        <SubCategoriasContent 
            response={response} 
            pantalla={pantalla} 
            sub_categoria={sub_categoria} 
            handlerChangeValue={handlerChangeValue} 
            errors={errors} 
            categorias={categorias} 
            grabar={grabar} 
            eliminar={eliminar} 
            cancelar={cancelar} 
            id={id}
            togleMenu={togleMenu}
        />
    )
}