import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { list, filter } from '../../../../actions/grid'
import { eliminar } from  '../../../../actions/roles'
import { types } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { RolesContent } from './content'

export const RolesGrid = () => {
    const listado = useSelector(state => state.GridReducer.data )
    const dispatch = useDispatch()
    const [ idDelete, setIdDelete ] = useState(0)

    useEffect(()=>{
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(list('roles',0));
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
            dispatch(list('roles',0));
        }
    }

    const response = (res) => {
        if(res){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(eliminar(idDelete));
            dispatch(list('roles',0));
        }
    }

    return (
        <RolesContent 
            listado={listado} 
            response={response} 
            eliminarRegistro={eliminarRegistro} 
            filtrar={filtrar}/>
    )
}