import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { Header } from '../../../../components/backOffice/header';
import { Menu } from '../../../../components/backOffice/menu';
import { ModalDialog } from '../../../../components/backOffice/modalDialog';
import { useSelector } from 'react-redux'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { SpinnerComponent } from '../../../../components/shared/spinner'

export const ContentPantallas = (props) => {
    const menus = useSelector(state => state.MenusReducer.list);
    const { 
            id, 
            response, 
            mostrarOcultarModal, 
            pantalla, 
            errors, 
            handlerChangeValue, 
            grabar, 
            eliminar, 
            handlerBtnCancelar, 
            togleMenu,
        } = props

    return (
        <div>
            <ModalDialog response={response} toggle={mostrarOcultarModal}/>
            <SpinnerComponent />
            <Menu activeKeyMenu="15"/>
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                <Header />
                <div className="content-section">                    
                    <Form>
                        <div className="div-title">Mantenedor de Pantallas</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre de la pantalla"
                                    value={pantalla.nombre}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.nombre &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.nombre}</Form.Text>
                            </Form.Group>
                        }

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">Menú asociado</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    as="select"
                                    name="menus_id"
                                    value={pantalla.menus_id ? pantalla.menus_id : ''}
                                    onChange={e => handlerChangeValue(e)}
                                >
                                    {menus.length === 0 && <option>No se han encontrado registros</option>}
                                    {menus.length > 0 && <option>Seleccione</option>}
                                    {
                                        menus.map(m => {
                                            return <option key={m.id} value={m.id}>{m.nombre}</option>
                                        })
                                    }
                                    
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        {errors.menu_padre_id &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.menus_id}</Form.Text>
                            </Form.Group>
                        }


                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">Tiene botón crear</Form.Label>
                            <Col md="4">
                                <input
                                    type="checkbox"
                                    name="permite_crear"
                                    checked={pantalla.permite_crear}
                                    onChange={e => handlerChangeValue(e)}
                                >
                                </input>
                            </Col>
                        </Form.Group>
                        {errors.permite_crear &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.permite_crear}</Form.Text>
                            </Form.Group>
                        }

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">Tiene botón editar</Form.Label>
                            <Col md="4">
                                <input
                                    type="checkbox"
                                    name="permite_modificar"
                                    checked={pantalla.permite_modificar}
                                    onChange={e => handlerChangeValue(e)}
                                >
                                </input>
                            </Col>
                        </Form.Group>
                        {errors.permite_modificar &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.permite_modificar}</Form.Text>
                            </Form.Group>
                        }
                        
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">Tiene botón eliminar</Form.Label>
                            <Col md="4">
                                <input
                                    type="checkbox"
                                    name="permite_eliminar"
                                    checked={pantalla.permite_eliminar}
                                    onChange={e => handlerChangeValue(e)}
                                >
                                </input>
                            </Col>
                        </Form.Group>
                        {errors.permite_eliminar &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.permite_eliminar}</Form.Text>
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