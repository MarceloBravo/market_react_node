import React from 'react'
import { ModalDialog } from '../../../components/backOffice/modalDialog'
import { Header } from '../../../components/backOffice/header'
import { SpinnerComponent } from '../../../components/shared/spinner'
import { Alerta } from '../../../components/shared/alerts'
import { Menu } from '../../../components/backOffice/menu'
import { Form, Col, Row, Button, Image } from 'react-bootstrap'
import { defaultAvatarUrl, defaultImagesUrl } from  '../../../shared/constantes'
import './style.css'

export const PerfilContent = (props) => {
    const { response, usuario, handlerChangeValue, errors, grabar, cancelar, fileAvatar, fnLoadImage, fnRefreshAvatar } = props

    return (
        <div>
            <ModalDialog response={response}/>
            <SpinnerComponent/>
            <Header/>
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="1"/>
                </div>
                <div className="content-section">
                    <Alerta />
                    <Form>
                        <div className="div-title">Perfil</div>

                        <Form.Group as={Row}>

                            <Col md="6">
                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">Nombre</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Ingresa tu nombre"
                                            value={usuario.name}
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
                                    <Form.Label column sm="4">A. Paterno</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="a_paterno"
                                            placeholder="Ingresa tu primer apellido"
                                            value={usuario.a_paterno}
                                            onChange={e => handlerChangeValue(e)}
                                        />
                                    </Col>
                                </Form.Group>
                                {errors.a_paterno &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.a_paterno }</Form.Text>
                                    </Form.Group>
                                }

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">A. Materno</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="a_materno"
                                            placeholder="Ingresa tu segúndo apellido"
                                            value={usuario.a_materno}
                                            onChange={e => handlerChangeValue(e)}
                                        />
                                    </Col>
                                </Form.Group>
                                {errors.a_materno &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.a_materno}</Form.Text>
                                    </Form.Group>
                                }

                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">Fono</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="fono"
                                            placeholder="Correo electrónico"
                                            value={usuario.fono}
                                            onChange={e => handlerChangeValue(e)}
                                        />
                                    </Col>
                                </Form.Group>
                                {errors.fono &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.fono }</Form.Text>
                                    </Form.Group>
                                }


                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">Email</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="email"
                                            placeholder="Correo electrónico"
                                            value={usuario.email}
                                            onChange={e => handlerChangeValue(e)}
                                        />
                                    </Col>
                                </Form.Group>
                                {errors.email &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.email }</Form.Text>
                                    </Form.Group>
                                }
                            </Col>
                            <Col md="6">
                                <Col xs={6} md={4} className="image-content">
                                    <Image src={(usuario.foto || usuario.objFile) ? (usuario.objFile ? usuario.objFile : defaultImagesUrl + usuario.foto) : defaultAvatarUrl} roundedCircle onClick={() => fnLoadImage()} className="image"/>
                                    <input type="file" name="avatar" ref={fileAvatar} onChange={e => fnRefreshAvatar(e)} className="hidden-control"></input>
                                </Col>
                                {errors.foto &&
                                    <Form.Group as={Row}>
                                        <Form.Text className="field-error offset-2">{ errors.foto }</Form.Text>
                                    </Form.Group>
                                }
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Dirección</Form.Label>
                            <Col md="8">
                                <Form.Control
                                    type="text"
                                    name="direccion"
                                    placeholder="Dirección"
                                    value={usuario.direccion}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                        </Form.Group>
                        {errors.direccion &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.direccion }</Form.Text>
                            </Form.Group>
                        }

                        
                    
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Contraseña</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="password"
                                    placeholder="Ingresa una contraseña"
                                    value={usuario.password}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                        </Form.Group>
                        {errors.password &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.password }</Form.Text>
                            </Form.Group>
                        }

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Confirmar contraseña</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="confirm_password"
                                    placeholder="Reingresa la contraseña"
                                    value={usuario.confirm_password}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                        </Form.Group>
                        {errors.confirm_password &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.confirm_password }</Form.Text>
                            </Form.Group>
                        }


                        <div className="btn-group">
                            <Button variant="success" onClick={grabar} disabled={Object.keys(errors).filter(e => (errors[e]!== null && errors[e] !== "")).length>0}>Grabar</Button>
                            <Button variant="info" onClick={cancelar}>Cancelar</Button>
                        </div>
                            
                    </Form>
                </div>
            </div>
                
        </div>
    )
}