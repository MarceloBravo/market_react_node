import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './style.css'

export const LoginClientContent = (props) => {
    const { handlerInput, errors, registrarUsuario, login, rememberMe, changeRememberMeHandler, alingJson, cssClass } = props

    return (
        <>  
            <Form as={Row} className={cssClass ? cssClass : "login-form-cliente"}>
                <Col sm={alingJson ? alingJson : {span: 4, offset: 4}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email"
                            placeholder="Ingresa tu correo electrónico" 
                            onChange={e => handlerInput(e)}
                        />
                    </Form.Group>
                    {errors.email && 
                        <Form.Group as={Row}>
                            <Form.Text  className="field-error offset-2">{ errors.email}</Form.Text>
                        </Form.Group>
                    }

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="password"
                            placeholder="Ingresa tu contraseña" 
                            onChange={e => handlerInput(e)}
                        />
                    </Form.Group>
                    {errors.password && 
                        <Form.Group as={Row}>
                            <Form.Text  className="field-error offset-2">{ errors.password}</Form.Text>
                        </Form.Group>
                    }

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Recordarme en éste equipo" checked={rememberMe} onChange={ e => changeRememberMeHandler(e)}/>
                    </Form.Group>
                    <Button variant="primary" onClick={()=>login()}>
                        Ingresar
                    </Button>
                </Col>
            </Form>
            <Row>
                <Col md={{span: 4, offset: 4}} className="col-registro-cli">
                    ¿No tienes una cuenta? <Link to="#" onClick={()=>registrarUsuario()}>Registrate aqí</Link>
                </Col>
            </Row>
        
        </>
    )
}