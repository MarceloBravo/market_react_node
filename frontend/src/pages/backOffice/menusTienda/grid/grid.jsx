import React, { useEffect, useState } from 'react'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Alerta } from '../../../../components/shared/alerts'
import { Menu } from '../../../../components/backOffice/menu'
import { Grid } from '../../../../components/backOffice/grid'
import { Paginacion } from '../../../../components/backOffice/paginacion'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { useSelector, useDispatch } from 'react-redux'
import { getPage, filter, deleteRec } from '../../../../actions/menusTienda'
import { types as modalTypes } from '../../../../redux/ModalDialog/types'


export const MenusTiendaGrid = () => {
    const [ idEliminar, setIdEliminar ] = useState(null)
    const [ textoFiltro, setTextoFiltro ] = useState('')
    const listadoState = useSelector(state => state.MenusTiendaReducer.dataGrid)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getPage(0))
    },[dispatch])


    const eliminarRegistro = (e) => {
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', titulo: 'Eliminar Menú'}})
        setIdEliminar(e)
    }


    const response = (resp) => {
        if(resp && idEliminar){
            dispatch(deleteRec(idEliminar))
        }else{
            setIdEliminar(null)
        }
    }


    const filtrar = (texto) => {
        if(texto.length > 0){
            setTextoFiltro(texto)
            dispatch(filter(texto, 0))
        }else{
            setTextoFiltro('')
            dispatch(getPage(0))
        }
    }

    const goToPage = (pag) => {
        if(textoFiltro.length > 0){
            dispatch(filter(textoFiltro, pag))
        }else{
            dispatch(getPage(pag))
        }
    }
    

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