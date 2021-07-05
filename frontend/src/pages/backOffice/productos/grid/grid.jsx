import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { findByUrl } from '../../../../actions/pantallas'
import { getPage, filter, deleteReg } from '../../../../actions/productos'
import { types as SpinnerTypes } from '../../../../redux/Spinner/types'
import { types as modalTypes } from '../../../../redux/ModalDialog/types'
import { ProductosFormContent } from './content'

export const ProductosGrid = () => {
    const currentUrl = window.location.pathname.split('/')[1]
    const [ txtFiltro, setTxtFiltro ] = useState(null)
    const [ idEliminar, setIdEliminar ] = useState(null)
    const dataGrid = useSelector(state => state.ProductosReducer.dataGrid)
    const pantalla = useSelector(state => state.PantallasReducer.pantalla)
    const tipoAlerta = useSelector(state => state.AlertaReducer.tipo)
    const dispatch = useDispatch()


    useEffect(()=> {
        dispatch({type: SpinnerTypes.SHOW_SPINNER})
        dispatch(findByUrl(currentUrl))
    },[currentUrl, dispatch])


    useEffect(()=>{
        dispatch(getPage(0))
    },[dispatch])


    useEffect(()=>{
        if(tipoAlerta === 'success'){
            if(txtFiltro){
                dispatch(filter(txtFiltro, 0))
            }else{
                dispatch(getPage(0))
            }
        }
    },[dispatch, tipoAlerta, txtFiltro])


    const response = (e) => {
        if(e){
            dispatch({type: SpinnerTypes.SHOW_SPINNER})
            dispatch(deleteReg(idEliminar))
        }
    }

    const eliminarRegistro = (e) => {
        setIdEliminar(e)
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', titulo: 'Eliminar'}})
    }

    const filtrar = (texto) => {
        dispatch({type: SpinnerTypes.SHOW_SPINNER})
        if(texto){
            setTxtFiltro(texto)
            dispatch(filter(texto, 0))
        }else{
            setTxtFiltro(null)
            dispatch(getPage(0))
        }

    }

    const goToPage = (e) => {
        dispatch({type: SpinnerTypes.SHOW_SPINNER})
        dispatch(txtFiltro ? filter(e) : getPage(e))
    }

    return (
        <ProductosFormContent
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