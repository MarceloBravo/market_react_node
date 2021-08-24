import React from 'react'
import { Form, Row, Col, Image, Button, Container, Accordion, Card } from 'react-bootstrap'
import { ModalDialog } from '../../../components/backOffice/modalDialog' 
import { Header } from '../../../components/backOffice/header'
import { SpinnerComponent } from '../../../components/shared/spinner'
import { Menu } from '../../../components/backOffice/menu'
import { Alerta } from '../../../components/shared/alerts'
import { FormButtons } from '../../../components/backOffice/form_buttons'
import './style.css'

export const InfoTiendaContent = (props) => {
    const { 
        response, infoTienda, handlerChangeValue, errors, grabar, handlerBtnCancelar, id,
        grabarMarquesina, imagenesMarquesina, loadImage, inputFileRef, refreshImage,
        getImage, imgRef, changeImage, removeImage, handleFieldsImages, hideAlert
     } = props

    return (
        <>
            <ModalDialog response={response}/>
            <Header />
            <SpinnerComponent />

            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="30"/>
                </div>
                <div className="content-section">                    
                    <Alerta />
                    
                    <Accordion>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="light" eventKey="0" onClick={()=>hideAlert()}>
                                        Configurar la información de la tienda
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        
                                        <Form>
                                            <div className="col-md-12" >
                                                <div className="div-title">Información de la tienda</div>
                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column md="2">Nombre de la tienda</Form.Label>
                                                    <Col md="4">
                                                        <Form.Control
                                                            type="text"
                                                            name="nombre_tienda"
                                                            placeholder="Nombre de la tienda"
                                                            value={infoTienda.nombre_tienda}
                                                            onChange={e => handlerChangeValue(e)}
                                                        />
                                                    </Col>
                                                    
                                                </Form.Group>
                                                {errors.nombre_tienda &&
                                                    <Form.Group as={Row}>
                                                        <Form.Text className="field-error offset-2">{ errors.nombre_tienda}</Form.Text>
                                                    </Form.Group>
                                                }


                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column md="2">Fono venta</Form.Label>
                                                    <Col md="4">
                                                        <Form.Control
                                                            type="text"
                                                            name="fono_venta"
                                                            placeholder="Fono venta (Ej. +56 1 987654321)"
                                                            value={infoTienda.fono_venta}
                                                            onChange={e => handlerChangeValue(e)}
                                                        />
                                                    </Col>
                                                    
                                                </Form.Group>
                                                {errors.fono_venta &&
                                                    <Form.Group as={Row}>
                                                        <Form.Text  className="field-error offset-2">{ errors.fono_venta}</Form.Text>
                                                    </Form.Group>
                                                }


                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column md="2">Email</Form.Label>
                                                    <Col md="4">
                                                        <Form.Control
                                                            type="text"
                                                            name="email"
                                                            placeholder="Email de contacto"
                                                            value={infoTienda.email}
                                                            onChange={e => handlerChangeValue(e)}
                                                        />
                                                    </Col>
                                                    
                                                </Form.Group>
                                                {errors.email &&
                                                    <Form.Group as={Row}>
                                                        <Form.Text  className="field-error offset-2">{ errors.email}</Form.Text>
                                                    </Form.Group>
                                                }


                                                <Form.Group as={Row} controlId="formPlaintextEmail">
                                                    <Form.Label column md="2">Dirección</Form.Label>
                                                    <Col md="4">
                                                        <Form.Control
                                                            type="text"
                                                            name="direccion"
                                                            placeholder="Dirección Casa Matriz"
                                                            value={infoTienda.direccion}
                                                            onChange={e => handlerChangeValue(e)}
                                                        />
                                                    </Col>
                                                    
                                                </Form.Group>
                                                {errors.direccion &&
                                                    <Form.Group as={Row}>
                                                        <Form.Text className="field-error offset-2">{ errors.direccion}</Form.Text>
                                                    </Form.Group>
                                                }

                                                <FormButtons
                                                    grabar={grabar} 
                                                    textoGrabar={'Actualizar información de la tienda'}
                                                    handlerBtnCancelar={handlerBtnCancelar}
                                                    errors={errors} 
                                                    ocultarCancelar={true}
                                                    id={id} 
                                                />
                                            </div>

                                        </Form>
                                                        
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="light" eventKey="1" onClick={()=>hideAlert()}>
                                    Configurar las imágenes de la marquesina de la portada de la tienda
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>

                                        <Form className="form-imagenes-marquezina">
                                            <div className="div-title">Imágenes de la marquesina de la portada de la tienda</div>

                                            <div className="div-images-containner col-md-12" >
                                                    <Button 
                                                        variant="primary"
                                                        onClick={() => loadImage()}
                                                    >Agregar imágenes</Button>
                                                    <input 
                                                        type="file" 
                                                        className="hidden-control"
                                                        ref={inputFileRef} 
                                                        onChange={e => refreshImage(e)}
                                                        multiple
                                                    ></input>
                                                    {imagenesMarquesina.imagenes?.length > 0 && 
                                                        <Container className="images-containner">
                                                                <Row>
                                                                {imagenesMarquesina.imagenes.map((i, key) => {
                                                                    return  <Form.Group as={Row} key={key} controlId="formPlaintextEmail">
                                                                                <Col md={4} className="img-marquezina">
                                                                                
                                                                                    <Image 
                                                                                        src={ getImage(i)} 
                                                                                        ref={ref => imgRef.current.push(ref)} 
                                                                                        thumbnail 
                                                                                        alt={i.source_image} 
                                                                                        className={"imagen-mnt-marquezina " + (i.imagen_principal ? 'default-image' : '')}
                                                                                        onClick={() => changeImage(i.id)}
                                                                                        title="Cambiar imágen"
                                                                                    ></Image>
                                                                                    
                                                                                </Col>

                                                                                <Col md={8}>
                                                                                    <Form.Control
                                                                                        type="text"
                                                                                        name={`texto`}
                                                                                        placeholder="Texto de la imágen"
                                                                                        value={i.texto}
                                                                                        onChange={e => handleFieldsImages(i.id, e)}
                                                                                    />
                                                                                    {i.errors?.texto &&
                                                                                        <Form.Group as={Row}>
                                                                                            <Form.Text className="field-error field-error-marquezina offset-2">{ i.errors.texto}</Form.Text>
                                                                                        </Form.Group>
                                                                                    }

                                                                                    <Row>
                                                                                        <Col md="4">
                                                                                    
                                                                                            <Form.Control 
                                                                                                type="number"
                                                                                                name={`posicion`}
                                                                                                placeholder="Posición"
                                                                                                value={i.posicion}
                                                                                                onChange={e => handleFieldsImages(i.id, e)}
                                                                                            />
                                                                                            {i.errors?.posicion &&
                                                                                                <Form.Group as={Row}>
                                                                                                    <Form.Text className="field-error field-error-marquezina offset-2">{ i.errors.posicion }</Form.Text>
                                                                                                </Form.Group>
                                                                                            }
                                                                                        </Col>

                                                                                        <Col md="8">
                                                                                            <Form.Control
                                                                                                type="text"
                                                                                                name={`link`}
                                                                                                placeholder="Hipervinculo asociado (opcional)"
                                                                                                value={i.link}
                                                                                                onChange={e => handleFieldsImages(i.id, e)}
                                                                                            />
                                                                                            {i.errors?.link &&
                                                                                                <Form.Group as={Row}>
                                                                                                    <Form.Text className="field-error field-error-marquezina offset-2">{ i.errors.link }</Form.Text>
                                                                                                </Form.Group>
                                                                                            }
                                                                                        </Col>
                                                                                    </Row>
                                                                                    <Button variant="danger" onClick={() => removeImage(i.id)}>
                                                                                        Eliminar
                                                                                    </Button>
                                                                                </Col>
                                                                                    
                                                                            </Form.Group>
                                                                    })
                                                                }
                                                                
                                                                </Row>
                                                                <FormButtons
                                                                    grabar={grabarMarquesina} 
                                                                    textoGrabar={'Actualizar marquezina'}
                                                                    handlerBtnCancelar={handlerBtnCancelar}
                                                                    errors={errors} 
                                                                    ocultarCancelar={true}
                                                                    id={id} 
                                                                />
                                                        </Container>
                                                    }
                                                    
                                                </div>

                                        </Form>
                                        
                                    </Card.Body>
                                </Accordion.Collapse>

                            </Card>
                        </Accordion>
                </div>
            </div>
        </>
    )
}