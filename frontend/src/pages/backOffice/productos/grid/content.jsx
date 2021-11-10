import React from 'react'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import  { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Paginacion } from '../../../../components/backOffice/paginacion'
import { Grid } from '../../../../components/backOffice/grid'
import './style.css'

export const ProductosFormContent = (props) => {
    const { response, dataGrid, pantalla, currentUrl, eliminarRegistro, filtrar, goToPage, togleMenu } = props

    return (
        <div>
            <Menu activeKeyMenu="19"/>
            <SpinnerComponent />
            <ModalDialog response={response}/>
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                <Header />
                <div className="content-section tabla-productos">                    
                    <Alerta />
                    <Grid
                        data={dataGrid}
                        headers={['Nombre', 'Marca', 'Precio','Stock','Categoría','Fecha creación', 'Fecha actualización']}
                        visibleFields={['nombre', 'marca','precio_venta_normal','stock','categoria','created_at', 'updated_at']}
                        actionColumn={true}
                        title={'Mantenedor de '+pantalla.nombre}
                        urlToForm={currentUrl}
                        onClickDelete={e => eliminarRegistro(e)}
                        onChangeFilter={e => filtrar(e)}
                    />
                    <Paginacion data={dataGrid} goToPage={goToPage}/>
                </div>
            </div>
        </div>
    )
}