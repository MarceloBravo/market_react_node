import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Grid } from '../../../../components/backOffice/grid'
import { Paginacion } from '../../../../components/backOffice/paginacion'
import { SpinnerComponent } from '../../../../components/shared/spinner'

export const ContentGridUsuarios = (props) => {
    const { response, listado, eliminarRegistro, filtrar } = props

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
                            headers={['Nombre', 'Apellido 1', 'Apellido 2', 'Fecha creación', 'Fecha actualización']}
                            visibleFields={['name', 'a_paterno', 'a_materno', 'created_at', 'updated_at']}
                            actionColumn={true}
                            title={'Mantenedor de Usuarios'}
                            urlToForm={'usuarios'}
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