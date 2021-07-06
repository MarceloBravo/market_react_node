import React, { useEffect } from 'react'
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { find } from '../../../actions/personalizar'
import './style.css'

export const HeaderMarketComponent = () => {
    const configAppState = useSelector(state => state.PersonalizarReducer.config)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(find())
    },[dispatch])


    return (
        <div className="header-container">
            <Navbar bg="dark" variant="dark" className="header-market">
                <Container>
                    <Navbar.Brand href="#home">{ configAppState ? configAppState.nombre_app : 'Mi tienda sin nombre' }</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Inicio</Nav.Link>
                        <Nav.Link href="#features">Nuestras tiendas</Nav.Link>
                        <Nav.Link href="#pricing">Catálogo de productos</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Navbar bg="light" variant="light" className="header-market">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Venta telefónica al 1234567890</Nav.Link>
                    </Nav>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Opción 1</Nav.Link>
                        <Nav.Link href="#features">Opción 2</Nav.Link>
                        <Nav.Link href="#pricing">Opción 3</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            {/*
            <Container>
                <Row>
                    <Col>Venta telefónica al 123456798</Col>
                    <Col></Col>
                    <Col>gjcgjfgfjgfgfjdgsjgjg</Col>
                </Row>
            </Container>
            */}
        </div>
    )
}