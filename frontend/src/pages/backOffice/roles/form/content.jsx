import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { Menu } from '../../../../components/backOffice/menu'
import { Form, Col, Row } from 'react-bootstrap'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { SpinnerComponent } from '../../../../components/shared/spinner'

export const RolesForm = (props) => {
    const { 
        response, 
        mostrarOcultarModal, 
        rol, 
        handlerChangeValue, 
        errors, 
        grabar, 
        eliminar, 
        cancelar, 
        id,
        togleMenu,
    } = props

    return (
        <>
            <ModalDialog response={response} toggle={mostrarOcultarModal}/>
            <Menu activeKeyMenu="15"/>
            <SpinnerComponent />
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                <Header />
                <div className="content-section">                    
                    <Form>
                        <div className="div-title">Mantenedor de Roles</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Nombre del rol"
                                    value={rol.name}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.name &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.name}</Form.Text>
                            </Form.Group>
                        }

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Descripción</Form.Label>
                            <Col md="8">
                                <Form.Control
                                    type="text"
                                    name="description"
                                    placeholder="Descripción del rol"
                                    value={rol.description}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.description &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.description}</Form.Text>
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