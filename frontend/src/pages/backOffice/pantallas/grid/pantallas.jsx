import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//import { list, filter } from '../../../../actions/grid';
import { types } from  '../../../../redux/ModalDialog/types';
import { ModalDialog } from '../../../../components/backOffice/modalDialog';
import { getPage, filter, deleteRec } from '../../../../actions/pantallas';
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { GridPantallas } from './content';

export const PantallasGrid = () => {
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const dispatch = useDispatch();
    const [ idDelete, setIdDelete ] = useState(null);
    
    useEffect(() => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(getPage(0));
    }, [dispatch])
    
    const eliminarRegistro = id => {
        setIdDelete(id)
        dispatch({ type: types.SHOW_MODAL_DIALOG, payload: {titulo: 'Eliminar',mensaje: '¿Desea eliminar el registro?'} })
    }

    const response = (res) => {
        if (res) {
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(deleteRec(idDelete))
            dispatch(getPage(0))
        }
    }

    const mostrarOcultarModal = () => {
        dispatch({ type: types.SHOW_MODAL_DIALOG, action: false})
    }

    const filtrar = texto => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        if(texto.length > 0){
            dispatch(filter(texto,0));
        }else{
            dispatch(getPage(0));
        }
    }

    const goToPage = (e) => {
        dispatch(getPage(e))
    }

    return (
        <>
            <ModalDialog response={response} toggle={mostrarOcultarModal}/>
            <GridPantallas 
                eliminarRegistro={eliminarRegistro} 
                filtrar={filtrar} 
                goToPage={goToPage}
                togleMenu={togleMenu}
            />
        </>
    )
}
