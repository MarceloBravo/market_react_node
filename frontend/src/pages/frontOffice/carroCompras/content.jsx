import React from 'react'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { Container, Row, Col } from 'react-bootstrap'
import { Grid } from '../../../components/backOffice/grid'
import { ModalDialog } from '../../../components/backOffice/modalDialog'
import { ResumenVentaComponent } from '../../../components/frontOffice/resumenVenta/resumenVenta'

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
                <Row>
                    <Col md="8">
                        <Grid
                            data={dataGrid}
                            headers={['Foto','Nombre', 'Precio Neto', 'Cantidad']}
                            visibleFields={['imagen','nombre', 'str_precio', 'cantidad']}
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
                <Row className="row-bottom">

                </Row>
            </Container>
            <FooterComponent/> 
        </>
    )
}