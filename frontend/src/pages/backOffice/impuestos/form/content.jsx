import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { Form, Col, Row } from 'react-bootstrap'
import { Alerta } from '../../../../components/shared/alerts'

export  const ContentImpuestos = (props) => {
    const { response, impuesto, handlerChangeValue, errors, grabar, eliminar, handlerBtnCancelar, id } = props

    return (
        <div>
            <ModalDialog response={response} />
            <Header />      
            <SpinnerComponent /> 
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="1"/>
                </div>
                <div className="content-section">
                    <Alerta />
                    <Form>
                        <div className="div-title">Mantenedor de Impuestos</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre del impuesto"
                                    value={impuesto.nombre}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.nombre &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.nombre}</Form.Text>
                            </Form.Group>
                        }


                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Sigla</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="sigla"
                                    placeholder="Sigla"
                                    value={impuesto.sigla}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.sigla &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.sigla}</Form.Text>
                            </Form.Group>
                        }

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Porcentaje</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="porcentaje"
                                    placeholder="Porcentaje de Impuesto"
                                    value={impuesto.porcentaje}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.porcentaje &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.porcentaje }</Form.Text>
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