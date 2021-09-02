import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getData as detalleApp } from '../../../../actions/infoTienda'
import { confirmTransaction} from '../../../../actions/webpay'
import { searchByCode } from '../../../../actions/tiposPago'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { registrar as registrarVenta } from '../../../../actions/ventas'
import { ResultadoVentaContent } from './content'
//yarn add @react-pdf/renderer
//import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import './style.css'


export const ResultadoVentaWebPayComponent = () => {
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)
    const transactionStatus = useSelector(state => state.WebPayReducer.estado_transaccion)
    const tipoAlertaState = useSelector(state => state.AlertaReducer.tipo)
    const tipoPagoState = useSelector(state => state.TiposPagoReducer.tipoPago)
    const [ datosVenta, setDatosVenta ] = useState({
        id: null, 
        total: null, 
        cliente_id: null,  
        datos_cliente: null, 
        productos: null, 
        despacho: null, 
        datos_webpay: null,
    })
    const [ token, setToken ] = useState('')
    const [ carrito, setCarrito ] = useState(null)
    const [ impuestos, setImpuestos ] = useState(0)
    const [ cliente, setCliente ] = useState(null)
    const [ dataPDF, setDataPDF ] = useState(null)
    const [ nombreTienda, setNombreTienda ]= useState('')
    const dispatch = useDispatch()
    const history = useHistory()



    useEffect(()=>{
        dispatch(detalleApp())
    },[dispatch])


    useEffect(()=>{
        if(infoTiendaState.nombre_tienda){
            setNombreTienda(infoTiendaState.nombre_tienda)
            setToken(sessionStorage.getItem(infoTiendaState.nombre_tienda + '-webpay-token'))
            let cart = JSON.parse(localStorage.getItem('cart-'+infoTiendaState.nombre_tienda))
            if(cart){
                setCarrito(cart)
                console.log('datosVenta', cart)
                setDatosVenta({...datosVenta, productos: Object.keys(cart).map(item => cart[item])})
                setCliente(JSON.parse(localStorage.getItem(`cliente-${infoTiendaState.nombre_tienda}`)))
            }
        }
        // eslint-disable-next-line
    },[infoTiendaState])


    useEffect(()=>{
        if(token){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(confirmTransaction(token))
        }
    },[dispatch, token])


    useEffect(()=>{
        if(transactionStatus?.payment_type_code){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(searchByCode(transactionStatus.payment_type_code))
            setDatosVenta({...datosVenta, total: transactionStatus.amount, datos_webpay: transactionStatus})
        }
    // eslint-disable-next-line
    },[transactionStatus])


    useEffect(()=>{
        if(carrito){
            totalIva()
        }
    // eslint-disable-next-line
    },[carrito])


    useEffect(()=>{
        if(cliente){
            setDatosVenta({...datosVenta, 
                cliente_id: cliente.id,
                datos_cliente: {
                                id: cliente.id,
                                rut: cliente.rut,
                                nombres: cliente.nombres,
                                apellido1: cliente.apellido1,
                                apellido2: cliente.apellido2,
                                email: cliente.email,
                                fono: cliente.fono,
                            },
                despacho: {
                            direccion: cliente.direccion,
                            cod_region: cliente.cod_region,
                            cod_provincia: cliente.cod_provincia,
                            cod_comuna: cliente.cod_comuna,
                            ciudad: cliente.ciudad,
                            casa_num: cliente.casa_num,
                            block_num: cliente.block_num,
                            referencia: cliente.referencia,
                            shipping_cod: 1,
                        }
                    })
                }
    // eslint-disable-next-line
    },[cliente])


    useEffect(()=>{
        if(datosVenta.total && 
            datosVenta.datos_cliente && 
            datosVenta.despacho && 
            datosVenta.datos_webpay && 
            datosVenta.productos?.length > 0){
                //Registrar venta en base de datos
                dispatch(registrarVenta(datosVenta))
        }
    },[datosVenta, dispatch])


    useEffect(()=>{
        if(tipoAlertaState === 'success' && datosVenta.total){  //Los datos del carrito han sido grabados en la base de datos exitosamente
            //Eliminando el carrito de compras
            localStorage.removeItem('cart-'+infoTiendaState.nombre_tienda)
        }
        // eslint-disable-next-line
    },[tipoAlertaState])


    useEffect(()=>{
        if(transactionStatus && tipoPagoState && impuestos){
            let obj = Object.assign({},transactionStatus, tipoPagoState, {impuestos})
            console.log('dataPDF',obj)
            setDataPDF(obj)
        }
    },[transactionStatus, tipoPagoState, impuestos])


