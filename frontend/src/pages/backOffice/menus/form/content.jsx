import React from 'react';
import { Form, Col, Row } from 'react-bootstrap'
import { Header } from '../../../../components/backOffice/header'
import { Menu } from '../../../../components/backOffice/menu'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { SpinnerComponent } from '../../../../components/shared/spinner'

export const ContentMenus = (props) => {
    const { 
        id,
        response, 
        mostrarOcultarModal,
        menu,
        menus,
        errors,
        handlerChangeValue,
        grabar,
        eliminar, 
        handlerBtnCancelar
    } = props;


    return (
        <div>
            <ModalDialog response={response} toggle={mostrarOcultarModal}/>
            <Header />         
            <SpinnerComponent />   
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="15"/>
                </div>
                <div className="content-section">                    
                    <Form>
                        <div className="div-title">Mantenedor de menús</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre del menú"
                                    value={menu.nombre}
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
                            <Form.Label column sm="2">Url</Form.Label>
                            <Col md="8">
                                <Form.Control
                                    type="text"
                                    placeholder="Ruta asociada al menú"
                                    name="url"
                                    value={menu.url ? menu.url : ''}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                        </Form.Group>
                        {errors.url &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.url}</Form.Text>
                            </Form.Group>
                        }

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Posición</Form.Label>
                            <Col md="3">
                                <Form.Control
                                    type="number"
                                    placeholder="Posición del menú"
                                    name="posicion"
                                    value={menu.posicion}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                        </Form.Group>
                        {errors.posicion &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.posicion}</Form.Text>
                            </Form.Group>
                        }

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">Menú padre</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    as="select"
                                    name="menu_padre_id"
                                    value={menu.menu_padre_id ? menu.menu_padre_id : ''}
                                    onChange={e => handlerChangeValue(e)}
                                >
                                    {menus.length === 0 && <option>No se han encontrado registros</option>}
                                    {menus.length > 0 && <option>Seleccione</option>}
                                    {
                                        menus.filter(m => m.menu_padre_id === 0).map((m, key) => {
                                            return <option key={key} value={m.id}>{m.nombre}</option>
                                        })
                                    }
                                    
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        {errors.menu_padre_id &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.menu_padre_id}</Form.Text>
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