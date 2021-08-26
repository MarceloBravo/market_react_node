import React, { useState, useEffect } from 'react'
import { Header } from '../../../components/backOffice/header'
import { SpinnerComponent } from '../../../components/shared/spinner'
import { Menu } from '../../../components/backOffice/menu'
import { Alerta } from '../../../components/shared/alerts'
import { Grid } from '../../../components/backOffice/grid'
import { Paginacion }  from '../../../components/backOffice/paginacion'
import { useSelector, useDispatch } from 'react-redux'
import { getPage, filtrar } from '../../../actions/despachos'
import { Row } from 'react-bootstrap'
import { types as alertasTypes } from '../../../redux/Alert/types'
import './style.css'
import { Form } from 'react-bootstrap'

export const Home  = () => {
    const listaDespachosState = useSelector(state => state.DespachosReducer.list)
    const [ currentPage, setCurrentPage ] = useState(0)
    const [ dataGrid, setDataGrid ] = useState({data:[]})
    const [ textoFiltro, setTextoFiltro ] = useState('')
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch({type: alertasTypes.OCULTAR_ALERTA})
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
            console.log('listaDespachosState.data',listaDespachosState.data)
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
                    <Menu activeKeyMenu="0"/>
                </div>                
                <div className="content-section home-page">                    
                    <Alerta />
                    <Grid
                        data={dataGrid}
                        headers={['Orden de compra','Fecha venta', 'Fecha despacho', 'Total Venta','Pedidos','Nombre cliente', 'Región', 'Provincia', 'Comuna', 'Ciudad', 'Dirección']}
                        visibleFields={['orden','created_at', 'fecha_despacho', 'total','productos','cliente', 'region', 'provincia', 'comuna', 'ciudad', 'direccion']}
                        actionColumn={true}
                        title={'Despachos'}
                        onChangeFilter={e => fnFiltrar(e)}
                    />
                    <Paginacion data={dataGrid} goToPage={goToPage}/>
                    <Row>
                        <Form.Label>Obs.: {dataGrid.data.length > 0 ? 'Se muestran sólo las ventas de los últimos 30 días.' : 'Sin ventas el último mes.'}</Form.Label>
                    </Row>
                </div>
            </div>
        </>
    )
}