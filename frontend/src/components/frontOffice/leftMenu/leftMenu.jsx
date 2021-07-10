import React from 'react' 
import Drawer from 'react-modern-drawer'    //yarn add react-modern-drawer
import 'react-modern-drawer/dist/index.css'
import './style.css'

export const LeftMenuComponent = (props) => {
    const { sowMenu, toggleMenu } = props

    return (
        <>
            <Drawer open={sowMenu} onClose={toggleMenu} direction='left' className="left-menu">
                <label className="close-left-menu" onClick={() => toggleMenu()}>X</label>
                <div>Hello World</div>
            </Drawer>
        </>
    )
}