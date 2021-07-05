import React from 'react'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import  { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Paginacion } from '../../../../components/backOffice/paginacion'
import { Grid } from '../../../../components/backOffice/grid'

export const ProductosFormContent = (props) => {
    const { response, dataGrid, pantalla, currentUrl, eliminarRegistro, filtrar, goToPage } = props

    return (
        <div> 
            <Header />
            <SpinnerComponent />
            <ModalDialog response={response}/>
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="0"/>
                </div>                
                <div className="content-section">                    
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
                </div>
                <Paginacion data={dataGrid} goToPage={goToPage}/>
            </div>
        </div>
    )
}