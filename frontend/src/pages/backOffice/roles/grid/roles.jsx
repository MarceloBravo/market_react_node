import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import { list, filter } from '../../../../actions/grid'
import { getPage, filter, eliminar } from  '../../../../actions/roles'
import { types } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { RolesContent } from './content'

export const RolesGrid = () => {
    const dataGrid = useSelector(state => state.RolesReducer.dataGrid )
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const dispatch = useDispatch()
    const [ idDelete, setIdDelete ] = useState(0)

    useEffect(()=>{
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(getPage(0));
    },[dispatch])

    const eliminarRegistro = (id) => {
        dispatch({type: types.SHOW_MODAL_DIALOG, payload:{titulo: 'Eliminar', mensaje: '¿Desea eliminar el registro' } })
        setIdDelete(id)
    }

    const filtrar = (texto) => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        if(texto.length > 0){
            dispatch(filter('roles', texto, 0));
        }else{
            dispatch(getPage(0));
        }
    }

    const response = (res) => {
        if(res){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(eliminar(idDelete));
            dispatch(getPage(0));
        }
    }

    const goToPage = (e) => {
        dispatch(getPage(e));
    }

    return (
        <RolesContent 
            dataGrid={dataGrid} 
            response={response} 
            eliminarRegistro={eliminarRegistro} 
            filtrar={filtrar}
            goToPage={goToPage}
            togleMenu={togleMenu}
        />
    )
}