import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getData as detalleApp } from '../../../../actions/infoTienda'
import { confirmTransaction} from '../../../../actions/webpay'
import { searchByCode } from '../../../../actions/tiposPago'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { registrar as registrarVenta } from '../../../../actions/ventas'
import { ResultadoVentaContent } from './content'
//import { bodyPDF }  from '../../../../shared/funciones'
import { sendEmail as enviarEmail } from '../../../../actions/email'

import jsPDF from 'jspdf'   //https://www.npmjs.com/package/jspdf
import 'jspdf-autotable'    //https://www.npmjs.com/package/jspdf-autotable
//yarn add @react-pdf/renderer

//Documentación de envío de email con emailJS: https://mailtrap.io/blog/react-send-email/
//import emailjs from 'emailjs-com';
//import { USER_ID, TEMPLATE_ID } from '../../../../shared/emailkey'

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
            setDataPDF(obj)
        }
    },[transactionStatus, tipoPagoState, impuestos])



    const getHtmlBoleta = () =>{
        let numBoleta = `${datosVenta.datos_webpay.buy_order}`.padStart(6, '0')
        let hoy = new Date()
        let fecha = `${(hoy.getDay() ? '0' : '') + hoy.getDay()}/${(hoy.getMonth() < 10 ? '0' : '') + hoy.getMonth()}/${hoy.getFullYear()}`
        let detalle = ''
        let total = 0
        datosVenta.productos.forEach(e => {
                detalle += `<tr>
                                <td>${e.nombre}</td>
                                <td class="resumen-col-cantidad">${e.str_precio}</td>
                                <td class="resumen-col-precio">${e.cantidad}</td>
                                <td>$ ${toString(formatNumber(e.precio * e.cantidad), 12)}</td>
                            </tr>`
                total += (e.cantidad * e.precio)
            })

        if(detalle.length > 0){
            detalle += `<tr><td></td><td></td><td>Total</td><td>$ ${toString(formatNumber(total), 12)}</td></tr>`
        }

        let html = `<html>
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
                        <div class="nombre-tienda">${nombreTienda}</div>
                        <div>Descripción del giro</div>
                        <div>Fecha: ${fecha}</div>
                        <div>N° Dirección: ${infoTiendaState.direccion}</div>
                        <div>Email: ${infoTiendaState.email}</div>
                        <div>Fono venta: ${infoTiendaState.fono_venta}</div>
                    </div>
                    <div class="box-doc-number">
                        <div class="doc-number">
                            <label class="label-order-number">Boleta N°</label>
                            <label class="order-number">${numBoleta}</label>
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
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${detalle}
                        </tbody>
                        
                    </Table>
                
            </body>
        </html>`

        return html;
    }


    const toString = (number, longitud) => {
        return `${number}`.padStart(longitud, ' ')
    }

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


    
    const sendEmail = (e) => {
        dispatch({type: spinnerTypes.SHOW_SPINNER}) //Muestra la pantalla de espera con el spinner girando

        dispatch(
            enviarEmail({
                from: `${nombreTienda} <${infoTiendaState.email}>`,
                to: datosVenta.datos_cliente.email,
                subject: 'Comprobante de compra',
                text: '',
                html: getHtmlBoleta()
            })
        )
    }

    //Documentación de envío de email con emailJS: https://mailtrap.io/blog/react-send-email/
    //https://www.emailjs.com/faq/
    //https://www.emailjs.com/docs/examples/reactjs/
    /*
    const sendEmail = (e) => {
        e.preventDefault(); // Prevents default refresh by the browser

        dispatch(
            enviarEmail({
                from: nombreTienda,
                to: datosVenta.datos_cliente.email,
                subject: 'Comprobante de compra',
                text: '',
                html: ''
            })
        )

        
        emailjs.send(
            `service_gr8qyxi`, 
            TEMPLATE_ID, 
            {
                to_name: 'Marcelo Bravo', 
                content: '',
                html: bodyPDF(infoTiendaState.nombre_tienda, dataPDF, carrito), 
                from_name: infoTiendaState.nombre_tienda, 
                reply_to: 'mabc@live.cl',
                //content: btoa(generateHtmlPDF(infoTiendaState.nombre_tienda, dataPDF, carrito))
            }, 
            USER_ID).then((result) => {
                console.log("Message Sent, We will get back to you shortly", result.text);
            },(error) => {
                console.log("An error occurred, Please try again", error.text);
            });
            
    };
    */

    const formatNumber = e => {
        return new Intl.NumberFormat("de-DE").format(e) //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
    }


    const generarBoleta = () => {
        const fecha = new Date()
        var doc = new jsPDF('portrait','px','a4','false');
        doc.setFont('Helvetica','bold');
        doc.setFontSize(20)
        doc.setTextColor('red')
        doc.text(290, 40, 'Boleta N°')
        doc.text(300, 60, `${datosVenta.datos_webpay.buy_order}`.padStart(6, '0'))

        //Dibujando el marco de color rojo en trorno al número de la boleta
        doc.setLineWidth(1.5);  //https://github.com/parallax/jsPDF/issues/1331
        doc.setDrawColor('red');
        doc.line(250, 20, 400, 20);
        doc.line(250, 20, 250, 80);
        doc.line(250, 80, 400, 80);
        doc.line(400, 20, 400, 80);

        //Imprimiendo los datos de la boleta
        doc.setTextColor('black')
        doc.setFontSize(20);
        doc.text(20, 30, nombreTienda);
        doc.setFontSize(10);
        doc.text(30, 65, 'Fecha:');
        
        doc.text(30, 80, 'Dirección:')
        doc.text(30, 95, 'email:')
        doc.text(30, 110, 'Fono venta')

        doc.setFont('Helvetica','normal')
        doc.text(80, 65, `${(fecha.getDay() ? '0' : '') + fecha.getDay()}/${(fecha.getMonth() < 10 ? '0' : '') + fecha.getMonth()}/${fecha.getFullYear()}`);
        doc.text(80, 80, infoTiendaState.direccion)
        doc.text(80, 95, infoTiendaState.email)
        doc.text(80, 110, infoTiendaState.fono_venta)
        
        var table = datosVenta.productos.map(e => {
            return [e.nombre, e.str_precio, e.cantidad, '$ ' + `${formatNumber(e.precio * e.cantidad)}`.padStart(12, ' ')]    //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
        })

        table.push(['','','Total','$ ' + `${formatNumber(datosVenta.total)}`.padStart(12, ' ')])

        doc.autoTable({
            startY: 150,
            theme: 'grid',
            head: [['Producto','Precio','Cant.','Subtotal']],
            body: table
        })
        doc.save()
        
        //doc.html(detalle, {callback: function(doc){doc.setFont('Helvetica','normal'); doc.setFontSize(10); doc.save()}, x: 10, y: 60, width: 100})
        
        //doc.save()
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
            sendEmail={sendEmail}
            generarBoleta={generarBoleta}
        />        
    )
}
