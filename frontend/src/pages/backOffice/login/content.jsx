import React from 'react'
import { Form, Button } from 'react-bootstrap';

export const Content = (props) => {
    const {
        credentials,
        changeEmailHandler,
        errors,
        changePasswordHandler,
        rememberMe,
        changeRememberMeHandler,
        sendLogin,
        loginError,
        nombre_app
    } = props

    return (
        <div className="background-login">
            {loginError && <label className="login-error">{loginError}</label>}
            <Form className="login-form">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Ingresa tu email"
                        className="input-login"
                        value={credentials.email}
                        onChange={e => changeEmailHandler(e)}
                        
                    />
                    {errors?.email &&
                        <Form.Text className="text-muted">
                        { errors?.email }
                        </Form.Text>
                    }
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        className="input-login"
                        value={credentials.password}
                        onChange={e => changePasswordHandler(e)}                        
                    />
                    {errors?.password &&
                        <Form.Text className="text-muted">
                            { errors?.password }
                        </Form.Text>
                    }
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Recordarme" checked={rememberMe} onChange={ e => changeRememberMeHandler(e) }/>
                </Form.Group>
                <Button variant="primary" type="button" onClick={sendLogin} disabled={errors.email && errors.password}>
                    Ingresar
                </Button>
            </Form>
            <div className="div-name-app">
                <label>{nombre_app}</label>
            </div>
        </div>
    )
}