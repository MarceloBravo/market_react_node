import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent }  from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { FormButtons } from '../../../../components/backOffice/form_buttons' 
import { Form, Row, Col, Button } from 'react-bootstrap'
import { Grid } from '../../../../components/backOffice/grid'

export const SeccionesHomeContent = (props) => {
    const { 
        response, 
        secciones, 
        handlerChangeValue, 
        errors, 
        busqueda, 
        cargarProductos, 
        selectProductoRef, 
        productosState, 
        eliminarProducto,
        arrProductos,
        agregarProducto,
        currentUrl,
        grabar,
        eliminar,
        cancelar,
        id
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
                    <Form>
                        <div className="div-title">Mantenedor de Secciones pág. Home</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre de la sección"
                                    value={secciones.nombre}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                        </Form.Group>

                        {errors.nombre &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.nombre}</Form.Text>
                            </Form.Group>
                        }
                        
                        <h3>Productos de la sección</h3>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Buscar Producto</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="busqueda"
                                    placeholder="Nombre, descripción o texto a Buscar"
                                    value={busqueda}
                                    onChange={e => cargarProductos(e)}
                                />                                
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Resultado búsqueda</Form.Label>
                            <Col md="4">
                                <Form.Control 
                                    ref={selectProductoRef}
                                    as="select"
                                    name="roles_id" 
                                    >
                                        {productosState.map((p, key)=> {
                                            return <option key={key} value={p.id}>{p.nombre}</option>
                                        })}
                                </Form.Control>
                            </Col>
                            <Col>
                                <Button variant="primary" disabled={productosState.length === 0} onClick={() => agregarProducto()}>Agregar</Button>
                            </Col>
                        </Form.Group>
                        
                        <Grid
                            data={arrProductos}
                            headers={['Nombre', 'Precio','Stock','Texto 1', 'Texto 2']}
                            visibleFields={['nombre', 'precio_venta_normal','stock','texto1', 'texto2']}
                            editableColumns={['texto1','texto2']}
                            actionColumn={true}
                            title={''}
                            urlToForm={currentUrl}
                            onClickDelete={e => eliminarProducto(e)}
                            showNewButton={false}
                            showFindTextBox={false}
                            showEditButton={false}
                            showDeleteButton={true}
                        />

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
        </>
    )
}