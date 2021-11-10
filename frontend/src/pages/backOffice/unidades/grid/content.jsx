import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Grid } from '../../../../components/backOffice/grid'
import { Paginacion } from '../../../../components/backOffice/paginacion'

export const UnidadesGridContent = (props) => {
    const { response, dataGrid, currentUrl, eliminarRegistro, filtrar, goToPage, pantalla, togleMenu } = props

    return (
        <>
            <ModalDialog response={response}/>
            <div> 
                <Menu activeKeyMenu="19"/>
                <SpinnerComponent />
                <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                    <Header />
                    <div className="content-section">                    
                        <Alerta />
                        <Grid
                            data={dataGrid}
                            headers={['Nombre', 'Fecha creación', 'Fecha actualización']}
                            visibleFields={['nombre', 'created_at', 'updated_at']}
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
        </>
    )
}