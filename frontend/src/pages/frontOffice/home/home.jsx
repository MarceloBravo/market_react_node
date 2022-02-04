import React from 'react'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { Marquesina } from '../../../components/frontOffice/marquesina/marquesina'
import { SeccionesHomeComponent }  from '../../../components/frontOffice/seccionesHome/seccionesHomeComponent'
import './style.css'


export const HomeMarketComponent = () => {

    return (
        <>
            <HeaderMarketComponent/>
            <div className='container home-page'>
                <Marquesina />
                <SeccionesHomeComponent />
                <FooterComponent/>
            </div>
        </>
    )
}