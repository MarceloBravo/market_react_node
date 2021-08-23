import React from 'react'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { types as alertasTypes } from '../../../redux/Alert/types'
import { PageMessageComponent } from '../../../components/frontOffice/pageMessage/pageMessage'
import './style.css'

export const PageMessage = (props) => {
    const alertaState = useSelector(state => state.AlertaReducer)
    const history = useHistory()
    const dispatch = useDispatch()

    
    const goToInicio = () => {
        dispatch({type: alertasTypes.OCULTAR_ALERTA})
        history.push('/')
    }


    return (
        <>
            <HeaderMarketComponent />
            <Container className="containner">

                <PageMessageComponent mensaje={alertaState?.mensaje}/>

                <Row>
                    <Col md={{span: 4, offset: 4}} className="col-button-OK">
                        <Button variant="primary" onClick={() => goToInicio()}>Aceptar</Button>
                    </Col>
                </Row>
            </Container>
            <FooterComponent/>
        </>
    )
}