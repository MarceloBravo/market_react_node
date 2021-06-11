import React from 'react'
import { Header } from '../../../../components/backOffice/header'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Grid } from '../../../../components/backOffice/grid'
import { Paginacion } from '../../../../components/backOffice/paginacion'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { SpinnerComponent } from '../../../../components/shared/spinner'

export const RolesContent = (props) => {
    const { listado, response, eliminarRegistro, filtrar } = props

    return (
        <>
            <ModalDialog response={response}/>
            <div> 
                <Header />
                <SpinnerComponent />
                <div className="main-section">
                    <div className="menu-section">
                        <Menu activeKeyMenu="1"/>
                    </div>                
                    <div className="content-section">                    
                        <Alerta />
                        <Grid
                            data={listado}
                            headers={['Nombre', 'Descripción', 'Fecha creación', 'Fecha actualización']}
                            visibleFields={['name', 'description', 'created_at', 'updated_at']}
                            actionColumn={true}
                            title={'Mantenedor de Roles'}
                            urlToForm={'roles'}
                            onClickDelete={e => eliminarRegistro(e)}
                            onChangeFilter={e => filtrar(e)}
                        />
                    </div>
                    <Paginacion />
                </div>
            </div>
        </>
    )
}