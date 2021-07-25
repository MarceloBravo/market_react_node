import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import './style.css'

export const FooterComponent = () => {
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)

    return (
        <>
            <div className="footer-container">
                <Container className="footer-component">
                    <Row>
                        <Col>
                            <label className="nombre-tienda-footer">{infoTiendaState ? infoTiendaState.nombre_tienda : 'Mi Tienda sin nombre'}</label>
                        </Col>
                        <Col xs={4}>
                            <ul>Tienda
                                <li>Departamentos</li>
                                <li>Recupera tu boleta</li>
                                <li>Seguimiento de pedidos</li>
                                <li>Cambios y devoluciones</li>
                            </ul>
                        </Col>
                        <Col>
                            <ul>Quienes somos
                                <li>Visión</li>
                                <li>Misión</li>
                                <li>Objetivos</li>
                                <li>Valores</li>
                                <li>Contáctanos</li>
                                <li>Nuestra dirección</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="footer-credits">
                <Container>
                    <Row>
                        <Col>Desarrollado por Marcelo Bravo C.</Col>
                        <Col></Col>
                        <Col>Talca, Chile 2021</Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}