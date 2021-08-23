import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { find as detalleApp } from '../../../actions/personalizar'
import { types as modalTypes } from '../../../redux/ModalDialog/types'
import { useHistory } from 'react-router-dom'
import { CarroComprasContent } from './content'
import './style.css'


export const CarroCompras = () => {
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)
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
        if(infoTiendaState?.nombre_tienda){
            setCarrito(JSON.parse(localStorage.getItem('cart-'+infoTiendaState.nombre_tienda)))
        }
    },[infoTiendaState])


    useEffect(()=>{
        if(carrito){
            setDataGrid({...dataGrid, data: Object.keys(carrito).map(i => carrito[i])})
            localStorage.setItem('cart-'+infoTiendaState.nombre_tienda, JSON.stringify(carrito))
        }
        // eslint-disable-next-line
    },[carrito])


    useEffect(()=>{
        calcularTotalNeto()
        calcularImpuestos()
        calcularSubTotal()

        actualizarLocalStorage()
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


    //Actualiza el objeto cart- del almacenamiento local
    const actualizarLocalStorage = () => {
        if(infoTiendaState.nombre_tienda){
            let cart = {}
            dataGrid.data.forEach((i, key) => cart[key] = i)
            localStorage.setItem('cart-'+infoTiendaState.nombre_tienda, JSON.stringify(cart))
        }
    }


    //Actualizando el array para el listado de productos
    const actualizarCelda = (id, field, newValue) => {
        let datos = JSON.parse(JSON.stringify(dataGrid))
        datos.data[id][field] = newValue
        setDataGrid({...dataGrid, data: datos.data})
        
        let cart = JSON.parse(JSON.stringify(carrito))
        cart[id][field] = newValue
        setCarrito(cart)
        
    }

    const eliminarRegistro = (e) => {
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Deseas eliminar el producto del carrito?', titulo: 'Eliminar producto'}})
        setIdDelete(e)
    }


    const response = (res) => {
        //Obs.: La función siempre eliminará el último producto del carrito, por ello, a partir del
        //producto a eliminar, se procede a mover los siguientes productos a la posición anterior a 
        //la que ocupaban en la lista, a partir de la posiciíón del elemento a eliminar, manteniendo
        //así los id's, eliminando sólo el último
        if(res && idDelete){   
            let obj = JSON.parse(JSON.stringify(carrito))   //Obteniendo una copia del carrito para trabajar sobre ella, así no se altera el STORE (almacen)
            let keys = Object.keys(obj)
            let move = false

            for(var i = 0; i < keys.length - 1; i++){

                // eslint-disable-next-line
                if(obj[keys[i]].id == idDelete){    //Encontrando el producto a eliminar
                    //Activando el dezplazamiento de los productos del carrito a partir del producto 
                    //actual, sólo si el id a eliminar es igual al id del elemento actual 
                    move = true
                }    
                if(move){
                    //Copiando el siguiente producto a la posición actual, manteniendo el id de 
                    //la posición actual del carrito
                    obj[keys[i]] = obj[keys[i+1]]   
                }
            }
            delete obj[keys[keys.length-1]] //Eliminando el último elemento del carrito
            setCarrito(obj)
        }
    }


    const calcularTotalNeto = () => {
        let total = 0
        dataGrid.data.forEach(i => total += (i.precio * i.cantidad))
        setTotalNeto(total)
    }


    const calcularImpuestos = () => {
        let impuestos = 0
        dataGrid.data.forEach(i => 
            impuestos += parseInt((i.precio * i.cantidad) * i.impuestos/100)
        )
        setImpuestos(impuestos)
    }


    const calcularSubTotal = () => {
        let subTotal = 0
        dataGrid.data.forEach(i => 
            subTotal += (i.precio * i.cantidad) + parseInt((i.precio * i.cantidad) * i.impuestos /100)
        )
        //setSubTotal(new Intl.NumberFormat("de-DE").format(subTotal))
        setSubTotal(subTotal)
    }
    

    const volver = () => {
        history.push('/')
    }


    const continuarCompra = () => {
        history.push('/IdentificacionCliente')
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
            continuarCompra={continuarCompra}
        />
    )
}