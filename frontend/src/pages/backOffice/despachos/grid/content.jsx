import React from 'react'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Grid } from '../../../../components/backOffice/grid'
import { Paginacion }  from '../../../../components/backOffice/paginacion'
import { Form, Row } from 'react-bootstrap'
import './style.css'

export const GridContent = (props) => {
    const { dataGrid, fnFiltrar, goToPage, togleMenu } = props

    return (
        <>
            <Menu activeKeyMenu="30"/>
            <SpinnerComponent />
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>                    
                <Header />
                <div className="content-section home-page-admin">                    
                    <Alerta />
                    <Grid
                        data={dataGrid}
                        headers={['Orden de compra','Fecha venta', 'Fecha despacho', 'Total Venta','Pedidos','Nombre cliente', 'Región', 'Provincia', 'Comuna', 'Ciudad', 'Dirección']}
                        visibleFields={['orden','created_at', 'fecha_despacho', 'total','productos','cliente', 'region', 'provincia', 'comuna', 'ciudad', 'direccion']}
                        actionColumn={true}
                        title={'Despachos'}
                        urlToForm={'detalle_despacho'}
                        onChangeFilter={e => fnFiltrar(e)}
                        editByColumn={'orden'}
                        showDeleteButton={false}
                    />
                    <Paginacion data={dataGrid} goToPage={goToPage}/>
                    {dataGrid.data?.length === 0 && 
                        <Row>
                            <Form.Label>Obs.: No se encontraron ventas</Form.Label>
                        </Row>
                    }
                </div>
            </div>
        </>
    )
}