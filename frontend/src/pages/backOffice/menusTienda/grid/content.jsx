import React from 'react'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Alerta } from '../../../../components/shared/alerts'
import { Menu } from '../../../../components/backOffice/menu'
import { Grid } from '../../../../components/backOffice/grid'
import { Paginacion } from '../../../../components/backOffice/paginacion'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'

export const MenusTiendaGridContent = (props) => {
    const { response, listadoState, eliminarRegistro, filtrar, goToPage, togleMenu } = props

    return (
        <div> 
            <SpinnerComponent />
            <Menu activeKeyMenu="30"/>
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                <Header />
                <div className="content-section">                    
                    <Alerta />
                    <ModalDialog response={response}/>
                    <Grid
                        data={listadoState}
                        headers={['Nombre', 'Url', 'Menú padre', 'Posición', 'Fecha creación', 'Fecha actualización']}
                        visibleFields={['nombre', 'url', 'menu_padre', 'posicion', 'created_at', 'updated_at']}
                        actionColumn={true}
                        title={'Mantenedor de menús de la tienda'}
                        urlToForm={'menus_tienda'}
                        onClickDelete={e => eliminarRegistro(e)}
                        onChangeFilter={e => filtrar(e)}
                    />
                    <Paginacion data={listadoState} goToPage={goToPage}/>
                </div>
            </div>
        </div>
    )
}