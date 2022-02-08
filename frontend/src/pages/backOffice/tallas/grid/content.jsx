import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Menu } from '../../../../components/backOffice/menu'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Header } from '../../../../components/backOffice/header'
import { Alerta } from '../../../../components/shared/alerts'
import { Grid } from '../../../../components/backOffice/grid'
import { Paginacion } from '../../../../components/backOffice/paginacion'

export const TallasGridContent = (props) => {
    const {
        response,
        togleMenu,
        dataGrid, 
        pantalla, 
        eliminarRegistro, 
        filtrar, 
        goToPage
    } = props

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
                            headers={['Talla', 'Fecha creación', 'Fecha actualización']}
                            visibleFields={['talla', 'created_at', 'updated_at']}
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