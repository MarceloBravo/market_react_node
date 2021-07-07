import React, { useEffect } from 'react'
import { Container, Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import * as Icons from 'react-bootstrap-icons' //yarn add react-bootstrap-icons --save
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
                        <Nav.Link href="#home"><Icons.Person />Mi cuenta</Nav.Link>
                        <Nav.Link href="#features"><Icons.Cart/>Carro de compras</Nav.Link>
                        <Nav.Link href="#pricing">
                        <Form inline>
                            <FormControl type="text" placeholder="Buscar" className="mr-sm-2" />  
                            <Icons.Search/>  
                        </Form>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}