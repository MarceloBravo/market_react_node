import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { ModalDialog } from '../../../components/backOffice/modalDialog' 
import { Header } from '../../../components/backOffice/header'
import { SpinnerComponent } from '../../../components/shared/spinner'
import { Menu } from '../../../components/backOffice/menu'
import { Alerta } from '../../../components/shared/alerts'
import { FormButtons } from '../../../components/backOffice/form_buttons'

export const InfoTiendaContent = (props) => {
    const { response, infoTienda, handlerChangeValue, errors, grabar, handlerBtnCancelar, id } = props

    return (
        <>
            <ModalDialog response={response}/>
            <Header />
            <SpinnerComponent />

            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="1"/>
                </div>
                <div className="content-section">                    
                    <Alerta />
                    <Form>
                        <div className="div-title">Información de la tienda</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre de la tienda</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre_tienda"
                                    placeholder="Nombre de la tienda"
                                    value={infoTienda.nombre_tienda}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.nombre_tienda &&
                            <Form.Group as={Row}>
                                <Form.Text className="field-error offset-2">{ errors.nombre_tienda}</Form.Text>
                            </Form.Group>
                        }


                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Fono venta</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="fono_venta"
                                    placeholder="Fono venta (Ej. +56 1 987654321)"
                                    value={infoTienda.fono_venta}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.fono_venta &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.fono_venta}</Form.Text>
                            </Form.Group>
                        }


                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Email</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="email"
                                    placeholder="Email de contacto"
                                    value={infoTienda.email}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.email &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.email}</Form.Text>
                            </Form.Group>
                        }


                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Dirección</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="direccion"
                                    placeholder="Dirección Casa Matriz"
                                    value={infoTienda.direccion}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.direccion &&
                            <Form.Group as={Row}>
                                <Form.Text className="field-error offset-2">{ errors.direccion}</Form.Text>
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
        </>
    )
}