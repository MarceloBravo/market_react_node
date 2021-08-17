import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { Alerta } from '../../../components/shared/alerts'
import { LoginClienteComponent } from '../../../components/frontOffice/loginCliente/loginCliente'
import './style.css'

export const LoginCliente = (props) => {

    return (
        <>
            <HeaderMarketComponent />
            <Container>
                <Alerta />
                <Row>
                    <h4>Ingreso a mi cuenta</h4>
                </Row>
                <LoginClienteComponent />
            </Container>
            <FooterComponent />
        </>
    )
}