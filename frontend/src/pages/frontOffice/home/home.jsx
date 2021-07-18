import React from 'react'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { Marquesina } from '../../../components/frontOffice/marquesina/marquesina'

export const HomeMarketComponent = () => {

    return (
        <>
            <HeaderMarketComponent/>
            <Marquesina />
            <FooterComponent/>
        </>
    )
}