import React from 'react'
import { Grid } from '../../../components/backOffice/grid'
import { ModalDialog } from '../../../components/backOffice/modalDialog'
import { Header } from '../../../components/backOffice/header'
import { SpinnerComponent } from '../../../components/shared/spinner'
import { Menu } from '../../../components/backOffice/menu'
import { Alerta } from '../../../components/shared/alerts'
import { Paginacion } from '../../../components/backOffice/paginacion'
import { Button } from 'react-bootstrap'
import './style.css'

export const PreciosContent = (props) => {
    const { 
        response, 
        editing, 
        grabar, 
        cancelar, 
        dataGrid, 
        eliminarRegistro, 
        filtrar, 
        handlerColum, 
        deleteCondition, 
        onChangeColumn, 
        onDoubleClickColumn, 
        filasRef,
        goToPage,
        togleMenu, 
    } = props

    return (
        <>
            <Menu activeKeyMenu="19"/>
            <SpinnerComponent />
            <ModalDialog response={response}/>
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                <Header />
                <div className="content-section home-page">                    
                    <Alerta />
                    <div className="div-button-group">
                        <Button variant="success" disabled={!editing} onClick={grabar}>Grabar</Button>
                        <Button variant="danger" disabled={!editing} onClick={cancelar}>Cancelar</Button>
                    </div>
                    <Grid
                        data={dataGrid}
                        headers={['Nombre', 'Precio venta normal', 'Precio', '% descuento', '% descuento máximo', 'Unidad', 'Marca', 'Categoría', 'Sub-Categoría', 'Fecha desde', 'Fecha hasta', 'Fecha creación', 'Fecha actualización']}
                        visibleFields={['nombre', 'str_precio_venta_normal', 'precio', 'descuento', 'descuento_maximo', 'unidad', 'marca', 'categoria', 'sub_categoria', 'fecha_desde', 'fecha_hasta', 'created_at', 'updated_at']}
                        editableColumns={['precio', 'descuento', 'fecha_desde', 'fecha_hasta']}
                        numericColumns={['precio', 'descuento']}
                        dateColumns={['fecha_desde','fecha_hasta']}
                        actionColumn={true}
                        title={'Mantenedor de Precios'}
                        urlToForm={'precios'}
                        onClickDelete={e => eliminarRegistro(e)}
                        onChangeFilter={e => filtrar(e)}
                        changeGridColumn={(a, b, c) => handlerColum(a, b, c)}
                        showNewButton={false}
                        deleteCondition={f => deleteCondition(f)}
                        onChangeColumn={(fila, id, field, value) => onChangeColumn(fila, id, field, value)}
                        onDoubleClickColumn={(fila, id, field) => onDoubleClickColumn(fila, id, field)}
                        disabledTextControl={editing}
                        arrRowRef={filasRef}
                    />
                    <Paginacion disabled={editing} data={dataGrid} goToPage={goToPage}/>
                </div>
            </div>
        </>
    )
}