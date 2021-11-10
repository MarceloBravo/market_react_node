import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Grid } from '../../../../components/backOffice/grid'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Paginacion } from '../../../../components/backOffice/paginacion'

export const ContentGridUsuarios = (props) => {
    const { response, dataGrid, eliminarRegistro, filtrar, goToPage, togleMenu } = props

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
                            headers={['Nombre', 'Apellido 1', 'Apellido 2', 'Fecha creación', 'Fecha actualización']}
                            visibleFields={['name', 'a_paterno', 'a_materno', 'created_at', 'updated_at']}
                            actionColumn={true}
                            title={'Mantenedor de Usuarios'}
                            urlToForm={'usuarios'}
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