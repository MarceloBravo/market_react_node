import React from 'react'
import { Form, Row, Col, Button, Container, Image } from 'react-bootstrap'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { defaultAvatarUrl, defaultImagesUrl } from '../../../shared/constantes'
import { ModalDialog } from '../../../components/backOffice/modalDialog'
import { Alerta } from '../../../components/shared/alerts'

export const RegistroClienteContent = (props) => {
    const { 
        response, 
        cliente, 
        fnLoadImage, 
        fileReference, 
        fnRefgreshImage, 
        errors, 
        handlerChangeValue, 
        regiones,
        provincias,
        comunas,
        cargarProvincias,
        cargarComunas,
        registrar,
        goToLogin, 
    } = props

    return (
        <>
            <HeaderMarketComponent />
            <ModalDialog response={response}/>
            <Alerta />
            <Container>
                <Row>
                    <h4>Crear cuenta</h4>
                </Row>
                <Row>
                    <Col md={{span: 6, offset: 3}}>
                        <Form>
                            <Row>
                                <Col xs={6} md={4} className="offset-2 image-content">
                                    <Image 
                                        src={(cliente.foto || cliente.objImagen) ? (cliente.objImagen ? cliente.objImagen : defaultImagesUrl + cliente.foto )  : defaultAvatarUrl} 
                                        roundedCircle 
                                        onClick={() => fnLoadImage()} 
                                        className="avatar-registro-cliente"
                                    />
                                    <input 
                                        type="file" 
                                        name="avatar" 
                                        ref={fileReference} 
                                        className="hidden-control" 
                                        onChange={e => fnRefgreshImage(e) }
                                    ></input>
                                </Col>
                                {errors.foto  &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.foto }</Form.Text>
                                    </Form.Group>
                                }
                            </Row>
                            
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Rut</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="rut"
                                        placeholder="11.222.333-k" 
                                        value={cliente.rut}
                                        onChange={e => handlerChangeValue(e)}
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
                                        onChange={e => handlerChangeValue(e)}
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
                                        onChange={e => handlerChangeValue(e)}
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
                                        placeholder="Apellido 2" 
                                        value={cliente.apellido2}
                                        onChange={e => handlerChangeValue(e)}
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
                                        onChange={e => handlerChangeValue(e)}
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
                                        onChange={e => handlerChangeValue(e)}    
                                    />
                                    {errors.email  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.email }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        name="password"
                                        placeholder="Ingresa una contraseña" 
                                        value={cliente.password}
                                        onChange={e => handlerChangeValue(e)}
                                    />
                                    {errors.password  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.password }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Confirmar Contraseña</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        name="confirm_password"
                                        placeholder="Repite la contraseña" 
                                        value={cliente.confirm_password}
                                        onChange={e => handlerChangeValue(e)}
                                    />
                                    {errors.confirm_password  &&
                                        <Form.Group as={Row}>
                                            <Form.Text className="field-error">{ errors.confirm_password }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="direccion"
                                    placeholder="Dirección particular (Se utilizará para los despachos)" 
                                    value={cliente.direccion}
                                    onChange={e => handlerChangeValue(e)}    
                                />
                                {errors.direccion  &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error">{ errors.direccion }</Form.Text>
                                    </Form.Group>
                                }
                            </Form.Group>

                            <Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Región</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        name="cod_region" 
                                        value={cliente.cod_region}
                                        onChange={e => cargarProvincias(e)}
                                    >
                                        {regiones.length === 0 && <option key="-1" value="">-- No se han encontrado regiones --</option> }
                                        {regiones.length > 0 && <option key="-1" value="">-- Seleccione --</option> }
                                        {regiones.map((r,key) => {
                                            return  <option key={key} value={r.codigo}>{r.nombre}</option>
                                        })}
                                        {errors.cod_region  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.cod_region }</Form.Text>
                                        </Form.Group>
                                    }
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Provincia</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        name="cod_provincia" 
                                        value={cliente.cod_provincia}
                                        onChange={e => cargarComunas(e)}
                                    >
                                        {provincias.length === 0 && <option key="-1" value="">-- No se han encontrado provincias --</option> }
                                        {provincias.length > 0 && <option key="-1" value="">-- Seleccione --</option> }
                                        {provincias.map((c,key) => {
                                            return  <option key={key} value={c.codigo}>{c.nombre}</option>
                                        })}
                                        {errors.cod_provincia  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.cod_provincia }</Form.Text>
                                        </Form.Group>
                                    }
                                    </Form.Control>
                                    
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Comuna</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        name="cod_comuna" 
                                        value={cliente.cod_comuna}
                                        onChange={e => handlerChangeValue(e)}
                                    >
                                        {comunas.length === 0 && <option key="-1" value="">-- No se han encontrado comunas --</option> }
                                        {comunas.length > 0 && <option key="-1" value="">-- Seleccione --</option> }
                                        {comunas.map((c,key) => {
                                            return  <option key={key} value={c.codigo}>{c.nombre}</option>
                                        })}
                                        {errors.cod_comuna  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.cod_comuna }</Form.Text>
                                        </Form.Group>
                                    }
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        name="ciudad" 
                                        placeholder="Ciuidad"
                                        value={cliente.ciudad}
                                        onChange={e => handlerChangeValue(e)}
                                    />
                                    {errors.cod_ciudad  &&
                                        <Form.Group as={Row}>
                                            <Form.Text className="field-error">{ errors.cod_ciudad }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>

                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Casa número</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="casa_num"
                                        placeholder="Número de casa" 
                                        value={cliente.casa_num}
                                        onChange={e => handlerChangeValue(e)}    
                                    />
                                    {errors.casa_num  &&
                                        <Form.Group as={Row}>
                                            <Form.Text className="field-error">{ errors.casa_num }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Block N°</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="block_num"
                                        placeholder="Número de block (Opcional)" 
                                        value={cliente.block_num}
                                        onChange={e => handlerChangeValue(e)}
                                    />
                                    {errors.block_num  &&
                                        <Form.Group as={Row}>
                                            <Form.Text className="field-error">{ errors.block_num }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Referencia</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="referencia"
                                    placeholder="Cómo llegar... (Opcional)" 
                                    value={cliente.referencia}
                                    onChange={e => handlerChangeValue(e)}    
                                />
                                {errors.referencia  &&
                                    <Form.Group as={Row}>
                                        <Form.Text className="field-error">{ errors.referencia }</Form.Text>
                                    </Form.Group>
                                }
                            </Form.Group>

                            <Button 
                                variant="primary" 
                                onClick={() => registrar()}
                                disabled={Object.keys(errors).filter(e => errors[e] !== '').length > 0}
                            >
                                Registrarme
                            </Button>

                            <Button variant="primary" onClick={() => goToLogin()}>
                                Ir a login
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <br/>
            </Container>
            <FooterComponent />
        </>
    )
}