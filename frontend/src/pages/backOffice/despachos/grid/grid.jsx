import React, { useState, useEffect } from 'react'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Grid } from '../../../../components/backOffice/grid'
import { Paginacion }  from '../../../../components/backOffice/paginacion'
import { useSelector, useDispatch } from 'react-redux'
import { getPage, filtrar } from '../../../../actions/despachos'
import { Form, Row } from 'react-bootstrap'
import './style.css'

export const DespachosGrid  = () => {
    const listaDespachosState = useSelector(state => state.DespachosReducer.list)
    const [ currentPage, setCurrentPage ] = useState(0)
    const [ dataGrid, setDataGrid ] = useState({data:[]})
    const [ textoFiltro, setTextoFiltro ] = useState('')
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getPage(0))
    },[dispatch])


    useEffect(()=>{
        if(textoFiltro){
            dispatch(filtrar(textoFiltro, currentPage))
        }else{
            dispatch(getPage(currentPage))
        }
    },[textoFiltro, currentPage, dispatch])


    useEffect(()=>{
        if(listaDespachosState){
            setDataGrid({...dataGrid, data:listaDespachosState.data})
        }
        // eslint-disable-next-line
    },[listaDespachosState])


    const fnFiltrar = (texto) => {
        setCurrentPage(0)
        setTextoFiltro(texto)
    }

    const goToPage = (e) => {
        setCurrentPage(e)
    }


    return(
        <>
            <Header />
            <SpinnerComponent />
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="30"/>
                </div>                
                <div className="content-section home-page">                    
                    <Alerta />
                    <Grid
                        data={dataGrid}
                        headers={['Orden de compra','Fecha venta', 'Fecha despacho', 'Total Venta','Pedidos','Nombre cliente', 'Región', 'Provincia', 'Comuna', 'Ciudad', 'Dirección']}
                        visibleFields={['orden','created_at', 'fecha_despacho', 'total','productos','cliente', 'region', 'provincia', 'comuna', 'ciudad', 'direccion']}
                        actionColumn={true}
                        title={'Despachos'}
                        urlToForm={'detalle_despacho'}
                        onChangeFilter={e => fnFiltrar(e)}
                        editByColumn={'orden'}
                        showDeleteButton={false}
                    />
                    <Paginacion data={dataGrid} goToPage={goToPage}/>
                    {dataGrid.data?.length === 0 && 
                        <Row>
                            <Form.Label>Obs.: No se encontraron ventas</Form.Label>
                        </Row>
                    }
                </div>
            </div>
        </>
    )
}