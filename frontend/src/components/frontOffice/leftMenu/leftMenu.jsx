import React, { useEffect } from 'react' 
import Drawer from 'react-modern-drawer'    //yarn add react-modern-drawer
import { useSelector, useDispatch } from 'react-redux'
import { getMainMenu } from '../../../actions/menusTienda'
import 'react-modern-drawer/dist/index.css'
import './style.css'

export const LeftMenuComponent = (props) => {
    const { sowMenu, toggleMenu } = props
    const menuMostradoState = useSelector(state => state.MenusTiendaReducer.displayedMenus)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getMainMenu())
    },[dispatch])


    const subMenu = (keyMenuPadre, sub_menu) => {
        return sub_menu.map((mnu, key) => 
            <li key={`${keyMenuPadre}_${key}`} className="li_menu_categoría">{mnu.nombre}</li>
        )
    }


    return (
        <>
            <Drawer open={sowMenu} onClose={toggleMenu} direction='left' className="left-menu">
                <label className="close-left-menu" onClick={() => toggleMenu()}>X</label>
                <div className="title-left-menu">Categorías</div>
                {
                    menuMostradoState.map((mnu, key)=> {
                        return  <ul key={key} className="ul_menu_categoria">{mnu.nombre}
                                    {subMenu(key, mnu.sub_menu)}
                                </ul>
                    })
                }
            </Drawer>
        </>
    )
}