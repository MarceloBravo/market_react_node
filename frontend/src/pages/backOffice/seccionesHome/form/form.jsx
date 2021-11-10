import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { find, insert, update, deleteReg } from '../../../../actions/seccionesHome'
import { useHistory, useParams } from 'react-router-dom'
import { types as modalFialogTypes } from '../../../../redux/ModalDialog/types'
import { filter } from '../../../../actions/productos'
import { types as productosTypes } from '../../../../redux/Productos/types'
import { SeccionesHomeContent } from './content'
import { types as seccionesTypes } from '../../../../redux/SeccionesHome/types'


export const SeccionesHomeForm = () => {
    const { id } = useParams()
    const currentUrl = window.location.pathname.split('/')[1]
    const seccionesState = useSelector(state => state.SeccionesHomeReducer.secciones)
    const [ secciones, setSecciones ] = useState({id: '', nombre: '', productos: [], created_at: '', updated_at: '', deleted_at: ''})
    const [ errors, setErrors ] = useState({nombre: '', productos: ''})
    const [ accion, setAccion ] = useState('grabar')
    const [ busqueda, setBusqueda ] = useState('')
    const alertaTipo = useSelector(state => state.AlertaReducer.tipo)
    const [ arrProductos, setArrProductos ] = useState({data:[]})
    const productosState = useSelector(state => state.ProductosReducer.dataGrid.data)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const dispatch = useDispatch()
    const history = useHistory()
    const selectProductoRef = useRef()


    useEffect(()=>{
        if(id){
            dispatch(find(id))
        }else{
            dispatch({type: seccionesTypes.NEW_SECCIONES_HOME})
        }
    },[dispatch, id])


    useEffect(()=>{
        //if(seccionesState){
            setSecciones(seccionesState)
            setArrProductos({data: seccionesState.productos})
        //}
    },[dispatch, seccionesState])


    useEffect(()=>{
        if(alertaTipo === 'success'){
            history.push('/'+currentUrl)
        }
    },[alertaTipo, currentUrl, history])

    
    useEffect(()=>{
        setSecciones({...seccionesState, productos: arrProductos.data})
    },[arrProductos, productosState, seccionesState])


    const handlerChangeValue = (e) => {
        validaDatos(e.target.name, e.target.value)
        setSecciones({
            ...secciones,
            [e.target.name]: e.target.value
        })
    }


    const cargarProductos = (e) => {        
        setBusqueda(e.target.value)
        if(e.target.value.length > 0){            
            dispatch(filter(e.target.value, 0))
        }else{
            dispatch({type: productosTypes.ESTADO_INICIAL_PRODUCTO})
        }
    }


    const grabar = () => {
        Object.keys(errors).forEach(f => validaDatos(f, secciones[f]))
        if(Object.keys(errors).filter(f => secciones[f].length === 0).length ===0){
            dispatch({type: modalFialogTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea grabar el registro?', titulo: `Grabar sección`}})
            setAccion('grabar')
        }
    }


    const eliminar = () => {
        dispatch({type: modalFialogTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', titulo: 'Eliminar sección'}})
        setAccion('eliminar')
    }


    const cancelar = () => {
        history.push('/'+currentUrl)
    }


    const response = (res) => {
        if(res){
            if(accion === 'grabar'){
                if(id){
                    dispatch(update(id, secciones))
                }else{
                    dispatch(insert(secciones))
                }
            }else{
                dispatch(deleteReg(id))
            }
        }
    }


    const eliminarProducto = (id) => {
        setArrProductos({...arrProductos, data: arrProductos.data.filter(p => p.id !== id)})
    }


    const agregarProducto = () => {
        let datos = arrProductos.data
        let productos = [...datos]
        // eslint-disable-next-line
        let item = productosState.filter(p => p.id == selectProductoRef.current.value)[0]
        productos.push({id: Math.random()*-1, nombre: item.nombre, precio_venta_normal: item.precio_venta_normal, stock: item.stock, producto_id: item.id, texto1: '', texto2: ''})
        setArrProductos({...arrProductos, data: productos})
        setSecciones({...secciones, productos})
        setBusqueda('')
        dispatch({type: productosTypes.ESTADO_INICIAL_PRODUCTO})
    }


    const validaDatos = (field, value) => {
        switch(field){
            case 'nombre':
                if(value.length === 0){
                    setErrors(prevState => ({...prevState, [field]: 'El nombre de la sección es obligatorio'}))
                }else if(value.length < 3){
                    setErrors(prevState => ({...prevState, [field]: 'El nombre de la sección debe tener almenos 3 carácteres. Ingrese un nombre más largo'}))
                }else if(value.length > 100){
                    setErrors(prevState => ({...prevState, [field]: 'El nombre de la sección debe tener hasta 100 carácteres. Ingrese un nombre más corto'}))
                }else{
                    setErrors(prevState => ({...prevState, [field]: ''}))
                }
                break
            default:
                setErrors(prevState => ({...prevState, [field]: ''}))
        }
    }


    return (
        <SeccionesHomeContent 
            response={response}  
            secciones={secciones} 
            handlerChangeValue={handlerChangeValue} 
            errors={errors} 
            busqueda={busqueda} 
            cargarProductos={cargarProductos} 
            selectProductoRef={selectProductoRef} 
            productosState={productosState} 
            eliminarProducto={eliminarProducto}
            arrProductos={arrProductos}
            agregarProducto={agregarProducto}
            currentUrl={currentUrl}
            grabar={grabar}
            eliminar={eliminar}
            cancelar={cancelar}
            id={id}
            togleMenu={togleMenu}
        />
    )
}