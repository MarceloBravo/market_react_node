import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { find as detalleApp }  from '../../../actions/personalizar'
import { listar as listarRegiones } from '../../../actions/regiones'
import { listaProvinciasRegion } from '../../../actions/provincias'
import { listaComunasProvincia } from '../../../actions/comunas'
import { types as clientesTypes } from '../../../redux/Clientes/types'
import { initTransaction } from '../../../actions/webpay'
import { useHistory } from 'react-router-dom'
import { DatosDespachoContent } from './content'
import './style.css'
//npx browserslist@latest --update-db

export const DatosDespacho = () => {
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)
    const listaRegionesState = useSelector(state => state.RegionesReducer.list)
    const listaProvinciasState = useSelector(state => state.ProvinciasReducer.list)
    const listaComunasState = useSelector(state => state.ComunasReducer.list)
    const clienteState = useSelector(state => state.ClientesReducer.cliente)
    const webPayTransaccionState = useSelector(state => state.WebPayReducer.estado_transaccion)
    const [ totalNeto, setTotalNeto ] = useState(0)
    const [ subTotal, setSubTotal ] = useState(0)
    const [ impuestos, setImpuestos ] = useState(0) //Valor en impuestos
    // eslint-disable-next-line
    const [ despacho, setDespacho ] = useState(0)   //Valor del despacho
    const [ carrito, setCarrito ] = useState([])
    const [ regiones, setRegiones ] = useState([])
    const [ provincias, setProvincias ] = useState([])
    const [ comunas, setComunas ] = useState([])
    const [ cliente, setCliente ] = useState({rut: '', nombres: '', apellido1: '', apellido2: '', fono: '', email: '', direccion: '', cod_region: '', cod_provincia: '', cod_comuna: '', ciudad: '', casa_num: '', block_num: '', referencia: ''})
    const [ errors, setErrors ] = useState({direccion: '', cod_region: '', cod_provincia: '', cod_comuna: '', ciudad: '', casa_num: '', block_num: '', referencia: ''})
    const [ disabledButtonContinuar, setDisabledButtonContinuar ] = useState(true)
    const [ webpayEndPoint, setWebpayEndPoint ] = useState('')
    const [ token, setToken ] = useState('')
    const dispatch = useDispatch()
    const btnSubmitWebPay = useRef(null)
    const history = useHistory()


    useEffect(()=>{
        dispatch(detalleApp())
        dispatch(listarRegiones())
        dispatch({type: clientesTypes.GET_CURRENT_STATE})
    },[dispatch])


    useEffect(()=>{
        let cart = localStorage.getItem(`cart-${infoTiendaState.nombre_tienda}`)
        if(cart){
            setCarrito(JSON.parse(cart))
        }
    },[infoTiendaState])


    useEffect(()=>{
        setRegiones(listaRegionesState.sort((a,b) => a.codigo - b.codigo))
    },[listaRegionesState])


    useEffect(()=>{
        setProvincias(listaProvinciasState.sort((a,b) => a.codigo - b.codigo))
    },[listaProvinciasState])


    useEffect(()=>{
        setComunas(listaComunasState.sort((a,b) => a.codigo - b.codigo))
    },[listaComunasState])


    useEffect(()=>{
        if(Object.keys(carrito).length > 0){
            let netTot = 0, tax = 0, subTot = 0
             Object.keys(carrito).forEach(element => {
                netTot += parseInt(carrito[element].precio) * parseInt(carrito[element].cantidad)
                tax += (parseInt(carrito[element].precio) * (parseInt(carrito[element].impuestos) / 100) * parseInt(carrito[element].cantidad))
                subTot +=  parseInt(carrito[element].precio) * parseInt(carrito[element].cantidad) + (parseInt(carrito[element].precio) * (parseInt(carrito[element].impuestos) / 100) * parseInt(carrito[element].cantidad))
            });
            setTotalNeto(netTot)
            setImpuestos(tax)
            setSubTotal(subTot)
        }
    },[carrito])

    
    useEffect(()=>{
        setDisabledButtonContinuar(Object.keys(errors).filter(e => errors[e] !== '').length > 0 || Object.keys(cliente).filter(c => c !== 'block_num' && c !== 'referencia' && cliente[c] === '').length > 0)
        // eslint-disable-next-line
    },[errors])


    useEffect(()=>{
        setCliente(clienteState)
        if(clienteState.cod_region){
            dispatch(listaProvinciasRegion(clienteState.cod_region))
        }
        if(clienteState.cod_provincia){
            dispatch(listaComunasProvincia(clienteState.cod_provincia))
        }
        // eslint-disable-next-line
    },[clienteState])


    useEffect(()=>{
        setDisabledButtonContinuar(Object.keys(errors).filter(e => errors[e] !== '').length > 0 || Object.keys(cliente).filter(c => c !== 'block_num' && c !== 'referencia' && cliente[c] === '').length > 0)
        // eslint-disable-next-line
    },[cliente])


    useEffect(()=>{
        console.log('webPayTransaccionState', webPayTransaccionState)
        if(webPayTransaccionState?.token && webPayTransaccionState?.url){
            setWebpayEndPoint(webPayTransaccionState.url)
            setToken(webPayTransaccionState.token)
        }
    },[dispatch, webPayTransaccionState])


    useEffect(()=>{
        if(webpayEndPoint && token){
            //Almacenando el token para leerlo luego de volver de la página de WebPay, en el 
            //componente ResultadoVentaWebPayComponent
            sessionStorage.setItem(infoTiendaState.nombre_tienda + '-webpay-token', token)
            btnSubmitWebPay.current.click() //Redireccionando a la página de WebPay
        }
        // eslint-disable-next-line
    },[webpayEndPoint, token])
    


    const handlerChangeValue = (e) => {
        validaDatos(e.target.name, e.target.value)
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    
    const cargarProvincias = (e) => {
        dispatch(listaProvinciasRegion(e.target.value))
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }


    const cargarComunas = (e) => {
        dispatch(listaComunasProvincia(e.target.value))
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }


    const volver = () => {
        history.push('/')
    }


    const continuarCompra = () => {
        //Iniciando una transacción en WebPay (solicitando la obtención de un token y la url de pago, el 
        //backend efectúa la solicitud de token y url)
        dispatch(initTransaction({
            buy_order: `${Math.floor(Math.random() * 10000)}`, 
            session_id: `${Math.floor(Math.random() * 10000)+10000}`, 
            amount: parseInt(subTotal + despacho), 
            return_url: 'http://192.168.43.118:3001/webpay_plus/success'
        }))
    }
    

    const validaDatos = (field, value) => {
        switch(field){
            case 'direccion':
                if(value.length === 0){
                    setErrors({...errors, [field]:'La dirección es obligatoria.'})
                }else if(value.length < 7){
                    setErrors({...errors, [field]:'Ingrese una dirección más larga.'})
                }else if(value.length > 255 ){
                    setErrors({...errors, [field]:'Ingrese una dirección más corta.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'cod_region':
            case 'cod_provincia':
            case 'cod_comuna':
                if(value.length === 0){
                    setErrors({...errors, [field]:`Dbe seleccionar una ${field === 'cod_region' ? 'región' : (field === 'cod_provincia' ? 'provincia' : 'comuna')}.`})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'ciudad':
                if(value.length === 0){
                    setErrors({...errors, [field]:'La ciudad es obligatoria.'})
                }else if(value.length < 3){
                    setErrors({...errors, [field]:'Ingrese una ciudad más larga.'})
                }else if(value.length > 20 ){
                    setErrors({...errors, [field]:'Ingrese una ciudad más corta.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'casa_num':
                if(value.length === 0){
                    setErrors({...errors, [field]:'El número de casa es obligatorio.'})
                }else if(value.length > 10 ){
                    setErrors({...errors, [field]:'Ingrese un número más corto.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'block_num':
                if(value.length > 10 ){
                    setErrors({...errors, [field]:'Ingrese un número más corto.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'referencia':
                if(value.length > 255 ){
                    setErrors({...errors, [field]:'Ingrese una referencia más corta.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            default:
                setErrors({...errors, [field]: ''})
        }
    }


    return (
        <DatosDespachoContent 
            cliente={cliente} 
            handlerChangeValue={handlerChangeValue} 
            errors={errors} 
            cargarProvincias={cargarProvincias} 
            cargarComunas={cargarComunas} 
            regiones={regiones} 
            provincias={provincias} 
            comunas={comunas} 
            totalNeto={totalNeto}
            subTotal={subTotal}
            impuestos={impuestos}
            volver={volver}
            continuarCompra={continuarCompra}
            despacho={despacho}         
            disabledButtonContinuar={disabledButtonContinuar}
            webpayEndPoint={webpayEndPoint}
            token={token} 
            btnSubmitWebPay={btnSubmitWebPay}
        />
    )
}
