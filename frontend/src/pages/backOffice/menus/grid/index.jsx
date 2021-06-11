import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { filter, list } from '../../../../actions/grid';
import { GridMenus } from './content'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { deleteRec } from '../../../../actions/menus'
import { types } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'

export const MenusGrid = () => {
    const listado = useSelector(state => state.GridReducer.data)
    const [ idDelete, setIdDelete] = useState(null)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(list('menus',0))
    },[dispatch])
    
    const response = (res) => {
        if (res) {
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(deleteRec(idDelete))
            dispatch(list('menus',0))
        }
    }

    const eliminarRegistro = (id) => {
        setIdDelete(id)
        dispatch({ type: types.SHOW_MODAL_DIALOG, payload: {titulo: 'Eliminar',mensaje: '¿Desea eliminar el registro?'} })
    }

    const mostrarOcultarModal = () => {
        dispatch({ type: types.SHOW_MODAL_DIALOG, action: false})
    }
    
    const filtrar = (texto) => {
        if (texto.length > 0) {
            dispatch(filter('menus', texto, 0))
        } else {
            dispatch(list('menus',0))
        }
    }

    if (listado === "Token is Expired") {
        return (<Redirect to="/"/>)
    }
    
    return (
        <>
            <ModalDialog response={response} toggle={mostrarOcultarModal}/>
            <GridMenus listado={listado} eliminarRegistro={eliminarRegistro} filtrar={filtrar} />
        </>
    )
}