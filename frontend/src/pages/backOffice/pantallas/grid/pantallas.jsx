import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { list, filter } from '../../../../actions/grid';
import { types } from  '../../../../redux/ModalDialog/types';
import { ModalDialog } from '../../../../components/backOffice/modalDialog';
import { deleteRec } from '../../../../actions/pantallas';
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { GridPantallas } from './content';

export const PantallasGrid = () => {
    const dispatch = useDispatch();
    const [ idDelete, setIdDelete ] = useState(null);
    
    useEffect(() => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(list('pantallas',0));
    }, [dispatch])
    
    const eliminarRegistro = id => {
        setIdDelete(id)
        dispatch({ type: types.SHOW_MODAL_DIALOG, payload: {titulo: 'Eliminar',mensaje: '¿Desea eliminar el registro?'} })
    }

    const response = (res) => {
        if (res) {
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(deleteRec(idDelete))
            dispatch(list('pantallas',0))
        }
    }

    const mostrarOcultarModal = () => {
        dispatch({ type: types.SHOW_MODAL_DIALOG, action: false})
    }

    const filtrar = texto => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        if(texto.length > 0){
            dispatch(filter('pantallas',texto,0));
        }else{
            dispatch(list('pantallas',0));
        }
    }

    return (
        <>
            <ModalDialog response={response} toggle={mostrarOcultarModal}/>
            <GridPantallas eliminarRegistro={eliminarRegistro} filtrar={filtrar}/>
        </>
    )
}
