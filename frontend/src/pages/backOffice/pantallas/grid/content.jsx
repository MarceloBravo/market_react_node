import React from 'react';
import { Header } from '../../../../components/backOffice/header';
import { Menu } from '../../../../components/backOffice/menu';
import { Alerta } from '../../../../components/shared/alerts';
import { Grid } from '../../../../components/backOffice/grid';
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { useSelector } from 'react-redux';
import { Paginacion } from '../../../../components/backOffice/paginacion'
import './style.css'

export const GridPantallas = (props) => {
    const { eliminarRegistro, filtrar, goToPage, togleMenu } = props;
    const dataGrid = useSelector(state => state.PantallasReducer.dataGrid)

    
    return (
        <div> 
            <Menu activeKeyMenu="15"/>
            <SpinnerComponent />
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                <Header />            
                <div className="content-section">                    
                    <Alerta />
                    <Grid
                        data={dataGrid}
                        headers={['Nombre', 'Menú', 'Fecha creación', 'Fecha actualización']}
                        visibleFields={['nombre', 'menu', 'created_at', 'updated_at']}
                        actionColumn={true}
                        title={'Mantenedor de pantallas'}
                        urlToForm={'pantallas'}
                        onClickDelete={e => eliminarRegistro(e)}
                        onChangeFilter={e => filtrar(e)}
                        
                    />
                    <Paginacion data={dataGrid} goToPage={goToPage}/>
                </div>
            </div>
        </div>
    );
}
