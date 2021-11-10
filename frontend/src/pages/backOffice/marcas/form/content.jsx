import React from "react"
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { Form, Col, Row } from 'react-bootstrap'

export const MarcasFormContent = (props) => {
    const { 
        response, 
        pantalla, 
        marca, 
        errors, 
        handlerChangeValue, 
        grabar, 
        eliminar, 
        handlerBtnCancelar, 
        id, 
        togleMenu 
    } = props
 
    return (
        <div>
            <Menu activeKeyMenu="19"/>
            <ModalDialog response={response} />
            <SpinnerComponent /> 
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                <Header />
                <div className="content-section">
                    <Alerta />
                    <Form>
                        <div className="div-title">Mantenedor de {pantalla.nombre}</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre de la marca"
                                    value={marca.nombre}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.nombre &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.nombre}</Form.Text>
                            </Form.Group>
                        }

                        <FormButtons 
                            grabar={grabar} 
                            eliminar={eliminar} 
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