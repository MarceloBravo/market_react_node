import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { Alerta } from '../../../components/shared/alerts'
import { LoginClienteComponent } from '../../../components/frontOffice/loginCliente/loginCliente'
import './style.css'

export const IdentificacionClienteContent = (props) => {
    const { cliente, handlerInput, errors, continuarCompra, continuar } = props

    return (
        <>
            <HeaderMarketComponent />
            <Container>
                <Alerta />
                <Row>
                    <Col>
                        <h4>Identificación del cliente</h4>
                    </Col>
                    <Col>
                        <h4 className="titulo-paso">Paso 1</h4>
                    </Col>                    
                </Row>
                <Row>
                    <Col md="6" className="col-left">
                        <h5>Comprar con mi cuenta</h5>
                        <LoginClienteComponent 
                            alingJson={{span: 8, offset: 2}} 
                            cssClass={'login-compras'}
                            destino="/datosDespacho"
                        />
                    </Col>
                    <Col md="6">
                        <h5>Comprar sin registrarme</h5>
                        <Form>
                            
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Rut</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="rut"
                                        placeholder="11.222.333-k" 
                                        value={cliente.rut}
                                        onChange={e => handlerInput(e)}
                                    />
                                    {errors.rut  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.rut }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="nombres"
                                        placeholder="Nombre(s)" 
                                        value={cliente.nombres}
                                        onChange={e => handlerInput(e)}
                                    />
                                    {errors.nombres  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.nombres }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Apellido 1</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="apellido1"
                                        placeholder="Apellido 1" 
                                        value={cliente.apellido1}
                                        onChange={e => handlerInput(e)}
                                    />
                                    {errors.apellido1  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.apellido1 }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Apellido 2</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="apellido2"
                                        placeholder="Apellido 2 (Opcional)" 
                                        value={cliente.apellido2}
                                        onChange={e => handlerInput(e)}
                                    />
                                    {errors.apellido2  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.apellido2 }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>

                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Fono</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        name="fono" 
                                        placeholder="Celular"
                                        value={cliente.fono}
                                        onChange={e => handlerInput(e)}
                                    />
                                    {errors.fono  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.fono }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        name="email"
                                        placeholder="Correo electrónico" 
                                        value={cliente.email}
                                        onChange={e => handlerInput(e)}    
                                    />
                                    {errors.email  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.email }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>
                            </Row>
                        </Form> 
                        <Row>
                            <Button variant="primary" onClick={()=>continuarCompra()} disabled={!continuar}>
                                continuar
                            </Button>
                        </Row>
                    </Col>
                </Row>
                <Row className="row-bottom">

                </Row>
            </Container>
            <FooterComponent />
        </>
    )
}