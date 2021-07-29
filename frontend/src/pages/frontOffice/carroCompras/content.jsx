import React from 'react'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import { Grid } from '../../../components/backOffice/grid'
import { ModalDialog } from '../../../components/backOffice/modalDialog'

export const CarroComprasContent = (props) => {
    const { response, dataGrid, eliminarRegistro, changeGridColumn, totalNeto, subTotal, impuestos, volver } = props

    return (
        <>
            <ModalDialog response={response}/>
            <HeaderMarketComponent/>
            <Container>
                <Row>
                    <Col><h4>Carro de compras</h4></Col>
                </Row>
                <Row>
                    <Col md="8">
                        <Grid
                            data={dataGrid}
                            headers={['Foto','Nombre', 'Precio Neto', 'Cantidad']}
                            visibleFields={['imagen','nombre', 'str_precio', 'cantidad']}
                            editableColumns={['cantidad']}
                            numericColumns={['cantidad']}
                            imageColumns={['imagen']}
                            actionColumn={true}
                            title={''}
                            urlToForm={''}
                            onClickDelete={eliminarRegistro}
                            showFindTextBox={false}
                            showDeleteButton={true}
                            changeGridColumn={changeGridColumn}
                        />
                    </Col>
                    <Col md="4">
                        <Card style={{ width: '18rem' }}>
                            <Card.Header>Resumen</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total Neto:</Col>
                                        <Col className="signal">$</Col>
                                        <Col className="col-sub-totales">{totalNeto}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Impuestos:</Col>
                                        <Col className="signal">$</Col>
                                        <Col className="col-sub-totales">{impuestos}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total final :</Col>
                                        <Col className="signal">$</Col>
                                        <Col className="col-sub-totales">{subTotal}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        El total final no contempla gastos de envío. Los gastos de envío 
                                        serán calculados al momento de ingresar la dirección de despacho 
                                        en la siguiente pantalla. 
                                    </Row>
                                    <Row className="separator">
                                         
                                    </Row>
                                    <Row>
                                        <Button variant="primary">Continuar la compra</Button>
                                    </Row>
                                    <Row className="separator">
                                         
                                    </Row>
                                    <Row>
                                        <Button variant="primary" onClick={() => volver()}>Volver a la tienda</Button>
                                    </Row>
                                </ListGroup.Item>
                                
                            </ListGroup>
                            
                        </Card>
                    </Col>
                </Row>
            </Container>
            <FooterComponent/> 
        </>
    )
}