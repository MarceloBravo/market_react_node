import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPage, filter, deleteReg } from '../../../../actions/seccionesHome'
import { types as modalDialosTypes } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { SeccionesHomeForm } from './content'

export const SeccionesHomeGrid = () => {
    const currentUrl = window.location.pathname.split('/')[1]
    const [ idDelete, setIdDelete ] = useState(null)
    const pantalla = useSelector(state => state.PantallasReducer.pantalla)
    const dataGrid = useSelector(state => state.SeccionesHomeReducer.dataGrid)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(getPage(0))
    },[dataGrid.page, dispatch])


    const eliminarRegistro = (id) => {
        dispatch({type: modalDialosTypes.SHOW_MODAL_DIALOG, payload:{mensaje: '¿Desea eliminar el registro', titulo: 'Eliminar sección'}})
        setIdDelete(id)
    }


    const filtrar = (texto) => {
        if(texto.length > 0){
            dispatch(filter(texto, 0))
        }else{
            dispatch(getPage(0))
        }
    }


    const goToPage = (pag) => {
        dispatch(getPage(pag))
    }


    const response = (res) => {
        if(res){
            dispatch({types: spinnerTypes.SHOW_SPINNER})
            dispatch(deleteReg(idDelete))
        }
    }


    return (
        <SeccionesHomeForm 
            response={response} 
            dataGrid={dataGrid} 
            pantalla={pantalla} 
            currentUrl={currentUrl} 
            eliminarRegistro={eliminarRegistro} 
            filtrar={filtrar} 
            goToPage={goToPage}
        />
    )
}