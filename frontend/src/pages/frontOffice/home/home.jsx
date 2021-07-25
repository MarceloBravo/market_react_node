import React from 'react'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { Marquesina } from '../../../components/frontOffice/marquesina/marquesina'
import { SeccionesHomeComponent }  from '../../../components/frontOffice/seccionesHome/seccionesHomeComponent'

export const HomeMarketComponent = () => {

    return (
        <>
            <HeaderMarketComponent/>
            <Marquesina />
            <SeccionesHomeComponent />
            <FooterComponent/>
        </>
    )
}