import React from 'react'
import { Card, Nav, Navbar, Accordion, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const ContentMenuComponent = (props) => {
    const {menus, activeKeyMenu, clearMessages, nombre_app, togleMenu} = props

    return (
        <div className={"menu-section " + (togleMenu ? 'hideMenu' : 'visibleMenu')}>
            <div>
                <Navbar.Brand href="/">{ nombre_app }</Navbar.Brand>
                <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav>
                        <Accordion defaultActiveKey={activeKeyMenu}>
                            {menus && menus.map((menu, key) => 
                                <Card className="sub-menu" key={key}>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey={menu.id.toString()} className="pather-menu">
                                        {menu.nombre} 
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={menu.id.toString()}>                                    
                                        {menu.sub_menu && 
                                            <Card.Body>
                                                <Nav defaultActiveKey={'0-' + menu.id.toString()}>
                                                    {menu.sub_menu.map((sm, k) => 
                                                        sm.acceder === 1 && <Nav.Link onClick={() => clearMessages() } as={Link} to={"/" + sm.url} key={key + '-' + k}>{sm.nombre}</Nav.Link>
                                                    )}
                                                </Nav>
                                            </Card.Body>
                                        }
                                        
                                    </Accordion.Collapse>
                                </Card>    
                            )}

                        </Accordion> 
                    </Nav>
                </Nav>
                
            </div>
        </div>
    )
}