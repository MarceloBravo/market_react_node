import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPage, filter, deleteReg } from '../../../../actions/marcas'
import { findByUrl } from '../../../../actions/pantallas'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { types as modalDialogTypes } from '../../../../redux/ModalDialog/types'
import { MarcasGridContent } from './content'

export const MarcasGridReducer = () => {
    const currentPath = window.location.pathname.split('/')[1]
    const [ currentPage, setCurrentPage ] = useState(0)
    const dataGrid = useSelector(state => state.MarcasReducer.dataGrid)
    const tipoAlerta = useSelector(state => state.AlertaReducer.tipo)    
    const pantalla = useSelector(state => state.PantallasReducer.pantalla) 
    const togleMenu = useSelector(state => state.MenusReducer.togle)   
    const dispatch = useDispatch()
    

    useEffect(()=>{
        dispatch(findByUrl(currentPath))
    },[currentPath, dispatch])


    useEffect(()=> {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(getPage(0))
    },[dispatch])


    useEffect(()=> {
        if(tipoAlerta === 'success'){
            dispatch(getPage(currentPage))
        }
    },[tipoAlerta, currentPage, dispatch])


    const response = (e) => {
        dispatch({type: modalDialogTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', titulo: 'Eliminar'}})
    }


    const eliminarRegistro = (e) => {
        if(e){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(deleteReg(e))
        }
    }


    const filtrar = (texto) => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        setCurrentPage(0)
        if(texto){
            dispatch(filter(0))
        }else{
            dispatch(getPage(0))
        }
    }


    const goToPage = (e) => {
        setCurrentPage(e)
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(getPage(e))
    }


    return (
        <MarcasGridContent 
            response={response} 
            dataGrid={dataGrid} 
            pantalla={pantalla} 
            eliminarRegistro={eliminarRegistro} 
            filtrar={filtrar} 
            goToPage={goToPage}
            currentPath={currentPath}
            togleMenu={togleMenu}
        />
    )
}