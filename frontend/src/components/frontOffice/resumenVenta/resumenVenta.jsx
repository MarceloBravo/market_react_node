import React from 'react'
import { Card, ListGroup, Button, Col, Row } from 'react-bootstrap'
import { formatearNumero }  from '../../../shared/funciones'
import './style.css'

export const ResumenVentaComponent = (props) => {
    const { 
        continuarCompra, 
        volver, 
        textoContinuarCompra, 
        textoVolver, 
        totalNeto, 
        impuestos, 
        subTotal, 
        despacho,
        disabledButton1,
        disabledButton2,
} = props
    

    return (
        <>
            <Card>
                <Card.Header>Resumen</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Row>
                            <Col>Total Neto:</Col>
                            <Col className="signal">$</Col>
                            <Col className="col-sub-totales">{formatearNumero(totalNeto)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Impuestos:</Col>
                            <Col className="signal">$</Col>
                            <Col className="col-sub-totales">{formatearNumero(impuestos)}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Sub Total :</Col>
                            <Col className="signal">$</Col>
                            <Col className="col-sub-totales">{formatearNumero(subTotal)}</Col>
                        </Row>
                    </ListGroup.Item>
                    
                    {despacho === undefined && 
                        <ListGroup.Item>
                            <Row>
                                El total final no contempla gastos de envío. Los gastos de envío 
                                serán calculados al momento de ingresar la dirección de despacho 
                                en la siguiente pantalla. 
                            </Row>
                        </ListGroup.Item>
                    }
                    {despacho !== undefined  &&
                        <>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Gastos de envío :</Col>
                                    <Col className="signal">$</Col>
                                    <Col className="col-sub-totales">{formatearNumero(despacho)}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total a pagar :</Col>
                                    <Col className="signal">$</Col>
                                    <Col className="col-sub-totales">{formatearNumero(subTotal + despacho)}</Col>
                                </Row>
                            </ListGroup.Item>
                        </>
                    }
                    <ListGroup.Item>
                        <Row className="separator">
                                
                        </Row>
                        <Row className="button-container">
                            <Button 
                                variant="primary" 
                                onClick={()=>continuarCompra()}
                                disabled={disabledButton1 ? disabledButton1 : false}
                            >
                                { textoContinuarCompra ? textoContinuarCompra : 'Continuar con la compra'}
                            </Button>
                        </Row>
                        <Row className="separator">
                                
                        </Row>
                        <Row className="button-container">
                            <Button 
                                variant="primary" 
                                onClick={() => volver()}
                                disabled={disabledButton2 ? disabledButton2 : false}
                            >
                                {textoVolver ? textoVolver : 'Volver a la tienda'}
                            </Button>
                        </Row>
                    </ListGroup.Item>
                    
                </ListGroup>
                
            </Card>
                    
        </>
    )
}