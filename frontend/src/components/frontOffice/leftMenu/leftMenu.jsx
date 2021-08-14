import React, { useEffect } from 'react' 
import Drawer from 'react-modern-drawer'    //yarn add react-modern-drawer
import { useSelector, useDispatch } from 'react-redux'
//import { getMainMenu } from '../../../actions/menusTienda'
import { getCategoriasSubCategorias } from '../../../actions/categorias'
import { OverlayTrigger, Tooltip, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'react-modern-drawer/dist/index.css'
import './style.css'

export const LeftMenuComponent = (props) => {
    const { sowMenu, toggleMenu } = props
    //const menuMostradoState = useSelector(state => state.MenusTiendaReducer.displayedMenus)
    const menuCategoriasState = useSelector(state => state.CategoriasReducer.categoriasSubCategorias)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getCategoriasSubCategorias())
    },[dispatch])


    const subMenu = (keyMenuPadre, sub_menu) => {
        return sub_menu.map((mnu, key) => 
                <Nav.Link 
                    className="li_menu_categoria"
                    as={Link} 
                    to={`/catalogo/${keyMenuPadre}/${mnu.id}`} 
                    key={`${keyMenuPadre}_${key}`}
                >
                    {mnu.nombre}
                </Nav.Link>
        )
    }

    
    const todoCategoria = (key, mnu) => {
        return <Nav.Link 
                    className="li_menu_categoria"
                    as={Link} 
                    to={"/catalogo/" + mnu.id} 
                    key={mnu.id + key}
                >
                    Todo {mnu.nombre}
                </Nav.Link>
    }


    return (
        <>
            <Drawer open={sowMenu} onClose={toggleMenu} direction='left' className="left-menu">

                <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip id="button-tooltip">Ocultar menu</Tooltip>}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" 
                            height="20" 
                            fill="currentColor" 
                            className="bi bi-box-arrow-left close-left-menu" 
                            viewBox="0 0 16 16"
                            onClick={() => toggleMenu()}
                        >
                            <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                            <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                    </OverlayTrigger>

                
                <div className="title-left-menu">Categorías</div>
                {
                    menuCategoriasState.map((mnu, key)=> {
                        return  <div key={key} className="item-categoria-menu">  
                                    {mnu.sub_categoria.length === 0 && 
                                        <Nav 
                                            className="ul_menu_categoria"
                                        >{mnu.nombre}
                                            {todoCategoria(mnu.id, mnu)}
                                        </Nav>
                                    }
                                    {mnu.sub_categoria.length > 0 &&
                                        <Nav className="ul_menu_categoria nav-categoria">{mnu.nombre}
                                            {todoCategoria(mnu.id, mnu)}
                                            {subMenu(mnu.id, mnu.sub_categoria)}
                                            
                                        </Nav>
                                    }
                                </div>
                    })
                }
            </Drawer>
        </>
    )
}