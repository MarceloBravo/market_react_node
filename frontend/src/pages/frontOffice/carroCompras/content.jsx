import React from 'react'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Grid } from '../../../components/backOffice/grid'
import { ModalDialog } from '../../../components/backOffice/modalDialog'
import { ResumenVentaComponent } from '../../../components/frontOffice/resumenVenta/resumenVenta'
import { PageMessageComponent } from '../../../components/frontOffice/pageMessage/pageMessage'

export const CarroComprasContent = (props) => {
    const { 
        response, 
        dataGrid, 
        eliminarRegistro, 
        changeGridColumn, 
        totalNeto, 
        subTotal, 
        impuestos, 
        volver, 
        continuarCompra
    } = props

    return (
        <>
            <ModalDialog response={response}/>
            <HeaderMarketComponent/>
            <Container>
                <Row>
                    <Col><h4>Carro de compras</h4></Col>
                </Row>
                {dataGrid.data.length > 0 && 
                    <Row>
                        <Col md="8">
                            <Grid
                                data={dataGrid}
                                headers={['Foto','Nombre', 'Precio', 'Cantidad']}
                                visibleFields={['imagen','nombre', 'precio_venta', 'cantidad']}
                                editableColumns={['cantidad']}
                                numericColumns={['cantidad']}
                                imageColumns={['imagen']}
                                actionColumn={true}
                                title={''}
                                urlToForm={''}
                                onClickDelete={eliminarRegistro}
                                showFindTextBox={false}
                                showDeleteButton={true}
                                changeGridColumn={changeGridColumn}
                                checkPermisos={false}
                            />
                            <Row>
                                Los precios de los productos de la lista ya incluyen los
                                impuestos correspondientes, la suma de sus precios corresponde 
                                al Sub-total de recuadro de la derecha
                            </Row>
                        </Col>
                        <Col md="4">
                            <ResumenVentaComponent 
                                totalNeto={totalNeto} 
                                subTotal={subTotal}
                                impuestos={impuestos}
                                volver={volver}
                                continuarCompra={continuarCompra}
                            />
                        </Col>
                    </Row>
                }

                {dataGrid.data.length === 0 && 
                    <>
                        <PageMessageComponent 
                            classname="message-container"
                            mensaje={'Tú carrito de compras está vacio'}
                        />
                        <Row className="button-containner">
                            <Button variant="primary" onClick={()=>volver()}>Regresar</Button>
                        </Row>
                    </>
                }

                <Row className="row-bottom">
                
                </Row>
            </Container>
            <FooterComponent/> 
        </>
    )
}