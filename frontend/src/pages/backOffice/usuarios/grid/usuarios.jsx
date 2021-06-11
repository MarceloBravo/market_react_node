import React, { useEffect, useState } from 'react'
import { filter, list } from  '../../../../actions/grid'
import { eliminar } from  '../../../../actions/usuarios'
import { useSelector, useDispatch } from 'react-redux'
import { types as typesModal } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { ContentGridUsuarios } from './content'


export const UsuariosGrid = () => {
    const listado = useSelector(state => state.GridReducer.data)
    const [ refreshList,  setRefreshList ] = useState(false)
    const [ id, setId ] = useState(null)
    const dispatch = useDispatch()
    

    useEffect(()=>{
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(list('usuarios',0));
    },[dispatch, refreshList])


    const response = (res) => {
        if(res){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(eliminar(id));
            setRefreshList(true)
        }
    }


    const eliminarRegistro = (id) => {
        setId(id);
        dispatch({type: typesModal.SHOW_MODAL_DIALOG, payload: {titulo: 'Eliminar', mensaje: '¿Desea eliminar el registro?'}})
    }

    const filtrar = (texto) => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        if(texto.length > 0){
            dispatch(filter('usuarios', texto, 0));
        }else{
            dispatch(list('usuarios',0));
        }
    }

    return (
        <ContentGridUsuarios 
            response={response} 
            listado={listado} 
            eliminarRegistro={eliminarRegistro} 
            filtrar={filtrar}
        />
    )
}