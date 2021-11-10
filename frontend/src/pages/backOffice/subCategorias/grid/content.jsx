import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Paginacion } from '../../../../components/backOffice/paginacion'
import { Grid } from '../../../../components/backOffice/grid'

export const SubCategoriasGridContent = (props) => {
    const { dataGrid, pantalla, response, goToPage, eliminarRegistro, filtrar, togleMenu } = props

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
                            headers={['Nombre', 'Categoría', 'Fecha creación', 'Fecha actualización']}
                            visibleFields={['nombre', 'categoria', 'created_at', 'updated_at']}
                            actionColumn={true}
                            title={'Mantenedor de ' + pantalla.nombre}
                            urlToForm={window.location.pathname.split('/')[1]}
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