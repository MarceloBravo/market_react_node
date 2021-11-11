import React from 'react'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Grid } from '../../../../components/backOffice/grid'
import { Paginacion } from '../../../../components/backOffice/paginacion'

export const ClientesGridContent = (props) => {
    const { 
        response,
        togleMenu, 
        dataGrid, 
        eliminarRegistro, 
        fnFiltrar, 
        goToPage
    } = props

    return (
        <div> 
            <Menu activeKeyMenu="19"/>
            <SpinnerComponent />
            <ModalDialog response={response}/>
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                <Header />
                <div className="content-section">                    
                    <Alerta />
                    <Grid
                        data={dataGrid}
                        headers={['Nombre', 'Apellido 1', 'Apellido 2', 'Dirección', 'Ciudad', 'Fecha creación', 'Fecha actualización']}
                        visibleFields={['nombres', 'apellido1', 'apellido2', 'direccion', 'ciudad', 'created_at', 'updated_at']}
                        actionColumn={true}
                        title={'Mantenedor de Clientes'}
                        urlToForm={'clientes'}
                        onClickDelete={e => eliminarRegistro(e)}
                        onChangeFilter={e => fnFiltrar(e)}
                    />
                    <Paginacion data={dataGrid} goToPage={goToPage}/>
                </div>
            </div>
        </div>
    )
}