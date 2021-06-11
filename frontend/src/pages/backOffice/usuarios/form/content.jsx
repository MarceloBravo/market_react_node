import React from 'react';
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { Menu } from '../../../../components/backOffice/menu'
import { Form, Col, Row, Image } from 'react-bootstrap'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { defaultAvatarUrl, defaultImagesUrl } from '../../../../shared/constantes'
import './style.css'

export const ContentUsuariosForm = (props)  =>{
    const { 
            response, 
            mostrarOcultarModal, 
            usuario,
            handlerChangeValue,
            errors,
            roles,
            fnGrabar,
            fnEliminar,
            cancelar,
            id,
            fileReference,
            fnLoadImage,
            fnRefgreshImage
         } = props

    return (
        <>
            <ModalDialog response={response} toggle={mostrarOcultarModal}/>
            <Header />
            <SpinnerComponent />  
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="1"/>
                </div>
                <div className="content-section">                    
                    <Form>
                        <div className="div-title">Mantenedor de Usuarios</div>

                        <Form.Group as={Row}>
                            <Col md="6">
                                <Form.Group as={Row} controlId="formNombre">
                                    <Form.Label column sm="4">Nombre</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Nombre del usuario"
                                            value={usuario.name}
                                            onChange={e => handlerChangeValue(e)}
                                        />
                                    </Col>
                                    
                                </Form.Group>
                                {errors.name &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.name }</Form.Text>
                                    </Form.Group>
                                }

                                <Form.Group as={Row} controlId="formApellido1">
                                    <Form.Label column sm="4">Apellido 1</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="a_paterno"
                                            placeholder="Ingresa el primer apellido"
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

                                <Form.Group as={Row} controlId="formApellido2">
                                    <Form.Label column sm="4">Apellido 2</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="a_materno"
                                            placeholder="Ingresa el segundo apellido"
                                            value={usuario.a_materno}
                                            onChange={e => handlerChangeValue(e)}
                                        />
                                    </Col>
                                    
                                </Form.Group>
                                {errors.a_materno &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.a_materno }</Form.Text>
                                    </Form.Group>
                                }

                                
                                <Form.Group as={Row} controlId="formFono">
                                    <Form.Label column sm="4">Fono</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="fono"
                                            placeholder="Ingresa el teléfono de contacto del usuario"
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

                                <Form.Group as={Row} controlId="formEmail">
                                    <Form.Label column sm="4">Email</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="email"
                                            placeholder="Ingresa el correo electrónico del usuario"
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
                                <Col xs={6} md={4} className="offset-2 image-content">
                                    <Image src={(usuario.foto || usuario.objImagen) ? (usuario.objImagen ? usuario.objImagen : defaultImagesUrl + usuario.foto )  : defaultAvatarUrl} roundedCircle onClick={() => fnLoadImage()} className="image"/>
                                    <input type="file" name="avatar" ref={fileReference} className="hidden-control" onChange={e => fnRefgreshImage(e) }></input>
                                </Col>
                                {errors.foto  &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.foto }</Form.Text>
                                    </Form.Group>
                                }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formDireccion">
                            <Form.Label column sm="2">Dirección</Form.Label>
                            <Col md="8">
                                <Form.Control
                                    type="text"
                                    name="direccion"
                                    placeholder="Ingresa la dirección"
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
                            <Form.Label column sm="2">Roles</Form.Label>
                            <Col md="4">
                                <Form.Control 
                                    as="select"
                                    name="roles_id" 
                                    value={usuario.roles_id}
                                    onChange={e => handlerChangeValue(e)}
                                    multiple
                                >
                                    {roles.length === 0 && <option key="-1" value="">-- No se han encontrado roles --</option> }
                                    {roles.map((r,key) => {
                                        return  <option key={key} value={r.id}>{r.name}</option>
                                    }
                                    )}
                                </Form.Control>
                            </Col>
                            
                        </Form.Group>
                        {errors.roles &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.roles }</Form.Text>
                            </Form.Group>
                        }

                        
                        <Form.Group as={Row} controlId="formPassword">
                            <Form.Label column sm="2">Contraseña</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Ingresa la contraseña."
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

                        <Form.Group as={Row} controlId="formConfirmPassword">
                            <Form.Label column sm="2">Confirmar contraseña</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Repite la contraseña."
                                    value={usuario.confirmPassword}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>                            
                        </Form.Group>
                        {errors.confirmPassword &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.confirmPassword }</Form.Text>
                            </Form.Group>
                        }
                        
                        <FormButtons 
                            grabar={fnGrabar} 
                            eliminar={fnEliminar} 
                            handlerBtnCancelar={cancelar} 
                            errors={errors} 
                            id={id}
                        />
                    </Form>
                </div>
            </div>
        </>
    );
}