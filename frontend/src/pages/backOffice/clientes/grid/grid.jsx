import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPage, filter, deleteReg } from '../../../../actions/clientes'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { types as  modalTypes } from '../../../../redux/ModalDialog/types'
import { ClientesGridContent } from './content'

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
        <ClientesGridContent 
            response={response} 
            togleMenu={togleMenu} 
            dataGrid={dataGrid}  
            eliminarRegistro={eliminarRegistro} 
            fnFiltrar={fnFiltrar} 
            goToPage={goToPage}
        />
    )
}