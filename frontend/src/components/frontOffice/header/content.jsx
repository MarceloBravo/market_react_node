import React from 'react'
import { Container, Navbar, Nav, Form, Col, FormControl, OverlayTrigger, Tooltip, NavDropdown, Row } from 'react-bootstrap'
import * as Icons from 'react-bootstrap-icons' //yarn add react-bootstrap-icons --save
import { ImMenu } from "react-icons/im";    // yarn add react-icons --save
import { LeftMenuComponent } from '../leftMenu/leftMenu'


export const HeaderContentComponent = (props) => {
    const { 
        infoTiendaState, 
        toggleMenu, 
        sowMenu, 
        goToCart, 
        goToCatalogue, 
        goToHome, 
        goToLogin, 
        handlerTextFiltro, 
        aplicarFiltro, 
        textoFiltro,
        datosCliente,
        cerrarSession,
        goToUpdateUserData, 
        gotToAdmin
     } = props

    return (
        <>
            <LeftMenuComponent toggleMenu={toggleMenu} sowMenu={sowMenu}/> 
            <div className="header-container">
                <Navbar bg="dark" variant="dark" className="header-market dark">
                    <Container>
                        <Row>
                            <Col xs={12} md={6}>
                                <Navbar.Brand href="#home">
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip id="button-tooltip">Mostrar menu</Tooltip>}
                                    >
                                        <ImMenu 
                                            onClick={toggleMenu} 
                                            className="header-menu"
                                        />
                                    </OverlayTrigger>
                                
                                    { infoTiendaState ? infoTiendaState.nombre_tienda : 'Mi tienda sin nombre' }
                                </Navbar.Brand>
                            </Col>
                            <Col xs={12} md={6} className="right-menu">    
                                <Nav>
                                    <Nav.Link href="#" onClick={()=> goToHome("/catalogo")}>Inicio</Nav.Link>                                    
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip id="button-tooltip">Ver el catálogo de productos</Tooltip>}
                                    >
                                        <Nav.Link href="#" onClick={()=> goToCatalogue("/catalogo")}>Catálogo de productos</Nav.Link>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip id="button-tooltip">Ir al módulo de administración de la tienda</Tooltip>}
                                    >
                                        <Nav.Link href="#" onClick={()=> gotToAdmin()}>Administrar tienda</Nav.Link>
                                    </OverlayTrigger>
                                </Nav>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>
                <Navbar bg="light" variant="light" className="header-market">
                    <Container>
                        <Row>
                            <Col xs={12} md={5}>
                                <Nav className="me-auto">
                                    <Nav.Link href="#home">{infoTiendaState.fono_venta ? 'Venta telefónica al '+infoTiendaState.fono_venta : 'Venta on-line'}</Nav.Link>
                                </Nav>
                            </Col>
                            <Col xs={12} md={7} className="find-column">
                                <Nav>
                                    <Row>
                                        <Col xs={12} md={5}>
                                            <Nav.Link href="#" className="header-form-buscar">
                                                <Form inline>
                                                    <FormControl 
                                                        type="text" 
                                                        name="textoFiltro"
                                                        placeholder="Buscar" 
                                                        className="mr-sm-2 input-header-search" 
                                                        onChange={e => handlerTextFiltro(e)}
                                                        value={textoFiltro}
                                                    />  
                                                    <Icons.Search className="icon-header-search" onClick={() => aplicarFiltro()}/>  
                                                </Form>
                                            </Nav.Link>
                                        </Col>
                                        <Col xs={12} md={7}>
                                            <Row>
                                                <Col xs={4} md={4}>
                                                    { !datosCliente?.nombres && <Nav.Link to="#" onClick={()=>goToLogin()} ><Icons.Person />Login</Nav.Link>}
                                                    { datosCliente?.nombres && 
                                                        <NavDropdown title={datosCliente.nombres} id="navbarScrollingDropdown">
                                                            {datosCliente.id && <NavDropdown.Item to='#' onClick={()=>goToUpdateUserData()}>Actualizar mis datos</NavDropdown.Item>}
                                                            <NavDropdown.Divider />
                                                            <NavDropdown.Item to="#" onClick={() => cerrarSession()}>Cerrar sessión</NavDropdown.Item>
                                                        </NavDropdown>
                                                    
                                                    }
                                                </Col>
                                                <Col xs={8} md={8}>
                                                    <Nav.Link to="#" onClick={() => goToCart()}><Icons.Cart/>Carro de compras</Nav.Link>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Nav>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}