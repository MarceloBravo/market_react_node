import React from 'react'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Grid } from '../../../../components/backOffice/grid'
import { Paginacion } from '../../../../components/backOffice/paginacion'

export const MarcasGridContent = (props) => {
    const { response, dataGrid, pantalla, eliminarRegistro, filtrar, goToPage, currentPath } = props

    return (
        <div> 
            <Header />
            <SpinnerComponent />
            <ModalDialog response={response}/>
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="1"/>
                </div>                
                <div className="content-section">                    
                    <Alerta />
                    <Grid
                        data={dataGrid}
                        headers={['Nombre', 'Fecha creación', 'Fecha actualización']}
                        visibleFields={['nombre', 'created_at', 'updated_at']}
                        actionColumn={true}
                        title={'Mantenedor de '+pantalla.nombre}
                        urlToForm={currentPath}
                        onClickDelete={e => eliminarRegistro(e)}
                        onChangeFilter={e => filtrar(e)}
                    />
                </div>
                <Paginacion data={dataGrid} goToPage={goToPage}/>
            </div>
        </div>
    )
}