import React from 'react'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Grid } from '../../../../components/backOffice/grid'
import { Paginacion } from '../../../../components/backOffice/paginacion'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'

export const ContentCategoriasGrid = (props) => {
    const { response, dataGrid, eliminarRegistro, filtrar, goToPage, togleMenu } = props

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
                        headers={['Nombre', 'Fecha creación', 'Fecha actualización']}
                        visibleFields={['nombre', 'created_at', 'updated_at']}
                        actionColumn={true}
                        title={'Mantenedor de Categorías'}
                        urlToForm={'categorias'}
                        onClickDelete={e => eliminarRegistro(e)}
                        onChangeFilter={e => filtrar(e)}
                    />
                </div>
                <Paginacion data={dataGrid} goToPage={goToPage}/>
            </div>
        </div>
    )
}