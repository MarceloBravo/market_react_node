import React from 'react';
import { Header } from '../../../../components/backOffice/header';
import { Menu } from '../../../../components/backOffice/menu';
import { Alerta } from '../../../../components/shared/alerts';
import { Grid } from '../../../../components/backOffice/grid';
import { Paginacion } from '../../../../components/backOffice/paginacion';
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { useSelector } from 'react-redux';

export const GridPantallas = (props) => {
    const { eliminarRegistro, filtrar } = props;
    const listado = useSelector(state => state.GridReducer.data);

    
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
                        headers={['Nombre', 'Menú', 'Fecha creación', 'Fecha actualización']}
                        visibleFields={['nombre', 'menu', 'created_at', 'updated_at']}
                        actionColumn={true}
                        title={'Mantenedor de pantallas'}
                        urlToForm={'pantallas'}
                        onClickDelete={e => eliminarRegistro(e)}
                        onChangeFilter={e => filtrar(e)}
                        
                    />
                </div>
                <Paginacion />
            </div>
        </div>
    );
}
