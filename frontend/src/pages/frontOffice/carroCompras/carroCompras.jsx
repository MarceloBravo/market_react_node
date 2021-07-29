import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { find as detalleApp } from '../../../actions/personalizar'
import { types as modalTypes } from '../../../redux/ModalDialog/types'
import { useHistory } from 'react-router-dom'
import { CarroComprasContent } from './content'
import './style.css'


export const CarroCompras = () => {
    const appState = useSelector(state => state.PersonalizarReducer.config)
    const [ carrito, setCarrito ] = useState(null)
    const [ dataGrid, setDataGrid ] = useState({data:[]})
    const [ idDelete, setIdDelete ] = useState(null)
    const [ totalNeto, setTotalNeto ] = useState(0)
    const [ impuestos, setImpuestos ] = useState(0)
    const [ subTotal, setSubTotal ] = useState(0)
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(()=>{
        dispatch(detalleApp())
    },[dispatch])

    
    useEffect(()=>{
        if(appState?.nombre_app){
            setCarrito(JSON.parse(localStorage.getItem('cart-'+appState.nombre_app)))
        }
    },[appState])


    useEffect(()=>{
        if(carrito){
            setDataGrid({...dataGrid, data: Object.keys(carrito).map(i => carrito[i])})
            localStorage.setItem('cart-'+appState.nombre_app, JSON.stringify(carrito))
        }
        // eslint-disable-next-line
    },[carrito])


    useEffect(()=>{
        calcularTotalNeto()
        calcularImpuestos()
        calcularSubTotal()
        // eslint-disable-next-line
    },[dataGrid])


    const changeGridColumn = (id, field, value) => {
        if(value < 0){
            actualizarCelda(id, field, 0)
        }else if((value*1) > dataGrid.data[id].stock){
            actualizarCelda(id, field, dataGrid.data[id].stock)
        }else{
            actualizarCelda(id, field, value)
            calcularTotalNeto()
            calcularImpuestos()
            calcularSubTotal()
        }
    }


    const actualizarCelda = (id, field, newValue) => {
        let datos = JSON.parse(JSON.stringify(dataGrid))
        datos.data[id][field] = newValue
        setDataGrid({...dataGrid, data: datos.data})
        localStorage.setItem('cart-'+appState.nombre_app, JSON.stringify(datos.data))
    }

    const eliminarRegistro = (e) => {
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Deseas eliminar el producto del carrito?', titulo: 'Eliminar producto'}})
        setIdDelete(e)
    }


    const response = (res) => {
        if(res && idDelete){            
            let obj = JSON.parse(JSON.stringify(carrito))
            let keys = Object.keys(obj)
            for(var i = 0; i < keys.length; i++){
                // eslint-disable-next-line
                if(keys[i] == idDelete){
                    delete obj[keys[i]]
                }
            }
            setCarrito(obj)
        }
    }


    const calcularTotalNeto = () => {
        let total = 0
        dataGrid.data.forEach(i => total += (i.precio * i.cantidad))
        setTotalNeto(new Intl.NumberFormat("de-DE").format(total))
    }


    const calcularImpuestos = () => {
        let impuestos = 0
        dataGrid.data.forEach(i => 
            impuestos += parseInt((i.precio * i.cantidad) * i.impuestos/100)
        )
        setImpuestos(new Intl.NumberFormat("de-DE").format(impuestos))
    }


    const calcularSubTotal = () => {
        let subTotal = 0
        dataGrid.data.forEach(i => 
            subTotal += (i.precio * i.cantidad) + parseInt((i.precio * i.cantidad) * i.impuestos /100)
        )
        setSubTotal(new Intl.NumberFormat("de-DE").format(subTotal))
    }


    const volver = () => {
        history.push('/')
    }

    return (
        <CarroComprasContent 
            response={response} 
            dataGrid={dataGrid} 
            eliminarRegistro={eliminarRegistro} 
            changeGridColumn={changeGridColumn} 
            totalNeto={totalNeto} 
            subTotal={subTotal} 
            impuestos={impuestos} 
            volver={volver}
        />
    )
}