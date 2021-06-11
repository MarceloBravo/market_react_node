import React, {useEffect } from 'react'
import { Form, Nav, Navbar, Dropdown, Image } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../actions/login'
import { defaultImagesUrl, defaultAvatarUrl } from '../../../shared/constantes'
import './style.css'

export const Header = () => {
    const user = useSelector(state => state.LoginReducer.logedUser.user)
    const nombre_app = useSelector(state => state.PersonalizarReducer.config.nombre_app)
    const isLogout = useSelector(state => state.LoginReducer.isLogout)
    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(()=>{
        if(isLogout){
            if(sessionStorage.getItem('gimAppMabc')){
                sessionStorage.removeItem('gimAppMabc')
            }else if(localStorage.getItem('gimAppMabc')){
                localStorage.removeItem('gimAppMabc')
            }
            history.push('/')
        }
    },[isLogout, history])


    const logoutApp = () => {
        dispatch(logout())
    }


    return (
        <header className="topbar" data-navbarbg="skin6" >
            <Navbar variant="dark" className="navbar">
                <Navbar.Brand href="/">{ nombre_app }</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home">FrontOffice</Nav.Link>
                </Nav>
                
                
                <Form inline>
                    <Dropdown>                        
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="perfil-menu">
                        {user && user.name } {user && user.a_paterno }
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/perfil">Mi perfil</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as={Link} to="#" onClick={() => logoutApp()}>Salir</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
                <Image src={(user && user.foto) ? defaultImagesUrl + user.foto  : defaultAvatarUrl} roundedCircle className="avatar"/>
            </Navbar>
        </header>
    )
}