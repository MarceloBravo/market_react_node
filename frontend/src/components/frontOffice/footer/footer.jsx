import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import './style.css'

export const FooterComponent = () => {
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)

    return (
        <div>
            <div className="footer-container">
                <Container className="footer-component">
                    <Row>
                        <Col xs={12} md={4}>
                            <label className="nombre-tienda-footer">{infoTiendaState ? infoTiendaState.nombre_tienda : 'Mi Tienda sin nombre'}</label>
                        </Col>
                        <Col xs={12} md={4}>
                            <ul>Tienda
                                <li>Departamentos</li>
                                <li>Recupera tu boleta</li>
                                <li>Seguimiento de pedidos</li>
                                <li>Cambios y devoluciones</li>
                            </ul>
                        </Col>
                        <Col xs={12} md={4}>
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
                <div>Desarrollado por Marcelo Bravo C.</div>
                <div>Talca, Chile 2021</div>
            </div>
        </div>
    )
}