/*  
    useEffect(()=>{
        setHtml(`<html>
            <body>
                <style>
                .table{
                    display: table;
                    width: 100%;
                }
        
                .datos-tienda{
                    display: table-cell;
                    width: 65%;
                }
                
                .nombre-tienda{
                    font-size: x-large;
                }
                
                .box-doc-number{
                    border: solid red;
                    height: 100;
                    text-align: center;
                }
                
                .doc-number{
                    height: inherit;
                }
                
                .label-order-number{
                    top: 10%;
                    width: 100%;
                    position: relative;
                    color: red;
                    font-size: x-large;
                    display: flow-root;
                }
                
                .order-number{
                    top: 42%;
                    width: 100%;
                    color: red;
                    left: -21%;
                    font-size: x-large;
                    line-height: 3em;
                }
                
                .divider{
                    height: 20px;
                }
                
                table{
                    width: 100%;
                    border: solid thin;
                    border-collapse: collapse;
                    border-bottom: none;
                    border-left: none;
                }
                
                .resumen-col-precio,
                .resumen-col-cantidad,
                .resumen-cel-titulo{
                    width: 25%;
                    text-align: right;
                }
                
                th, td{
                    border: solid thin;
                }
                
                .empty-cell{
                    border-left: none;
                    border: none;
                }
                
                </style>
                <div class="table">
                    <div class="datos-tienda">
                        <div class="nombre-tienda">Nombre tienda</div>
                        <div>Descripción del giro</div>
                        <div>Fecha</div>
                        <div>N° Trajeta</div>
                        <div>Cód de autorización</div>
                        <div>Forma de pago</div>
                    </div>
                    <div class="box-doc-number">
                        <div class="doc-number">
                            <label class="label-order-number">Orden de Compra N°</label>
                            <label class="order-number">0000003467</label>
                        </div>
                    </div>
                </div>
                <div class="divider">
                </div>
                
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{carrito[item].nombre}</td>
                                <td class="resumen-col-cantidad">3</td>
                                <td class="resumen-col-precio">$ 120.000</td>
                            </tr>
                            <tr>
                                <td class="empty-cell"></td>
                                <td class="resumen-cel-titulo">Impuestos</td>
                                <td class="resumen-col-precio">
                                    $ 19000
                                </td>
                            </tr>
                            <tr>
                                <td class="empty-cell"></td>
                                <td class="resumen-cel-titulo">Despacho</td>
                                <td class="resumen-col-precio">
                                    $ 123456
                                </td>
                            </tr>
                            <tr>
                                <td class="empty-cell"></td>
                                <td class="resumen-cel-titulo">Total</td>
                                <td class="resumen-col-precio">
                                    $ 123456
                                </td>
                            </tr>
        
                        </tbody>
                        
                    </Table>
                
            </body>
        </html>`)
    },[dataPDF])
*/
    const goToInicio = () => {
        history.push('/')
    }


    const totalIva = () => {
        if(carrito && Object.keys(carrito).length > 0){
            let tax = 0
            Object.keys(carrito).forEach(element => {
                tax += (parseInt(carrito[element].precio) * (parseInt(carrito[element].impuestos) / 100) * parseInt(carrito[element].cantidad))
            })
            setImpuestos(tax)
        }
    }




    return (
        <ResultadoVentaContent 
            tipoAlertaState={tipoAlertaState}  
            transactionStatus={transactionStatus} 
            tipoPagoState={tipoPagoState} 
            carrito={carrito} 
            impuestos={impuestos} 
            goToInicio={goToInicio}
            dataPDF={dataPDF}
            nombreTienda={nombreTienda}
            //html={html}
        />        
    )
}
