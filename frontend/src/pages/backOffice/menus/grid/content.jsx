import React from 'react'
import { Header } from '../../../../components/backOffice/header'
import { Menu } from '../../../../components/backOffice/menu'
import { Grid } from '../../../../components/backOffice/grid'
import { Alerta } from '../../../../components/shared/alerts'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Paginacion } from '../../../../components/backOffice/paginacion'

export const GridMenus = (props) => {
    const { listado, eliminarRegistro, filtrar, goToPage, togleMenu } = props

    return (
        <div> 
            <Menu activeKeyMenu="15"/>
            <SpinnerComponent />
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                <Header />            
                <div className="content-section">                    
                    <Alerta />
                    <Grid
                        data={listado}
                        headers={['Nombre', 'Url', 'Menú padre', 'Posición', 'Fecha creación', 'Fecha actualización']}
                        visibleFields={['nombre', 'url', 'menu_padre', 'posicion', 'created_at', 'updated_at']}
                        actionColumn={true}
                        title={'Mantenedor de menús'}
                        urlToForm={'menus'}
                        onClickDelete={e => eliminarRegistro(e)}
                        onChangeFilter={e => filtrar(e)}
                    />
                    <Paginacion data={listado} goToPage={goToPage}/>
                </div>
            </div>
        </div>
    )
}