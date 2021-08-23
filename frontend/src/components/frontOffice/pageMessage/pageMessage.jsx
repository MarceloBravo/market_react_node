import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'

export const PageMessageComponent = (props) => {
    const { mensaje, classname } = props

    return (
        <Row className={(classname ? classname : '') + " row-message"}>
            <Col md={{span: 6, offset: 3}} className="col-message">
                <Row>
                    <Col md={3}>
                        <Image src="images/exclamacion.png" alt="Signo exclamación"></Image>
                    </Col>
                    <Col className="col-texto-menssage">
                        {mensaje}
                    </Col>
                </Row>
                
            </Col>
        </Row>
    )
}