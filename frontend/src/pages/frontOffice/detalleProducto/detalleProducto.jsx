import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Tabs, Tab, Table } from 'react-bootstrap'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { find as buscarProducto}  from '../../../actions/productos'
import { find as buscarCategoria }  from '../../../actions/categorias'
import { find as buscarSubCategoria }  from '../../../actions/subCategorias'
import { find as buscarUnidad }  from '../../../actions/unidades'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { defaultImagesProducts } from '../../../shared/constantes'
import { FaShoppingCart, FaRegMoneyBillAlt } from 'react-icons/fa';
import './style.css'


export const DetalleProducto = (props) => {
    const id = useParams('id')
    const productoState = useSelector(state => state.ProductosReducer.producto)
    const unidadState = useSelector(state => state.UnidadesReducer.unidad)
    const categoriaState = useSelector(state => state.CategoriasReducer.categoria)
    const subCategoriaState = useSelector(state => state.SubCategoriasReducer.subCategoria)
    const [ itemCantidad, setItemCantidad ] = useState(1)
    const [ activeImage, setActiveImage ] = useState(defaultImagesProducts + 'not-found-image.jpg')
    const [ keyTab, setKeyTab ] = useState('caracteristicas')
    const [ showPreView, setShowPreView ] = useState(false)
    const [ errors, setErrors ] = useState({cantidad: ''})
    const [ carrito, setCarrito ] = useState({})
    const [ pagar, setPagar ] = useState(false)
    const [ textoBotonCarrito, setTextoBotonCarrito ] = useState('Agregar al carrito de compras')
    const dispatch = useDispatch()
    const history = useHistory()

    
    useEffect(()=>{
        if(id){
            dispatch(buscarProducto(id.id))
        }else{
            history.push('/')
        }
    },[dispatch, history, id])


    useEffect(()=>{
        if(productoState.id){
            dispatch(buscarCategoria(productoState.categoria_id))
            dispatch(buscarSubCategoria(productoState.sub_categoria_id))
            dispatch(buscarUnidad(productoState.unidad_id))
            let imgs = productoState.imagenes.filter(i => i.imagen_principal)
            setActiveImage(defaultImagesProducts + (imgs.length > 0 ? imgs[0].source_image : 'not-found-image.jpg'))
            let cart = localStorage.getItem('cart')
            if(cart){
                setCarrito(JSON.parse(cart))
            }
        }
    },[dispatch, productoState])


    useEffect(()=>{
        if(carrito[id.id]){
            setTextoBotonCarrito('Actualizar carrito de compras')
        }
        localStorage.setItem('cart',JSON.stringify(carrito))
    },[carrito])


    useEffect(()=>{
        if(pagar){
            history.push('/carrito')
        }
    },[pagar])

   
    const handlerInput = (e) => {
        validaDatos(e.target.name, e.target.value)
        setItemCantidad(e.target.value)
    }


    const selectImage = (src) => {
        setActiveImage(defaultImagesProducts + src)
    }


    const pagarProducto = () => {
        setPagar(true)
        setCarrito({...carrito, [id.id]:{producto: productoState, cantidad: itemCantidad}})
    }


    const agregarCarrito = () => {
        setCarrito({...carrito, [id.id]:{producto: productoState, cantidad: itemCantidad}})
    }


    const validaDatos = (field, value) => {
        switch(field){
            case 'cantidad':
                if(isNaN(value)){
                    setErrors({...errors, [field]: 'Debe ingresar una cantidad'})
                }else if(value <= 0){
                    setErrors({...errors, [field]: 'Debe ingresar un número mayor a 0'})
                }else if(value > productoState.stock){
                    setErrors({...errors, [field]: 'No hay suficiente stock, ingresa una cantidad menor'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            default:
                return setErrors({...errors, [field]: ''})
        }

    }


    return (
        <>
            <HeaderMarketComponent/>
                <Container>
                    <Row>
                        <Col><h4>Detalle del producto</h4></Col>
                    </Row>
                    {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
                    <Row className="header-info-producto">
                         {categoriaState?.nombre ? categoriaState.nombre : ''} {">"} 
                         {subCategoriaState?.nombre ? subCategoriaState.nombre : ''} {">"}  
                         {productoState?.nombre ? productoState.nombre : ''} 
                    </Row>
                    {/* Stack the columns on mobile by making one full-width and the other half-width */}
                    <Row>
                        <Col xs={12} md={6}>
                            <Row>
                                <Col xs="1" md="2">
                                    {productoState.imagenes.map((i, key) => {
                                        return <Row key={key}>
                                                    <Col className="col-miniatura-imagen-producto">
                                                        <img 
                                                            className="imagen-miniatura-producto"
                                                            src={defaultImagesProducts + i.source_image} 
                                                            alt={i.source_image}
                                                            onClick={() => selectImage(i.source_image)}
                                                        >   
                                                        </img>
                                                    </Col>
                                                </Row>
                                            })
                                    }
                                </Col>
                                <Col xs="11" md="10">
                                    <img 
                                        className="imagen-producto" 
                                        src={activeImage} 
                                        alt={productoState?.nombre ? productoState?.nombre : 'Foto producto'}
                                        onClick={()=>setShowPreView(true)}>
                                    </img>
                                </Col>
                            </Row>
                            
                        </Col>
                        <Col xs={6} md={6}>
                            <h2>{productoState.nombre}</h2>
                            <label>{productoState.descripcion}</label>
                            <Row>
                                <Form.Label column sm="6">Stock disponible: {productoState.stock} {unidadState.nombre_plural}</Form.Label>
                            </Row>
                            <Row>
                                <Form.Group as={Row} controlId="formTxtStock">
                                    <Form.Label column sm="3">Cantidad </Form.Label>
                                    <Col xs="9" md="4">
                                        <Form.Control 
                                            type="number" 
                                            name="cantidad"
                                            onChange={e => handlerInput(e)}
                                            value={itemCantidad}
                                            min="0"
                                            max={productoState.stock}
                                        ></Form.Control>
                                    </Col>
                                    <Form.Label column sm="3">{unidadState.nombre_plural}</Form.Label>
                                </Form.Group>
                                {errors.cantidad &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-3">{ errors.cantidad }</Form.Text>
                                    </Form.Group>
                                }
                                
                            </Row>
                            <Row>
                                <Col md="7">
                                    <Button 
                                        variant="primary" 
                                        onClick={() => agregarCarrito()}
                                        disabled={Object.keys(errors).filter(e => errors[e] !=='').length > 0}
                                    >
                                        {textoBotonCarrito} {"  "} 
                                        <FaShoppingCart/>
                                    </Button>
                                </Col>
                                <Col md="5">
                                    <Button 
                                        variant="success" 
                                        onClick={() => pagarProducto() }
                                        disabled={Object.keys(errors).filter(e => errors[e] !=='').length > 0}
                                    >
                                        Ir al carrito
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    {/* Columns are always 50% wide, on mobile and desktop */}
                    <Row>
                        <Tabs 
                            defaultActiveKey="profile" 
                            id="tab-detalles" 
                            className="tab-caracteristicas"
                            activeKey={keyTab}
                            onSelect={(k) => setKeyTab(k)}
                        >
                            <Tab eventKey="caracteristicas" title="Carácterísticas técnicas">
                                <Table striped bordered hover size="sm" responsive>
                                </Table>
                            </Tab>
                            <Tab eventKey="opiniones" title="Opiniones">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, sapiente. Suscipit, repellat 
                                numquam. Unde delectus fuga, est recusandae qui molestiae, laboriosam perspiciatis esse sed 
                                harum blanditiis amet provident quisquam nesciunt.
                            </Tab>
                        </Tabs>
                    </Row>
                </Container>
            <FooterComponent/>  
            {showPreView && <div className="preview-full-screen" onClick={() => setShowPreView(false)}>
                                <div></div>
                                <Form.Label>{productoState.nombre}</Form.Label>
                                <img src={activeImage} alt={activeImage} className="img-full-screen"></img>
                            </div>
            }
        </>
    )
}