import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { page, filter, save } from '../../../actions/precios'
import { types as modalDialogTypes } from '../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../redux/Spinner/types'
import { types as alertasTypes } from '../../../redux/Alert/types'
import { PreciosContent } from './content'

export const MntPrecios = () => {
    const dataGridState = useSelector(state => state.PreciosReducer.dataGrid)
    const alertaState = useSelector(state => state.AlertaReducer)
    const [ dataGrid, setDataGrid ] = useState([])
    const [ filtro, setFiltro ] = useState('')
    const [ idDelete, setIdDelete ] = useState(null)
    const [ editing, setEditing ] = useState(false)
    const [ item, setItem ] = useState(null)
    const [ negativeId, setNegativeId ] = useState(0)
    const [ deleted, setDeleted ] = useState([])
    const [ rowsErrors, setRowsErrors ] = useState([])
    const [ grabando, setGrabando ] = useState(false)
    const filasRef = useRef([])
    const dispatch = useDispatch()
    
    

    useEffect(()=>{
        dispatch(page(0))
    },[dispatch])


    useEffect(()=>{
        if(dataGridState){  //Actualizando el contenido de la grilla con datos traidpos desde la base de datos
            setDataGrid(dataGridState)
            setEditing(false)
        }
    },[dataGridState])

    
    useEffect(()=>{
        if(item){
            item.data.id = negativeId - 1
            let data = [...dataGrid.data]
            data.splice( item.pos, 0, item.data)
            setDataGrid({...dataGrid,data: data})
            setItem(null)
            setNegativeId(prevState => prevState - 1)
        }
    // eslint-disable-next-line
    },[item])


    useEffect(()=>{
        if(alertaState?.tipo === 'success'){
            filtrar(filtro)
            setEditing(false)
        }
    // eslint-disable-next-line
    },[alertaState])


    useEffect(()=>{
        if(rowsErrors.length > 0 && filasRef.length > 0){            
            rowsErrors.forEach(e =>{
                filasRef.current[ 
                    dataGrid.data.map((f , k) => f.id === e ? k : null).filter( k => k !== null)[0] 
                ].style.backgroundColor = "#f8d7da"
            });
            dispatch({type: alertasTypes.MOSTRAR_ALERTA, payload: {mensaje: 'Existen conflictos de fechas para algunas ofertas. Revisa que las fechas no se topen entre sí.', tipo: 'danger'}})
            setGrabando(false)
        }else{
            if(dataGrid.data){
                dataGrid.data.forEach((f, k) => {
                    if(filasRef.current[k])filasRef.current[k].style.backgroundColor = "#f8d7da00"
                })
            }
            if(grabando){
                setGrabando(false)
                dispatch({type: modalDialogTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea grabar los cambios?', titulo: 'Actualizar precios'}})
            }
        }
    // eslint-disable-next-line
    },[dispatch, grabando, rowsErrors])

    
    const handlerColum = (a, b, c) => {
        
    }


    const grabar = () => {
        setGrabando(true)
        validaDatos()
    }


    const cancelar = () => {
        filtrar(filtro)
        dispatch({type: alertasTypes.OCULTAR_ALERTA})
        setRowsErrors([])
        setGrabando(false)
    }


    const response = res => {  
        if(res){
            if(idDelete){
                dispatch({type: alertasTypes.OCULTAR_ALERTA})
                setRowsErrors([])
                setGrabando(false)

                setDataGrid({
                    ...dataGrid,
                    data: dataGrid.data.filter(p => p.id !== idDelete)
                })
                let data = dataGrid.data.filter(p => p.id === idDelete)[0]
                data.deleted = true
                setDeleted(data)
                setEditing(true)
                setIdDelete(null)
            }else{
                dispatch({type: spinnerTypes.SHOW_SPINNER})
                let data = [...dataGrid.data, deleted]
                dispatch(save(data, dataGrid.pag, filter))
            }
        }
    }


    const eliminarRegistro = (e) => {
        setIdDelete(e)
        dispatch({type: modalDialogTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el precio?', titulo: 'Eliminar precio'}})
    }


    const filtrar = (texto) => {
        setFiltro(texto)
        if(texto.length > 0){
            dispatch(filter(texto, 0))
        }else{
            dispatch(page(0))
        }
    }


    const goToPage = (pag) => {
        if(filtro.length > 0){
            dispatch(filter(filtro, pag))
        }else{
            dispatch(page(pag))
        }
    }
    

    const deleteCondition = (row) => {
        let fecha = new Date(row.fecha_desde)
        let date = new Date()
        return fecha > date || row.id < 0
    }


    const onChangeColumn = (fila, id, field, value) => {
        dispatch({type: alertasTypes.OCULTAR_ALERTA})
        switch(field){
            case 'precio':
                actualizarPorcentaje(fila, parseInt(value))
                break;
            case 'descuento':
                actualizarPrecioOferta(fila, parseInt(value))
                break;
            case 'fecha_desde':
                let fechaDesde = new Date(value)
                if(fechaDesde !== 'Invalid Date'){
                    actualizarFechaDesde(fila, fechaDesde)
                }
                break;
            case 'fecha_hasta':
                let fechaHasta = new Date(value)
                if(fechaHasta !== 'Invalid Date'){
                    actualizarFechaHasta(fila, fechaHasta)
                }
                break;
            default:
        }
        setEditing(true)
    }


    const actualizarPorcentaje = (fila, inputValue) => {
        let newData = [...dataGrid.data]
        let precioNormal = newData[fila].precio_venta_normal
        let descuento = parseInt((precioNormal - inputValue) * 100 / precioNormal)
        
        if(newData[fila].descuento_maximo && descuento > newData[fila].descuento_maximo){
            descuento = newData[fila].descuento_maximo
        }
        newData[fila].descuento = descuento
        setDataGrid({
            ...dataGrid,
            data: newData
        })
    }

    
    const actualizarPrecioOferta = (fila, porcentaje) => {        
        let newData = [...dataGrid.data]
        if(newData[fila].descuento_maximo && porcentaje > newData[fila].descuento_maximo){
            porcentaje = newData[fila].descuento_maximo
            newData[fila].descuento = porcentaje
        }
        let precioNormal = newData[fila].precio_venta_normal
        newData[fila].precio = parseInt(precioNormal * (100 - porcentaje) / 100)
        setDataGrid({
            ...dataGrid,
            data: newData
        })
    }


    const actualizarFechaDesde = (fila, nuevaFecha) => {
        let fecha = new Date()
        let newData = [...dataGrid.data]
        if(nuevaFecha < fecha){
            nuevaFecha = fecha
        }
        newData[fila].fecha_desde = nuevaFecha

        let fechaHasta = new Date(newData[fila].fecha_hasta)
        if(fechaHasta !== 'Invalid Date'){
            newData[fila].fecha_hasta = nuevaFecha > fechaHasta ? nuevaFecha : fechaHasta
        }
        setDataGrid({
            ...dataGrid,
            data: newData
        })
    }


    const actualizarFechaHasta = (fila, nuevaFecha) => {
        let fecha = new Date()
        let newData = [...dataGrid.data]

        let fechaDesde = new Date(newData[fila].fecha_desde)
        if(nuevaFecha < fechaDesde){
            nuevaFecha = fecha
        }
        newData[fila].fecha_hasta = nuevaFecha
        if(fechaDesde === 'Invalid Date' || fechaDesde > nuevaFecha){
            newData[fila].fecha_desde = nuevaFecha
        }
        setDataGrid({
            ...dataGrid,
            data: newData
        })
    }

    
    const onDoubleClickColumn = (fila, id, columna) => {
        if(!['precio','descuento','fecha_desde','fecha_hasta'].includes(columna)){
            setItem({data: JSON.parse(JSON.stringify(dataGrid.data[fila])), pos: fila+1})
            setEditing(true)
        }
    }


    const validaDatos = () => {
        setRowsErrors(prevState => [])
        let datos = [...dataGrid.data].sort((a,b) => a.producto_id - b.producto_id)
        datos.forEach(i => {
            validarPorcentaje(i)
            datos.forEach(e => {
                validarFecha(e, i)
            })            
        })
    }

    
    const validarFecha = (e, i) => {
        if(e.id !== i.id && e.producto_id === i.producto_id){
            let fechaDesde1 = new Date(i.fecha_desde)
            let fechaDesde2 = new Date(e.fecha_desde)
            let fechaHasta1 = new Date(i.fecha_hasta)
            let fechaHasta2 = new Date(e.fecha_hasta)
            if(
                (fechaDesde1 >= fechaDesde2 && fechaDesde1 <= fechaHasta2) || 
                (fechaDesde2 >= fechaDesde1 && fechaDesde2 <= fechaHasta1) ||
                (fechaHasta1 >= fechaDesde2 && fechaHasta1 <= fechaHasta2) || 
                (fechaHasta2 >= fechaDesde1 && fechaHasta2 <= fechaHasta1)
            ){
                setRowsErrors(prevState => [...prevState, e.id])
            }
        }else if(e.fecha_desde === null && e.fecha_hasta !== null){
            setRowsErrors(prevState => [...prevState, e.id])
        }
    }


    const validarPorcentaje = (e) => {
        if(
            (e.descuento === null && e.precio !== null) || 
            (e.descuento !== null && e.precio === null) || 
            (e.descuento_maximo !== null && e.descuento > e.descuento_maximo)
        ){
            setRowsErrors(prevState => [...prevState, e.id])
        }
    }
    

    return (
        <PreciosContent 
            response={response}
            editing={editing} 
            grabar={grabar} 
            cancelar={cancelar} 
            dataGrid={dataGrid} 
            eliminarRegistro={eliminarRegistro} 
            filtrar={filtrar} 
            handlerColum={handlerColum} 
            deleteCondition={deleteCondition} 
            onChangeColumn={onChangeColumn} 
            onDoubleClickColumn={onDoubleClickColumn}
            filasRef={filasRef}
            goToPage={goToPage}
        />
    )
}