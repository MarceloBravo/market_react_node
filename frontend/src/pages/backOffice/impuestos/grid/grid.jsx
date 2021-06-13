import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getPage, filtrar, deleteReg } from '../../../../actions/impuestos'
import { useDispatch } from 'react-redux'
import { types as modalTypes } from '../../../../redux/ModalDialog/types'
import { ImpuestosContent } from './content'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'

export const ImpuestosGrid = () => {
    const [ idEliminar, setIdEliminar ] = useState(null)
    const listado = useSelector(state => state.ImpuestosReducer.listado)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(getPage(0))
    },[dispatch])

    const eliminarRegistro = (e) => {
        setIdEliminar(e)
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', titulo: 'Eliminar'}})
    }

    const fnFiltrar = (e) => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        if(e){
            dispatch(filtrar(e, 0))
        }else{
            dispatch(getPage(0))
        }
    }

    const response = e => {
        if(e){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(deleteReg(idEliminar))
            dispatch(getPage(0))
        }
    }


    return (
        <ImpuestosContent 
            response={response} 
            listado={listado} 
            eliminarRegistro={eliminarRegistro} 
            fnFiltrar={fnFiltrar}
        />
    )
}