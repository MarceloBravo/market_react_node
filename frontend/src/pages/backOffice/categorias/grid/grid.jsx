import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPage, deleteReg, filter } from '../../../../actions/categorias'
import { types as modalTypes } from  '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from  '../../../../redux/Spinner/types'
import { ContentCategoriasGrid } from './content'

export const CategoriasGrid = (props) => {
    const dataGrid = useSelector(state => state.CategoriasReducer.dataGrid)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const dispatch = useDispatch()
    const [ idDelete, setIdDelete ] = useState(null)

    useEffect(()=> {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(getPage(0))
    },[dispatch])


    const eliminarRegistro = (e) => {
        setIdDelete(e)
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro', titulo: 'Eliminar'}})
    }

    const response = (e) => {
        if(e){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(deleteReg(idDelete))
            dispatch(getPage(0))
        }
    }


    const filtrar = (texto) => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        if(texto !== ''){
            dispatch(filter(texto, 0))
        }else{
            dispatch(getPage(0))
        }
    }

    const goToPage = (e) => {
        dispatch(getPage(e))
    }


    return (
        <ContentCategoriasGrid 
            response={response} 
            dataGrid={dataGrid} 
            eliminarRegistro={eliminarRegistro} 
            filtrar={filtrar}
            goToPage={goToPage}
            togleMenu={togleMenu}
        />
    )
}