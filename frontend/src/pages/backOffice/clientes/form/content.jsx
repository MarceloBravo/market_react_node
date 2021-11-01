import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Form, Col, Row, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { defaultImagesUrl, defaultAvatarUrl } from '../../../../shared/constantes'
import './style.css'

export const ClientesContent = (props) => {
    const {
        response, 
        cliente, 
        errors, 
        handlerChangeValue, 
        fnLoadImage, 
        fileReference, 
        fnRefgreshImage, 
        regionesState, 
        provinciasState, 
        comunasState, 
        grabar, 
        eliminar, 
        cancelar, 
        id, 
        togleMenu,
    } = props 

    return (
        <div>
            <ModalDialog response={response} />
            <Menu activeKeyMenu="19"/>
            <SpinnerComponent /> 
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                <Header />
                <div className="content-section">
                    <Alerta />
                    <Form className="form-cliente">
                        <div className="div-title">Mantenedor de Clientes</div>
                        <Row>
                            <Col md={6}>
                            
                            <Form.Group as={Row} controlId="rut">
                                    <Form.Label column sm="4">Rut</Form.Label>
                                    <Col md="5">
                                        <Form.Control
                                            type="text"
                                            name="rut"
                                            placeholder="Rut"
                                            value={cliente.rut}
                                            onChange={e => handlerChangeValue(e)}
                                        />
                                    </Col>
                                    
                                </Form.Group>
                                {errors.rut &&
                                    <Form.Group as={Row}>
                                        <Form.Text className="field-error offset-4">{ errors.rut }</Form.Text>
                                    </Form.Group>
                                }
                            
                                <Form.Group as={Row} controlId="nombres">
                                    <Form.Label column sm="4">Nombres</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="nombres"
                                            placeholder="Nombre(s)"
                                            value={cliente.nombres}
                                            onChange={e => handlerChangeValue(e)}
                                        />
                                    </Col>
                                    
                                </Form.Group>
                                {errors.nombres &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-4">{ errors.nombres}</Form.Text>
                                    </Form.Group>
                                }


                                <Form.Group as={Row} controlId="apellido1">
                                    <Form.Label column sm="4">Primer apellido</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="apellido1"
                                            placeholder="Primer apellido"
                                            value={cliente.apellido1}
                                            onChange={e => handlerChangeValue(e)}
                                        />
                                    </Col>
                                    
                                </Form.Group>
                                {errors.apellido1 &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-4">{ errors.apellido1}</Form.Text>
                                    </Form.Group>
                                }

                                <Form.Group as={Row} controlId="apellido2">
                                    <Form.Label column sm="4">Segundo apellido</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="apellido2"
                                            placeholder="Segundo apellido"
                                            value={cliente.apellido2}
                                            onChange={e => handlerChangeValue(e)}
                                        />
                                    </Col>
                                    
                                </Form.Group>
                                {errors.apellido2 &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-4">{ errors.apellido2}</Form.Text>
                                    </Form.Group>
                                }


                            <Form.Group as={Row} controlId="email">
                                <Form.Label column sm="4">Email</Form.Label>
                                <Col md="8">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Ingresa el correo electrónico del cliente"
                                        value={cliente.email}
                                        onChange={e => handlerChangeValue(e)}
                                    />
                                </Col>
                                
                            </Form.Group>
                            {errors.email &&
                                <Form.Group as={Row}>
                                    <Form.Text  className="field-error offset-4">{ errors.email }</Form.Text>
                                </Form.Group>
                            }


                            <Form.Group as={Row} controlId="fono">
                                <Form.Label column sm="4">Fono</Form.Label>
                                <Col md="8">
                                    <Form.Control
                                        type="text"
                                        name="fono"
                                        placeholder="Ingresa el teléfono del cliente"
                                        value={cliente.fono}
                                        onChange={e => handlerChangeValue(e)}
                                    />
                                </Col>
                                
                            </Form.Group>
                            {errors.fono &&
                                <Form.Group as={Row}>
                                    <Form.Text  className="field-error offset-4">{ errors.fono }</Form.Text>
                                </Form.Group>
                            }

                                
                            </Col>
                            <Col md={6}>
                            
                                <Col xs={6} md={4} className="offset-2 image-content image-content-client">
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip id="button-tooltip">Da click para cargar una nueva foto</Tooltip>}
                                    >
                                        <Image 
                                            src={
                                                (cliente.foto || cliente.objImagen) ? 
                                                (cliente.objImagen ? cliente.objImagen : defaultImagesUrl + cliente.foto )  :
                                                defaultAvatarUrl} 
                                            roundedCircle 
                                            onClick={() => fnLoadImage()} 
                                            className="client-image image"
                                        />
                                    </OverlayTrigger>
                                    <input 
                                        type="file" 
                                        name="foto" 
                                        ref={fileReference} 
                                        className="hidden-control" 
                                        onChange={e => fnRefgreshImage(e) }
                                    ></input>
                                </Col>
                                <Form.Label className="info-foto">Haz click sobre la imágen para cambiar la foto del cliente.</Form.Label>
                                {errors.foto  &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.foto }</Form.Text>
                                    </Form.Group>
                                }
                            

                            </Col>
                        </Row>

                        <Form.Group as={Row} controlId="direccion">
                            <Form.Label column sm="2">Dirección</Form.Label>
                            <Col md="10">
                                <Form.Control
                                    type="text"
                                    name="direccion"
                                    placeholder="Dirección particular"
                                    value={cliente.direccion}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.direccion &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.direccion}</Form.Text>
                            </Form.Group>
                        }


                        <Form.Group as={Row} controlId="regiones">
                            <Form.Label column sm="2">Región</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    as="select"
                                    name="cod_region"
                                    value={cliente.cod_region ? cliente.cod_region : ''}
                                    onChange={e => handlerChangeValue(e)}
                                >
                                    {regionesState.length === 0 && <option>No se han encontrado registros</option>}
                                    {regionesState.length > 0 && <option>Seleccione</option>}
                                    {
                                        regionesState && regionesState.map((r, k) => {
                                            return <option key={`${r.codigo} ${k}`} value={r.codigo}>{r.nombre}</option>
                                        })
                                    }
                                    
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        {errors.cod_region &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.cod_region}</Form.Text>
                            </Form.Group>
                        }


                        
                        <Form.Group as={Row} controlId="provincias">
                            <Form.Label column sm="2">Provincia</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    as="select"
                                    name="cod_provincia"
                                    value={cliente.cod_provincia ? cliente.cod_provincia : ''}
                                    onChange={e => handlerChangeValue(e)}
                                >
                                    {provinciasState.length === 0 && <option>No se han encontrado registros</option>}
                                    {provinciasState.length > 0 && <option>Seleccione</option>}
                                    {
                                        provinciasState.length > 0 && provinciasState.map((r, k) => {
                                            return <option key={`${r.codigo} ${k}`} value={r.codigo}>{r.nombre}</option>
                                        })
                                    }
                                    
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        {errors.cod_provincia &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.cod_provincia }</Form.Text>
                            </Form.Group>
                        }


                        <Form.Group as={Row} controlId="comunas">
                            <Form.Label column sm="2">Comunas</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    as="select"
                                    name="cod_comuna"
                                    value={cliente.cod_comuna ? cliente.cod_comuna : ''}
                                    onChange={e => handlerChangeValue(e)}
                                >
                                    {comunasState.length === 0 && <option>No se han encontrado registros</option>}
                                    {comunasState.length > 0 && <option>Seleccione</option>}
                                    {
                                        comunasState.length > 0 && comunasState.map((r, k) => {
                                            return <option key={`${r.codigo} ${k}`} value={r.codigo}>{r.nombre}</option>
                                        })
                                    }
                                    
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        {errors.cod_comuna &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.cod_comuna }</Form.Text>
                            </Form.Group>
                        }


                        <Form.Group as={Row} controlId="ciudad">
                            <Form.Label column sm="2">Ciudad</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="ciudad"
                                    placeholder="Ciudad"
                                    value={cliente.ciudad}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.ciudad &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.ciudad }</Form.Text>
                            </Form.Group>
                        }


                        


                        

                        <Form.Group as={Row} controlId="casa_num">
                            <Form.Label column sm="2">Casa N°</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="casa_num"
                                    placeholder="Número de casa o  departamento del cliente"
                                    value={cliente.casa_num}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.casa_num &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.casa_num }</Form.Text>
                            </Form.Group>
                        }

                        <Form.Group as={Row} controlId="block_num">
                            <Form.Label column sm="2">Block N°</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="block_num"
                                    placeholder="Número de block del cliente (Opcional)"
                                    value={cliente.block_num}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.block_num &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.block_num }</Form.Text>
                            </Form.Group>
                        }

                        
                        <Form.Group as={Row} controlId="referencia">
                            <Form.Label column sm="2">Referencia</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="referencia"
                                    placeholder="Ingresa una referencia o indicación de cómo llegar (Opcional)"
                                    value={cliente.referencia}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.referencia &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.referencia }</Form.Text>
                            </Form.Group>
                        }

                        <Form.Group as={Row} controlId="password">
                            <Form.Label column sm="2">Contraseña</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Ingresa una contraseña"
                                    value={cliente.password ? cliente.password : ''}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.password &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.password }</Form.Text>
                            </Form.Group>
                        }

                        <Form.Group as={Row} controlId="confirm_password">
                            <Form.Label column sm="2">Confirmar contraseña</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="password"
                                    name="confirm_password"
                                    placeholder="Repite la contraseña"
                                    value={cliente.confirm_password ? cliente.confirm_password : ''}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.confirm_password &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.confirm_password }</Form.Text>
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
        </div>
    )
}