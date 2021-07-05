import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { Form, Row, Col, Container, Image, Button } from 'react-bootstrap'

export const ProductosFormContent = (props) => {
    const { response, pantalla, producto, handlerChangeValue, errors, formatDate, unidades, marcas, categorias,
        subCategorias, impuestos, loadImage, inputFileRef, refreshImage, getImage, imgRef, changeImage, 
        selectDefaultImage, removeImage, grabar, eliminar, handlerBtnCancelar, id  } = props

    return (
        <div>
            <ModalDialog response={response} />
            <Header />      
            <SpinnerComponent /> 
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="0"/>
                </div>
                <div className="content-section">
                    <Alerta />
                    <Form>
                        <div className="div-title">Mantenedor de {pantalla.nombre}</div>
                        <div className="row">
                            <div className="col-md-7">
                                <Form.Group as={Row} controlId="TxtNombre">
                                    <Form.Label column sm="4">Nombre</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="nombre"
                                            placeholder="Nombre del producto"
                                            value={producto.nombre}
                                            onChange={e => handlerChangeValue(e)}
                                        />
                                    </Col>
                                    
                                </Form.Group>
                                {errors.nombre &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.nombre}</Form.Text>
                                    </Form.Group>
                                }

                                <Form.Group as={Row} controlId="formTxtDescripcion">
                                    <Form.Label column sm="4">Descripción</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="descripcion"
                                            placeholder="Descripción del producto"
                                            value={producto.descripcion}
                                            onChange={e => handlerChangeValue(e)}
                                        />
                                    </Col>
                                    
                                </Form.Group>
                                {errors.descripcion &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.descripcion }</Form.Text>
                                    </Form.Group>
                                }

                                <Form.Group as={Row} controlId="formTxtPrecioVenta">
                                    <Form.Label column sm="4">Precio normal $</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="text"
                                            name="precio_venta_normal"
                                            placeholder="Precio venta normal"
                                            value={producto.precio_venta_normal}
                                            onChange={e => handlerChangeValue(e)}
                                        />
                                    </Col>
                                    
                                </Form.Group>
                                {errors.precio_venta_normal &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.precio_venta_normal }</Form.Text>
                                    </Form.Group>
                                }

                                <Form.Group as={Row} controlId="formTxtPrecioVenta">
                                    <Form.Label column sm="4">Precio actual $</Form.Label>
                                    <Col md="8">
                                        {producto.precio_actual}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formTxtPrecioVenta">
                                    <Form.Label column sm="4">Precio válido desde</Form.Label>
                                    <Col md="8">
                                        {producto.precio_fecha_desde ? formatDate(producto.precio_fecha_desde) : formatDate(producto.updated_at)}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formTxtPrecioVenta">
                                    <Form.Label column sm="4">Precio válido hasta</Form.Label>
                                    <Col md="8">
                                        {producto.precio_fecha_hasta ? formatDate(producto.precio_fecha_hasta) : 'Indefinido' }
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formTxtStock">
                                    <Form.Label column sm="4">Stock</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            type="number"
                                            name="stock"
                                            placeholder="Stock"
                                            value={producto.stock}
                                            onChange={e => handlerChangeValue(e)}
                                        />
                                    </Col>
                                </Form.Group>
                                {errors.stock &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.stock }</Form.Text>
                                    </Form.Group>
                                }
                                
                                <Form.Group as={Row} controlId="formTxtUnidad">
                                    <Form.Label column sm="4">Unidad</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            as="select"
                                            name="unidad_id"
                                            value={producto.unidad_id ? producto.unidad_id : ''}
                                            onChange={e => handlerChangeValue(e)}
                                        >
                                            {unidades.length === 0 && <option value="0">No se encontraron unidades</option>}
                                            {unidades.length > 0 && <option value="0">Seleccione</option>}
                                            {unidades.map((u, key) => {
                                                    return <option key={key} value={u.id}>{u.nombre}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                {errors.unidad_id &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.unidad_id }</Form.Text>
                                    </Form.Group>
                                }

                                <Form.Group as={Row} controlId="formTxtMarca">
                                    <Form.Label column sm="4">Marca</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            as="select"
                                            name="marca_id"
                                            value={producto.marca_id ? producto.marca_id : ''}
                                            onChange={e => handlerChangeValue(e)}
                                        >
                                            {marcas.length === 0 && <option value="0">No se encontraron marcas</option>}
                                            {marcas.length > 0 && <option value="0">Seleccione</option>}
                                            {marcas.map((m, key) =>{
                                                    return <option key={key} value={m.id}>{m.nombre}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                    
                                </Form.Group>
                                {errors.marca_id &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.marca_id }</Form.Text>
                                    </Form.Group>
                                }

                                <Form.Group as={Row} controlId="formTxtCategoria">
                                    <Form.Label column sm="4">Categoría</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            as="select"
                                            name="categoria_id"
                                            value={producto.categoria_id ? producto.categoria_id : ''}
                                            onChange={e => handlerChangeValue(e)}
                                        >
                                            {categorias.length === 0 && <option value="0">No se encontraron categorías</option>}
                                            {categorias.length > 0 && <option value="0">Seleccione</option>}
                                            {categorias.map((c, key) => {
                                                    return <option key={key} value={c.id}>{c.nombre}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                    
                                </Form.Group>
                                {errors.categoria_id &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.categoria_id }</Form.Text>
                                    </Form.Group>
                                }

                                <Form.Group as={Row} controlId="formTxtSubCategoria">
                                    <Form.Label column sm="4">Sub-categoría</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            as="select"
                                            name="sub_categoria_id"
                                            value={producto.sub_categoria_id ? producto.sub_categoria_id : ''}
                                            onChange={e => handlerChangeValue(e)}
                                        >
                                            {categorias.length > 0 && producto.categoria_id == 0 && <option value="0">Seleccione una categoría</option>}
                                            {subCategorias.length === 0 && producto.categoria_id > 0 && <option value="0">No se encontraron sub-categorías</option>}
                                            {subCategorias.length > 0 && <option value="0">Seleccione</option>}
                                            {subCategorias.map((s, key) => {
                                                    return <option key={key}value={s.id}>{s.nombre}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                    
                                </Form.Group>
                                {errors.sub_categoria_id &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.sub_categoria_id }</Form.Text>
                                    </Form.Group>
                                }

                                <Form.Group as={Row} controlId="formTxtCategoria">
                                    <Form.Label column sm="4">Impuestos</Form.Label>
                                    <Col md="8">
                                        <Form.Control
                                            as="select"
                                            multiple
                                            name="impuestos_id"
                                            value={producto.impuestos_id ? producto.impuestos_id : ''}
                                            onChange={e => handlerChangeValue(e)}
                                        >
                                            {impuestos.length === 0 && <option value="0">No se encontraron impuestos</option>}
                                            {impuestos.map((i, key) => {
                                                    return <option key={key} value={i.id}>{i.sigla} ({i.porcentaje}% {i.nombre})</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                    
                                </Form.Group>
                                {errors.impuestos_id &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error offset-2">{ errors.impuestos_id }</Form.Text>
                                    </Form.Group>
                                }
                            </div>
                            <div className="div-images-containner col-md-5" >
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
                                {producto.imagenes?.length > 0 && 
                                    <Container className="images-containner">
                                            <Row>
                                            {producto.imagenes.map((i, key) => {
                                                return  <Col xs={6} md={4} key={key} className="img-producto">
                                                            <Image 
                                                                src={ getImage(i)} 
                                                                ref={ref => imgRef.current.push(ref)} 
                                                                thumbnail 
                                                                alt={i.source_image} 
                                                                className={"image-producto " + (i.imagen_principal ? 'default-image' : '')}
                                                                onClick={() => changeImage(i.id)}
                                                                title="Cambiar imágen"
                                                            ></Image>
                                                            <Image 
                                                                src="/images/icons/check.png" 
                                                                className="check-button image-button" 
                                                                title="Seleccionar como imágen predeterminada" 
                                                                onClick={()=>selectDefaultImage(i.id)}
                                                            />
                                                            <Image 
                                                                src="/images/icons/delete.png" 
                                                                className="delete-button image-button" 
                                                                title="Eliminar imágen" 
                                                                onClick={() => removeImage(i.id) }
                                                            />
                                                        </Col>
                                                })
                                            }
                                            
                                            </Row>
                                    </Container>
                                }
                            </div>
                        </div>
                        <FormButtons 
                            className="group-buttons"
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