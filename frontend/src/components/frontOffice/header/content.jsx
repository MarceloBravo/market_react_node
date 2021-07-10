import React from 'react'
import { Container, Navbar, Nav, Form, FormControl } from 'react-bootstrap'
import * as Icons from 'react-bootstrap-icons' //yarn add react-bootstrap-icons --save
import { ImMenu } from "react-icons/im";    // yarn add react-icons --save
import { LeftMenuComponent } from '../leftMenu/leftMenu'


export const HeaderContentComponent = (props) => {
    const { infoTiendaState, toggleMenu, sowMenu } = props

    return (
        <>
            <LeftMenuComponent toggleMenu={toggleMenu} sowMenu={sowMenu}/> 
            <div className="header-container">
                <Navbar bg="dark" variant="dark" className="header-market">
                    <Container>
                        <Navbar.Brand href="#home">
                            <ImMenu onClick={toggleMenu}/>
                            { infoTiendaState ? infoTiendaState.nombre_tienda : 'Mi tienda sin nombre' }
                        </Navbar.Brand>
                        <Nav>
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
                        <Nav>
                            <Nav.Link href="#pricing">
                                <Form inline>
                                    <FormControl type="text" placeholder="Buscar" className="mr-sm-2 input-header-search" />  
                                    <Icons.Search className="icon-header-search"/>  
                                </Form>
                            </Nav.Link>
                            <Nav.Link href="#home"><Icons.Person />Mi cuenta</Nav.Link>
                            <Nav.Link href="#features"><Icons.Cart/>Carro de compras</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}