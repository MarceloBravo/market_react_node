import React, { useEffect } from 'react'
import { Container, Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import * as Icons from 'react-bootstrap-icons' //yarn add react-bootstrap-icons --save
import { getData } from '../../../actions/infoTienda'
import './style.css'

export const HeaderMarketComponent = () => {
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getData())
    },[dispatch])


    return (
        <div className="header-container">
            <Navbar bg="dark" variant="dark" className="header-market">
                <Container>
                    <Navbar.Brand href="#home">{ infoTiendaState ? infoTiendaState.nombre_tienda : 'Mi tienda sin nombre' }</Navbar.Brand>
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
                        <Nav.Link href="#home">{infoTiendaState.fono_venta ? 'Venta telefónica al '+infoTiendaState.fono_venta : 'Venta on-line'}</Nav.Link>
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