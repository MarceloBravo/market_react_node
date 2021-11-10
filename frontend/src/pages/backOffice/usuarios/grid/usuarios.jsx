import React, { useEffect, useState } from 'react'
//import { filter, list } from  '../../../../actions/grid'
import { getPage, filter, eliminar } from  '../../../../actions/usuarios'
import { useSelector, useDispatch } from 'react-redux'
import { types as typesModal } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { ContentGridUsuarios } from './content'


export const UsuariosGrid = () => {
    const dataGrid = useSelector(state => state.UsersReducer.dataGrid)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const [ refreshList,  setRefreshList ] = useState(false)
    const [ id, setId ] = useState(null)
    const dispatch = useDispatch()
    

    useEffect(()=>{
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(getPage(0));
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
            dispatch(filter(texto, 0));
        }else{
            dispatch(getPage(0));
        }
    }

    const goToPage = (e) => {
        dispatch(getPage(e))
    }

    return (
        <ContentGridUsuarios 
            response={response} 
            dataGrid={dataGrid} 
            eliminarRegistro={eliminarRegistro} 
            filtrar={filtrar}
            goToPage={goToPage}
            togleMenu={togleMenu}
        />
    )
}