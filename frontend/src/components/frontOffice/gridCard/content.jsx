import React from 'react'
import { Container, Row, Col, Form, Card } from 'react-bootstrap'
import { defaultImagesProducts } from '../../../shared/constantes'
import { formatearPrecio } from '../../../shared/funciones'

export const GridCardContent = (props) => {
    const { 
        title, 
        ocultarItemsPorPagina, 
        itemsPerPage, 
        itemsPerPageOnChange, 
        arrOptions, 
        ocultarOrdenarPor,
        orderBy, 
        orderByOnChange,
        showFindTextBox, 
        handlerFilter,
        data,
        detalleProducto
    } = props

    return (
        <div>
            {title && <div className="div-title">{title}</div>}
            <Container className="top-grid-form">
                <Row>
                    {!ocultarItemsPorPagina && <Col className="align-left">
                        
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column className="select-label">Items por página</Form.Label>
                            <Col md="3">
                                <Form.Control 
                                    as="select"
                                    name="roles_id" 
                                    value={itemsPerPage}
                                    onChange={e => itemsPerPageOnChange(e)}
                                >
                                    {arrOptions && arrOptions.map((i, key) =>{
                                        return <option key={key} value={i}>{i}</option>
                                    })}

                                </Form.Control>
                            </Col>
                            
                        </Form.Group>

                    </Col>}

                    {!ocultarOrdenarPor && <Col>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column className="select-label">Ordenar por</Form.Label>
                            <Col md="8">
                                <Form.Control 
                                    as="select"
                                    name="roles_id" 
                                    value={orderBy}
                                    onChange={e => orderByOnChange(e)}
                                >
                                    <option value="1">Menor a mayor precio</option>
                                    <option value="2">Mayor a menor precio</option>
                                    <option value="3">Más vendidos primero</option>
                                    <option value="4">Menos vendidos primero</option>
                                    <option value="5">Recién llegados primero</option>
                                    <option value="6">Recién llegados al final</option>
                                </Form.Control>
                            </Col>
                            
                        </Form.Group>
                    </Col>}
                    
                    {showFindTextBox && <Col className="align-right">
                        <Form.Control type="text" placeholder="Escribe lo que buscas" onBlur={e => handlerFilter(e)}/>
                    </Col>}
                </Row>
            </Container>
            

            <Container>
                <Row>
                {data && data.data && data.data.map((value, key) => {
                    return <Col key={key} className="col-card">
                                <Card style={{ width: '10rem' }} className="card-grid">
                                    <Card.Img variant="top" src={defaultImagesProducts + value.source_image} className="card-image"/>
                                    <Card.Body>
                                        <Card.Title>{value.titulo}</Card.Title>
                                        <Card.Text>
                                            <label>
                                                {value.nombre} 
                                            </label>
                                            <label>
                                                $ {formatearPrecio(value.precio_venta_normal, value.total_impuestos)} 
                                            </label>
                                            <label>
                                                {value.stock} disponibles
                                            </label>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="show-product" onClick={() => detalleProducto(value.id)}>
                                        <small className="text-muted">Ver producto</small>
                                    </Card.Footer>
                                </Card>

                            </Col>
                })}
                </Row>
            </Container>

        </div>
    )
}