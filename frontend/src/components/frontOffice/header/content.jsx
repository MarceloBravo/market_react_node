import React from 'react'
import { Container, Navbar, Nav, Form, FormControl, OverlayTrigger, Tooltip, NavDropdown } from 'react-bootstrap'
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
     } = props

    return (
        <>
            <LeftMenuComponent toggleMenu={toggleMenu} sowMenu={sowMenu}/> 
            <div className="header-container">
                <Navbar bg="dark" variant="dark" className="header-market">

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

                    <Container>
                        <Navbar.Brand href="#home">
                            { infoTiendaState ? infoTiendaState.nombre_tienda : 'Mi tienda sin nombre' }
                        </Navbar.Brand>
                        <Nav>
                            <Nav.Link href="#" onClick={()=> goToHome("/catalogo")}>Inicio</Nav.Link>
                            <Nav.Link href="#features">Nuestras tiendas</Nav.Link>
                            <Nav.Link href="#" onClick={()=> goToCatalogue("/catalogo")}>Catálogo de productos</Nav.Link>
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
                            { !datosCliente?.nombres && <Nav.Link to="#" onClick={()=>goToLogin()} ><Icons.Person />Login</Nav.Link>}
                            { datosCliente?.nombres && 
                                <NavDropdown title={datosCliente.nombres} id="navbarScrollingDropdown">
                                    {!datosCliente.id && <NavDropdown.Item href='/loginCliente'>Actualizar mis datos</NavDropdown.Item>}
                                    {datosCliente.id && <NavDropdown.Item href={`/registroCliente/${datosCliente.id}`}>Actualizar mis datos</NavDropdown.Item>}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item to="#" onClick={() => cerrarSession()}>Cerrar sessión</NavDropdown.Item>
                                </NavDropdown>
                            
                            }
                            <Nav.Link to="#" onClick={() => goToCart()}><Icons.Cart/>Carro de compras</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}