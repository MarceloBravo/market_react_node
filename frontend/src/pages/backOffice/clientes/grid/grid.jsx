import React, { useState, useEffect } from 'react'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Menu } from '../../../../components/backOffice/menu'
import { Alerta } from '../../../../components/shared/alerts'
import { Grid } from '../../../../components/backOffice/grid'
import { Paginacion } from '../../../../components/backOffice/paginacion'
import { useSelector, useDispatch } from 'react-redux'
import { getPage, filter, deleteReg } from '../../../../actions/clientes'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { types as  modalTypes } from '../../../../redux/ModalDialog/types'

export const GridMntClientes = () => {
    const [ idDelete, setIdDelete ] = useState(null)
    const [ textoFiltro, setTextoFiltro ] = useState('')
    const dataGrid = useSelector(state => state.ClientesReducer.dataGrid)
    const resultadoOperacionState = useSelector(state => state.AlertaReducer.tipo)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(getPage(0))
    },[dispatch])


    const response = (res) => {
        if(res && idDelete){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(deleteReg(idDelete))
            setIdDelete(null)
        }
    }


    useEffect(()=>{
        if(resultadoOperacionState === 'success'){
            fnFiltrar(textoFiltro)
        }
    // eslint-disable-next-line
    },[resultadoOperacionState])


    const eliminarRegistro = (id) => {
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', titulo:'Eliminar cliente'}})
        setIdDelete(id)
    }


    const fnFiltrar = (texto) => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        setTextoFiltro(texto)
        if(texto && texto.length > 0){
            dispatch(filter(texto, 0))
        }else{
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
            <Menu activeKeyMenu="19"/>
            <SpinnerComponent />
            <ModalDialog response={response}/>
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                <Header />
                <div className="content-section">                    
                    <Alerta />
                    <Grid
                        data={dataGrid}
                        headers={['Nombre', 'Apellido 1', 'Apellido 2', 'Dirección', 'Ciudad', 'Fecha creación', 'Fecha actualización']}
                        visibleFields={['nombres', 'apellido1', 'apellido2', 'direccion', 'ciudad', 'created_at', 'updated_at']}
                        actionColumn={true}
                        title={'Mantenedor de Clientes'}
                        urlToForm={'clientes'}
                        onClickDelete={e => eliminarRegistro(e)}
                        onChangeFilter={e => fnFiltrar(e)}
                    />
                    <Paginacion data={dataGrid} goToPage={goToPage}/>
                </div>
            </div>
        </div>
    )
}