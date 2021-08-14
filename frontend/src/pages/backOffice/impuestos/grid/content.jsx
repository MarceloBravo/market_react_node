import React from 'react'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Grid } from '../../../../components/backOffice/grid'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Paginacion } from '../../../../components/backOffice/paginacion'

export const ImpuestosContent = (props) => {
    const { response, dataGrid, eliminarRegistro, fnFiltrar, goToPage } = props

    return (
        <div> 
            <Header />
            <SpinnerComponent />
            <ModalDialog response={response}/>
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="19"/>
                </div>                
                <div className="content-section">                    
                    <Alerta />
                    <Grid
                        data={dataGrid}
                        headers={['Nombre', 'Sigla', 'Porcentaje', 'Fecha creación', 'Fecha actualización']}
                        visibleFields={['nombre', 'sigla', 'porcentaje', 'created_at', 'updated_at']}
                        actionColumn={true}
                        title={'Mantenedor de Impuestos'}
                        urlToForm={'impuestos'}
                        onClickDelete={e => eliminarRegistro(e)}
                        onChangeFilter={e => fnFiltrar(e)}
                    />
                    <Paginacion data={dataGrid} goToPage={goToPage}/>
                </div>
            </div>
        </div>
    )
}