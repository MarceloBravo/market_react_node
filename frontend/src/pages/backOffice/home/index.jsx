import React from 'react'
import { Header } from '../../../components/backOffice/header'
import { Menu } from '../../../components/backOffice/menu'

export const Home = () => {

    return (
        <div>            
            <Header />
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="0"/>
                </div>
                <div className="content-section">
                    jbjkbkbkbkbkjbkbjkj
                </div>
            </div>
        </div>
    )
}