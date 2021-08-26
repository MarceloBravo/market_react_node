import React, { useState, useEffect } from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu }  from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Form, Row, Col } from 'react-bootstrap'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { findByBuyOrden }  from '../../../../actions/ordenesCompra'
import { formatearFechaHora } from '../../../../shared/funciones'
import { buscar as buscarRegion } from '../../../../actions/regiones'
import { buscar as buscarProvincia} from '../../../../actions/provincias'
import { buscar as buscarComuna} from '../../../../actions/comunas'
import { Grid } from '../../../../components/backOffice/grid'
import { anularVenta } from '../../../../actions/ventas'
import { cambiarEstado } from '../../../../actions/despachos'
import { types as modalTypes } from '../../../../redux/ModalDialog/types'
import { types as alertasTypes } from '../../../../redux/Alert/types'
import './style.css'

export const DespachosForm = () => {
    const id = useParams('id')
    const ordenState = useSelector(state => state.OrdenesCompraReducer.orden)
    const regionState = useSelector(state => state.RegionesReducer.ciudad)
    const provinciaState = useSelector(state => state.ProvinciasReducer.provincia)
    const comunaState = useSelector(state => state.ComunasReducer.comuna)
    const tipoAlertaState = useSelector(state => state.AlertaReducer.tipo)
    const [ dataGrid, setDataGrid ] = useState({data:[]})
    const [ accion, setAccion ] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()

    
    useEffect(()=>{
        if(id?.id){
            dispatch(findByBuyOrden(id.id))
        }
    },[dispatch, id])


    useEffect(()=>{
        //console.log('ordenState',ordenState)
        if(ordenState.region && ordenState.provincia && ordenState.comuna){
            dispatch(buscarRegion(ordenState.region))
            dispatch(buscarProvincia(ordenState.provincia))
            dispatch(buscarComuna(ordenState.comuna))
        }
        setDataGrid({...dataGrid, data:ordenState.productos})
        // eslint-disable-next-line
    },[ordenState])


    useEffect(()=>{
        if(tipoAlertaState === 'success'){
            history.push('/detalle_despacho')
        }
        // eslint-disable-next-line
    },[tipoAlertaState])


    const response = (resp) => {
        if(resp){
            if(accion === 'despachar'){
                dispatch(cambiarEstado(ordenState.id, 1))
            }else if(accion === 'anular'){
                dispatch(anularVenta(ordenState.venta_id))
            }
        }
    }


    const grabar = () => {
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea despachar la venta?', titulo: 'Despachar Venta'}})
        setAccion('despachar')
    }


    const handlerBtnCancelar = () => {
        dispatch({type: alertasTypes.OCULTAR_ALERTA})
        history.push('/detalle_despacho')
    }


    const eliminar = (e) => {
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea anular la venta?', titulo: 'Anular Venta'}})
        setAccion('anular')
    }

    
    return (
        <>
            <ModalDialog response={response} />
            <Header />      
            <SpinnerComponent /> 
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="30"/>
                </div>
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