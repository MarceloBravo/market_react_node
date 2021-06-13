import React from 'react'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Grid } from '../../../../components/backOffice/grid'
import { Paginacion } from '../../../../components/backOffice/paginacion'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'

export const ImpuestosContent = (props) => {
    const { response, listado, eliminarRegistro, fnFiltrar } = props

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
                        data={listado}
                        headers={['Nombre', 'Sigla', 'Porcentaje', 'Fecha creación', 'Fecha actualización']}
                        visibleFields={['nombre', 'sigla', 'porcentaje', 'created_at', 'updated_at']}
                        actionColumn={true}
                        title={'Mantenedor de Impuestos'}
                        urlToForm={'impuestos'}
                        onClickDelete={e => eliminarRegistro(e)}
                        onChangeFilter={e => fnFiltrar(e)}
                    />
                </div>
                <Paginacion />
            </div>
        </div>
    )
}