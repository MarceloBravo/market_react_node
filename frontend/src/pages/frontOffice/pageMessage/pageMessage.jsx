import React from 'react'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { Container, Button, Row, Col, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { types as alertasTypes } from '../../../redux/Alert/types'
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
                <Row className="row-message">
                    <Col md={{span: 6, offset: 3}} className="col-message">
                        <Row>
                            <Col md={3}>
                                <Image src="images/exclamacion.png" alt="Signo exclamación"></Image>
                            </Col>
                            <Col className="col-texto-menssage">
                                {alertaState?.mensaje}
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>
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