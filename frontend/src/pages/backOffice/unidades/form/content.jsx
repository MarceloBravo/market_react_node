import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { Form, Col, Row } from 'react-bootstrap'
import { Alerta } from '../../../../components/shared/alerts'

export const UnidadesFormComponent = (props) => {
    const { response, pantalla, unidad, handlerChangeValue, errors, grabar, eliminar, cancelar, id } = props

    return (
        <>
            <ModalDialog response={response} />
            <Header />
            <SpinnerComponent />
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="19"/>
                </div>
                <div className="content-section">                    
                    <Alerta/>
                    <Form>
                        <div className="div-title">Mantenedor de {pantalla.nombre}</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre de la unidad"
                                    value={unidad.nombre}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.nombre &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.nombre }</Form.Text>
                            </Form.Group>
                        }

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre en plural</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre_plural"
                                    placeholder="Nombre en plural"
                                    value={unidad.nombre_plural}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.nombre_plural &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.nombre_plural }</Form.Text>
                            </Form.Group>
                        }

                        <FormButtons 
                            grabar={grabar} 
                            eliminar={eliminar} 
                            handlerBtnCancelar={cancelar} 
                            errors={errors} 
                            id={id}
                        />
                    </Form>
                </div>
            </div>
        </>
    )
}