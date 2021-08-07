import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import './style.css'
import { isEmail } from '../../../shared/funciones'

export const LoginCliente = (props) => {
    const [ credenciales, setCredenciales ] = useState({email: '', password: ''})
    const [ errors, setErrors ] = useState({email: '', password: ''})


    const handlerInput = (e) => {
        validaDatos(e.target.name, e.target.value)
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }


    const validaDatos = (field, value) => {
        if(field === 'email'){
            if(value.length === 0){setErrors({...errors, [field]: 'Debes ingresar tu email.'})}
            else if(!isEmail(value)){setErrors({...errors, [field]: 'El correo electrónico no es válido'})}
            else{
                setErrors({...errors, [field]: ''})
            }
        }else if(field === 'password'){ 
            if(value.length === 0){setErrors({...errors, [field]: 'Debes ingresar tu contraseña.'})}
            else if(value.length > 20){setErrors({...errors, [field]: 'La contraseña ingresada es demasiado larga'})}
            else{
                setErrors({...errors, [field]: ''})
            }
        }else{
            setErrors({...errors, [field]: ''})
        }
    }


    const login = () => {

    }

    return (
        <>
            <HeaderMarketComponent />
            <Container>
                <Row>
                    <h4>Ingreso a mi cuenta</h4>
                </Row>
                <Form as={Row} className="login-form-cliente">
                    <Col sm={{span: 4, offset: 4}}>
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
                            <Form.Check type="checkbox" label="Recordarme en éste equipo" />
                        </Form.Group>
                        <Button variant="primary" onClick={()=>login()}>
                            Ingresar
                        </Button>
                    </Col>
                </Form>
            </Container>
            <FooterComponent />
        </>
    )
}