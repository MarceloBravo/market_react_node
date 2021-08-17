import React, { useState, useEffect } from 'react'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { Alerta } from '../../../components/shared/alerts'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { ResumenVentaComponent } from '../../../components/frontOffice/resumenVenta/resumenVenta'
import { useSelector, useDispatch } from 'react-redux'
import { find as detalleApp }  from '../../../actions/personalizar'
import { listar as listarRegiones } from '../../../actions/regiones'
import { listaProvinciasRegion } from '../../../actions/provincias'
import { listaComunasProvincia } from '../../../actions/comunas'
import { types as clientesTypes } from '../../../redux/Clientes/types'
//npx browserslist@latest --update-db

export const DatosDespacho = () => {
    const appState = useSelector(state => state.PersonalizarReducer.config)
    const listaRegionesState = useSelector(state => state.RegionesReducer.list)
    const listaProvinciasState = useSelector(state => state.ProvinciasReducer.list)
    const listaComunasState = useSelector(state => state.ComunasReducer.list)
    const clienteState = useSelector(state => state.ClientesReducer.cliente)
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
    const  [ disabledButtonContinuar, setDisabledButtonContinuar ] = useState(true)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(detalleApp())
        dispatch(listarRegiones())
        dispatch({type: clientesTypes.GET_CURRENT_STATE})
    },[dispatch])


    useEffect(()=>{
        let cart = localStorage.getItem(`cart-${appState.nombre_app}`)
        if(cart){
            setCarrito(JSON.parse(cart))
        }
    },[appState])


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
        if(carrito?.length > 0){
            let netTot = 0, tax = 0, subTot = 0
             carrito.forEach(element => {
                netTot += parseInt(element.precio) * parseInt(element.cantidad)
                tax += (parseInt(element.precio) * (parseInt(element.impuestos) / 100) * parseInt(element.cantidad))
                subTot +=  parseInt(element.precio) * parseInt(element.cantidad) + (parseInt(element.precio) * (parseInt(element.impuestos) / 100) * parseInt(element.cantidad))
            });
            setTotalNeto(netTot)
            setImpuestos(tax)
            setSubTotal(subTot)
        }
    },[carrito])

    
    useEffect(()=>{
        setDisabledButtonContinuar(Object.keys(errors).filter(e => errors[e] !== '').length > 0 || Object.keys(cliente).filter(c => cliente[c] === '').length > 0)
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
        setDisabledButtonContinuar(Object.keys(errors).filter(e => errors[e] !== '').length > 0 || Object.keys(cliente).filter(c => cliente[c] === '').length > 0)
        // eslint-disable-next-line
    },[cliente])


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

    }


    const continuarCompra = () => {

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
        <>
            <HeaderMarketComponent />
            <Container>
                <Alerta />
                <Row>
                    <Col>
                        <h4>Datos de despacho</h4>
                    </Col>
                    <Col>
                        <h4 className="titulo-paso">Paso 2</h4>
                    </Col>                    
                </Row>
                <Row>
                    <Col md="8">


                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="direccion"
                                    placeholder="Dirección de despacho" 
                                    value={cliente.direccion}
                                    onChange={e => handlerChangeValue(e)}    
                                />
                                {errors.direccion  &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error">{ errors.direccion }</Form.Text>
                                    </Form.Group>
                                }
                            </Form.Group>

                            <Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Región</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        name="cod_region" 
                                        value={cliente.cod_region}
                                        onChange={e => cargarProvincias(e)}
                                    >
                                        {regiones.length === 0 && <option key="-1" value="">-- No se han encontrado regiones --</option> }
                                        {regiones.length > 0 && <option key="-1" value="">-- Seleccione --</option> }
                                        {regiones.map((r,key) => {
                                            return  <option key={key} value={r.codigo}>{r.nombre}</option>
                                        })}
                                        {errors.cod_region  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.cod_region }</Form.Text>
                                        </Form.Group>
                                    }
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Provincia</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        name="cod_provincia" 
                                        value={cliente.cod_provincia}
                                        onChange={e => cargarComunas(e)}
                                    >
                                        {provincias.length === 0 && <option key="-1" value="">-- No se han encontrado provincias --</option> }
                                        {provincias.length > 0 && <option key="-1" value="">-- Seleccione --</option> }
                                        {provincias.map((c,key) => {
                                            return  <option key={key} value={c.codigo}>{c.nombre}</option>
                                        })}
                                        {errors.cod_provincia  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.cod_provincia }</Form.Text>
                                        </Form.Group>
                                    }
                                    </Form.Control>
                                    
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Comuna</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        name="cod_comuna" 
                                        value={cliente.cod_comuna}
                                        onChange={e => handlerChangeValue(e)}
                                    >
                                        {comunas.length === 0 && <option key="-1" value="">-- No se han encontrado comunas --</option> }
                                        {comunas.length > 0 && <option key="-1" value="">-- Seleccione --</option> }
                                        {comunas.map((c,key) => {
                                            return  <option key={key} value={c.codigo}>{c.nombre}</option>
                                        })}
                                        {errors.cod_comuna  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.cod_comuna }</Form.Text>
                                        </Form.Group>
                                    }
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        name="ciudad" 
                                        placeholder="Ciuidad"
                                        value={cliente.ciudad}
                                        onChange={e => handlerChangeValue(e)}
                                    />
                                    {errors.ciudad  &&
                                        <Form.Group as={Row}>
                                            <Form.Text className="field-error">{ errors.ciudad }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>

                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Casa número</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="casa_num"
                                        placeholder="Número de casa" 
                                        value={cliente.casa_num}
                                        onChange={e => handlerChangeValue(e)}    
                                    />
                                    {errors.casa_num  &&
                                        <Form.Group as={Row}>
                                            <Form.Text className="field-error">{ errors.casa_num }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Block N°</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="block_num"
                                        placeholder="Número de block (Opcional)" 
                                        value={cliente.block_num}
                                        onChange={e => handlerChangeValue(e)}
                                    />
                                    {errors.block_num  &&
                                        <Form.Group as={Row}>
                                            <Form.Text className="field-error">{ errors.block_num }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Referencia</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="referencia"
                                    placeholder="Cómo llegar... (Opcional)" 
                                    value={cliente.referencia}
                                    onChange={e => handlerChangeValue(e)}    
                                />
                                {errors.referencia  &&
                                    <Form.Group as={Row}>
                                        <Form.Text className="field-error">{ errors.referencia }</Form.Text>
                                    </Form.Group>
                                }
                            </Form.Group>

                    </Col>
                    <Col md="4">
                        <ResumenVentaComponent 
                            totalNeto={totalNeto} 
                            subTotal={subTotal}
                            impuestos={impuestos}
                            volver={volver}
                            continuarCompra={continuarCompra}
                            despacho={despacho}
                            disabledButton1={disabledButtonContinuar}
                            textoContinuarCompra={'Continuar con el pago'}
                            textoVolver={'Volver al carrito de compras'}
                        />
                    </Col>
                </Row>
                <Row className="row-bottom">

                </Row>
            </Container>
            <FooterComponent />
        </>
    )
}
