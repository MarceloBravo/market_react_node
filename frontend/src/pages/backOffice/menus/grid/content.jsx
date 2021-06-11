import React from 'react'
import { Header } from '../../../../components/backOffice/header'
import { Menu } from '../../../../components/backOffice/menu'
import { Grid } from '../../../../components/backOffice/grid'
import { Paginacion } from '../../../../components/backOffice/paginacion'
import { Alerta } from '../../../../components/shared/alerts'
import { SpinnerComponent } from '../../../../components/shared/spinner'

export const GridMenus = (props) => {
    const { listado, eliminarRegistro, filtrar } = props

    return (
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
                        headers={['Nombre', 'Url', 'Menú padre', 'Posición', 'Fecha creación', 'Fecha actualización']}
                        visibleFields={['nombre', 'url', 'menu_padre', 'posicion', 'created_at', 'updated_at']}
                        actionColumn={true}
                        title={'Mantenedor de menús'}
                        urlToForm={'menus'}
                        onClickDelete={e => eliminarRegistro(e)}
                        onChangeFilter={e => filtrar(e)}
                    />
                </div>
                <Paginacion />
            </div>
        </div>
    )
}