import React, { useState } from 'react'
import { ModalDialog } from '../../../components/backOffice/modalDialog'
import { Header } from '../../../components/backOffice/header'
import { SpinnerComponent } from '../../../components/shared/spinner'
import { Form, Row, Col } from 'react-bootstrap'
import { Menu } from '../../../components/backOffice/menu'
import { FormButtons } from '../../../components/backOffice/form_buttons'
import { Alerta } from '../../../components/shared/alerts'

export const ContentPersonalizar = (props) => {
    // eslint-disable-next-line
    const [ errors, setErrors ] = useState({nombre_app: null})
    const { response, config, handlerChangeValue, grabar, handlerBtnCancelar, id} = props

    return (
        <div>
            <ModalDialog response={response}/>
            <Header />
            <SpinnerComponent />

            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="15"/>
                </div>
                <div className="content-section">                    
                    <Alerta />
                    <Form>
                        <div className="div-title">Personalizar Aplicación</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre App.</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre_app"
                                    placeholder="Nombre de la aplicación"
                                    value={config.nombre_app}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.nombre &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.nombre_app}</Form.Text>
                            </Form.Group>
                        }

                        <FormButtons
                            grabar={grabar} 
                            handlerBtnCancelar={handlerBtnCancelar}
                            errors={errors} 
                            id={id} 
                        />

                    </Form>
                </div>
            </div>
                

        </div>
    )
}