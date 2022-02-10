import React from 'react'
import { Container, Row, Col, Form, Button, Tabs, Tab, Table } from 'react-bootstrap'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { FaShoppingCart } from 'react-icons/fa';
import { formatearPrecio }  from '../../../shared/funciones'

export const DetalleProductoContent = (props) => {
    const { 
        categoriaState, 
        subCategoriaState, 
        productoState, 
        defaultImagesProducts, 
        selectImage, 
        activeImage, 
        setShowPreView, 
        unidadState,
        handlerInput, 
        errors, 
        agregarCarrito, 
        itemCantidad, 
        textoBotonCarrito, 
        pagarProducto, 
        keyTab, 
        setKeyTab, 
        showPreView,
        volverAlCatalogo, 
        handlerChangeSelect,
        itemTalla, 
        tallasState
    } = props

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
                                <Col xs="12" md="2" className="miniature-container">
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
                                <Col xs="12" md="10">
                                    <img 
                                        className="imagen-producto" 
                                        src={activeImage} 
                                        alt={productoState?.nombre ? productoState?.nombre : 'Foto producto'}
                                        onClick={()=>setShowPreView(true)}>
                                    </img>
                                </Col>
                            </Row>
                            
                        </Col>
                        <Col xs={12} md={6}>
                            <h2>{productoState.nombre}</h2>
                            <Row>
                                <Form.Label column sm="12">{productoState.descripcion}</Form.Label>
                            </Row>
                            <Row>
                                <Form.Label column sm="6">Stock disponible: {productoState.stock} {unidadState.nombre_plural}</Form.Label>
                            </Row>
                            <Row>
                                <Form.Label column sm="6">Precio : $ {formatearPrecio(productoState.precio_actual, productoState.total_impuestos)} </Form.Label>
                            </Row>
                            <Row>
                                <Form.Label>Stock: {productoState.stock} unidades disponibles</Form.Label>
                            </Row>
                            <Row className="row-cantidad">
                                <Form.Group as={Row} controlId="formTxtStock">
                                    <Form.Label column xs="3" sm="3">Cantidad </Form.Label>
                                    <Col xs="3" md="4">
                                        <Form.Control 
                                            type="number" 
                                            name="cantidad"
                                            onChange={e => handlerInput(e)}
                                            value={itemCantidad}
                                            min="0"
                                            max={productoState.stock}
                                        ></Form.Control>
                                    </Col>
                                    <Form.Label column xs="3" sm="3">{unidadState.nombre_plural}</Form.Label>
                                </Form.Group>
                                {errors.cantidad &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-3">{ errors.cantidad }</Form.Text>
                                    </Form.Group>
                                }
                                
                            </Row>
                            
                            {tallasState.length >0 &&
                                <Row>
                                    <Form.Group as={Row} controlId="formTxtCategoria">
                                        <Form.Label column sm="3">Talla</Form.Label>
                                        <Col xs="3" md="2">
                                            <Form.Control
                                                as="select"
                                                name="tallas_id"
                                                value={itemTalla}
                                                onChange={e => handlerChangeSelect(e)}
                                            >
                                                {tallasState.map((i, key) => {
                                                        return <option key={key} value={i.id}>{i.talla}</option>
                                                    })
                                                }
                                            </Form.Control>
                                        </Col>
                                        
                                    </Form.Group>
                                    {errors.impuestos_id &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error offset-2">{ errors.tallas_id }</Form.Text>
                                        </Form.Group>
                                    }

                                </Row>
                            }


                            
                            <br/>
                            <Row className="container-button">

                                <Col md="4">
                                    <Button 
                                        variant="primary" 
                                        onClick={() => agregarCarrito()}
                                        disabled={Object.keys(errors).filter(e => errors[e] !=='').length > 0 || productoState.stock === 0}
                                    >
                                        {textoBotonCarrito} {"  "} 
                                        <FaShoppingCart/>
                                    </Button>
                                </Col>    
                            
                                <Col md="4">
                                    <Button 
                                        variant="danger" 
                                        onClick={() => pagarProducto() }
                                        disabled={Object.keys(errors).filter(e => errors[e] !=='').length > 0}
                                    >
                                        Ir al carrito
                                    </Button>
                                </Col>
                            
                                <Col md="4">
                                    <Button 
                                        variant="primary" 
                                        onClick={() => volverAlCatalogo() }
                                    >
                                        Seguir comprando
                                    </Button>
                                </Col>

                            </Row>
                            
                        </Col>
                    </Row>

                    {/* Columns are always 50% wide, on mobile and desktop */}
                    <Row className="details-section">
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
                
            <FooterComponent />  
            {showPreView && <div className="preview-full-screen" onClick={() => setShowPreView(false)}>
                                <div></div>
                                <Form.Label>{productoState.nombre}</Form.Label>
                                <img src={activeImage} alt={activeImage} className="img-full-screen"></img>
                            </div>
            }
        </>
    )
}