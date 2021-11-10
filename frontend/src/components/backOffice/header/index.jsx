import React, { useEffect, useState } from 'react'
import { Form, Nav, Navbar, Dropdown, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../actions/login'
import { defaultImagesUrl, defaultAvatarUrl } from '../../../shared/constantes'
import { types } from '../../../redux/Alert/types'
import { TimerSession } from '../timerSession'
import { useHistory } from 'react-router-dom'
import { getTokenFromStorage } from '../../../shared/funciones'
import { types as menusTypes } from '../../../redux/Menus/types'
import './style.css'

export const Header = (props) => {
    const user = useSelector(state => state.LoginReducer.logedUser.user)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const [ token, setToken ] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()
    
    useEffect(()=>{
        if(localStorage.getItem('backTkn')){
            setToken(localStorage.getItem('backTkn'))
        }
    },[])
    
    
    useEffect(()=>{
        if(!user){
            history.push('/login')
        }
    },[history, user])


    const logoutApp = () => {
        dispatch(logout(getTokenFromStorage()))
    }

    
    const goToMarket = () => {
        history.push('/')
    }


    const clearMessages = () => {
        dispatch({type: types.OCULTAR_ALERTA})
    }

    const togleLeftMenu = () => {
        dispatch({type: menusTypes.TOGLE_MENU})
    }

    return (
        <header className={"topbar " + (togleMenu ? 'widthHeader' : 'normalHeader')} data-navbarbg="skin6">
            <Navbar variant="dark" className="navbar">
                <Image src="/icon-menu.png" alt="Mostrar ocultar menú" className="icon-menu" onClick={()=>togleLeftMenu()}/>
                {/*<Navbar.Brand href="/">{ nombre_app }</Navbar.Brand>*/}
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home" onClick={() => clearMessages()} className="bo-navLink ">Home</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard" onClick={() => clearMessages()}>Dashboard</Nav.Link>
                </Nav>
                
                <div className="user-session-info">
                    <Form inline>
                        <TimerSession/>
                        <Dropdown>                        
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="perfil-menu">
                            {user && user.name } {user && user.a_paterno }
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/perfil" onClick={() => clearMessages()}>Mi perfil</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item as={Link} to="#" onClick={() => logoutApp()}>Cerrar sessión</Dropdown.Item>
                                {token && <Dropdown.Item as={Link} to="#" onClick={() => goToMarket()}>Salir</Dropdown.Item>}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form>
                    <Image src={(user && user.foto) ? defaultImagesUrl + user.foto  : defaultAvatarUrl} roundedCircle className="avatar"/>
                </div>                
            </Navbar>
        </header>
    )
}