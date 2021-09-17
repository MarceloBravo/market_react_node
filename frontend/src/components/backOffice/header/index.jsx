import React, { useEffect, useState } from 'react'
import { Form, Nav, Navbar, Dropdown, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../actions/login'
import { defaultImagesUrl, defaultAvatarUrl } from '../../../shared/constantes'
import { types } from '../../../redux/Alert/types'
import { TimerSession } from '../timerSession'
import { useHistory } from 'react-router-dom'
import './style.css'

export const Header = () => {
    const user = useSelector(state => state.LoginReducer.logedUser.user)
    const nombre_app = useSelector(state => state.PersonalizarReducer.config.nombre_app)
    const [ token, setToken ] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()

    
    useEffect(()=>{
        console.log('XXXXXXXXXXXXXXXXXX',localStorage.getItem('backTkn'))
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
        dispatch(logout())
    }

    
    const goToMarket = () => {
        history.push('/')
    }


    const clearMessages = () => {
        dispatch({type: types.OCULTAR_ALERTA})
    }


    return (
        <header className="topbar" data-navbarbg="skin6" >
            <Navbar variant="dark" className="navbar">
                <Navbar.Brand href="/">{ nombre_app }</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
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