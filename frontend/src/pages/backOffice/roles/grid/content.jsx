import React from 'react'
import { Header } from '../../../../components/backOffice/header'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Grid } from '../../../../components/backOffice/grid'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Paginacion } from '../../../../components/backOffice/paginacion'

export const RolesContent = (props) => {
    const { dataGrid, response, eliminarRegistro, filtrar, goToPage, togleMenu } = props

    return (
        <>
            <ModalDialog response={response}/>
            <div> 
                
                <Menu activeKeyMenu="15"/>
                <SpinnerComponent />
                <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                    <Header />
                    <div className="content-section">                    
                        <Alerta />
                        <Grid
                            data={dataGrid}
                            headers={['Nombre', 'Descripción', 'Fecha creación', 'Fecha actualización']}
                            visibleFields={['name', 'description', 'created_at', 'updated_at']}
                            actionColumn={true}
                            title={'Mantenedor de Roles'}
                            urlToForm={'roles'}
                            onClickDelete={e => eliminarRegistro(e)}
                            onChangeFilter={e => filtrar(e)}
                        />
                        <Paginacion data={dataGrid} goToPage={goToPage}/>
                    </div>
                </div>
            </div>
        </>
    )
}