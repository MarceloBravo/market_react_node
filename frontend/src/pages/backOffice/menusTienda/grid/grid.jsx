import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPage, filter, deleteRec } from '../../../../actions/menusTienda'
import { types as modalTypes } from '../../../../redux/ModalDialog/types'
import { MenusTiendaGridContent } from './content'


export const MenusTiendaGrid = () => {
    const [ idEliminar, setIdEliminar ] = useState(null)
    const [ textoFiltro, setTextoFiltro ] = useState('')
    const listadoState = useSelector(state => state.MenusTiendaReducer.dataGrid)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
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
        <MenusTiendaGridContent
            response={response} 
            listadoState={listadoState} 
            eliminarRegistro={eliminarRegistro} 
            filtrar={filtrar} 
            goToPage={goToPage}
            togleMenu={togleMenu}
        />       
    )
}