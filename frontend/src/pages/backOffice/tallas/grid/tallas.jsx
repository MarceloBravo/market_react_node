import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { findByUrl } from '../../../../actions/pantallas'
import { getPage, filter, deleteReg } from '../../../../actions/tallas'
import { types as ModalTypes } from '../../../../redux/ModalDialog/types'
import { TallasGridContent } from './content'

export const TallasGrid = () => {
    const url = window.location.pathname.split('/')[1]
    const [ pagina, setPagina ] = useState(0)
    const [ textoFiltro, setTextoFiltro ] = useState('')
    const [ idEliminar, setIdEliminar ] = useState(null)
    const pantalla = useSelector( state => state.PantallasReducer.pantalla )
    const dataGrid = useSelector( state => state.TallasReducer.dataGrid )
    const togleMenu = useSelector(state => state.MenusReducer.togle )
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getPage(pagina))
    },[])

    useEffect(()=>{
        console.log('dataGrid',dataGrid)
    },[dataGrid])


    useEffect(()=>{
        dispatch(findByUrl(url))
    },[dispatch, url])

    
    useEffect(()=> {
        if(textoFiltro.length > 0){
            dispatch(filter(textoFiltro, pagina))
        }else{
            dispatch(getPage(pagina))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[textoFiltro, pagina])


    const response = res => {
        if(res){
            dispatch(deleteReg(idEliminar))
        }
    }


    const eliminarRegistro = id => {
        dispatch({type: ModalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', titulo: 'Eliminar'}})
        setIdEliminar(id)
    }


    const filtrar = texto => {
        setTextoFiltro(texto)
    }


    const goToPage = pag => {
        setPagina(pag)
    }


    return (
        <TallasGridContent
            response={response}
            togleMenu={togleMenu}
            dataGrid={dataGrid}
            pantalla={pantalla}
            eliminarRegistro={eliminarRegistro}
            filtrar={filtrar}
            goToPage={goToPage}
        />
    )
}