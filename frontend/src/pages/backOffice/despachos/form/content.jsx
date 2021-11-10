import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu }  from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Form, Row, Col } from 'react-bootstrap'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { Grid } from '../../../../components/backOffice/grid'
import './style.css'

export const DespachosFormComponent = (props) => {
    const { 
        response,
        ordenState, 
        regionState, 
        comunaState, 
        provinciaState, 
        formatearFechaHora, 
        dataGrid, 
        grabar, 
        eliminar, 
        handlerBtnCancelar, 
        id,
        togleMenu, 
    } = props

    return (
        <>
            <ModalDialog response={response} />
            <SpinnerComponent /> 
            <Menu activeKeyMenu="30"/>
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>                    
                <Header />                
                <div className="content-section">
                    <Alerta />
                    <Row>
                        <div className="div-title">Detalle del envío</div>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Dirección de despacho</Form.Label>
                            <Col md="4" className="no-padding">{ordenState.direccion}</Col>
                        </Form.Group>
                        <Row>
                            <Col md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">Región</Form.Label>
                                    <Col md="8" className="no-padding">{regionState.nombre}</Col>
                                </Form.Group>
                                
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">Comuna</Form.Label>
                                    <Col md="8" className="no-padding">{comunaState.nombre}</Col>
                                </Form.Group>
                                
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">Casa número</Form.Label>
                                    <Col md="8" className="no-padding">{ordenState.casa_num}</Col>
                                </Form.Group>
                                
                            </Col>

                            <Col md="6">
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">Provincia</Form.Label>
                                    <Col md="8">{provinciaState.nombre}</Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">Ciudad</Form.Label>
                                    <Col md="8">{ordenState.ciudad}</Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">Block número</Form.Label>
                                    <Col md="8">{ordenState.block_num}</Col>
                                </Form.Group>
                            </Col>
                            
                            <Row>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">Referencia</Form.Label>
                                    <Col md="4">{ordenState.referencia}</Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">Empresa currier</Form.Label>
                                    <Col md="4">{ordenState.compania_envio}</Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2">Fecha compra</Form.Label>
                                    <Col md="4">{ formatearFechaHora(ordenState.created_at)}</Col>
                                </Form.Group>
                            </Row>
                            
                        </Row>
                    </Row>
                    <Row className="grid-productos-despacho">
                        <Grid
                            data={dataGrid}
                            headers={['Producto','Descripción', 'Cantidad','Total']}
                            visibleFields={['nombre','descripcion', 'cantidad','str_total_producto']}
                            actionColumn={false}
                            title={'Productos'}
                            showFindTextBox={false}
                        />
                    </Row>
                    <Row>
                        <Col className="lbl-total-despacho">
                            <Form.Label>Total venta: {ordenState.str_total}</Form.Label>
                        </Col>
                    </Row>
                    <Row className="row-button">
                        <Col style={{span:4, offset: 6}}>
                            <FormButtons 
                                grabar={grabar} 
                                eliminar={eliminar} 
                                handlerBtnCancelar={handlerBtnCancelar} 
                                errors={{}} 
                                id={id}
                                textoGrabar={'Despachar pedido'}
                                textoEliminar={'Anular venta'}
                                ocultarBtnGrabar={ordenState.fecha_despacho}
                                ocultarBtnEliminar={ordenState.fecha_despacho}
                            />
                        </Col>
                    </Row>
                    
                </div>
            </div>
        </>
    )
}