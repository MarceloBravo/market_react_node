import { useState, useEffect } from 'react'
import { getPage, filter, deleteReg } from '../../../../actions/ciudades'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { types as modalDialogTypes } from '../../../../redux/ModalDialog/types'
import { useSelector, useDispatch  } from 'react-redux'
import { CiudadesContent } from './content'

export const CiudadesGrid = () => {
    const [ idDelete, setIdDelete ] = useState(null)
    const [ textoFiltro, setTextoFiltro ] = useState('')
    const [ currentPage, setCurrentPage ] = useState(0)
    const togleMenu = useSelector(state => state.MenusReducer.togleMenu)
    const dataGrid = useSelector(state => state.CiudadesReducer.dataGrid )
    const tipoAlerta = useSelector(state => state.AlertasReducer.tipo )
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(getPage(0))
    },[dispatch])


    useEffect(()=>{
        if(tipoAlerta === 'success' && idDelete !== null){
            if(textoFiltro.length > 0){
                dispatch(filter(currentPage))
            }else{
                dispatch(getPage(currentPage))
            }
        }
    },[dispatch, tipoAlerta, idDelete])


    const response = res => {
        if(res && idDelete){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(deleteReg(idDelete))
        }
    }


    const eliminarRegistro = (id) => {
        setIdDelete(id)
        dispatch({type: modalDialogTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar la ciudad?', titulo: 'Eliminar ciudad'}})
    }

    const fnFiltrar = (texto) => {
        setTextoFiltro(texto)
        dispatch({type: spinnerTypes.SHOW_SPINNER})        
        if(texto.length > 0){
            dispatch(filter(texto, currentPage))
        }else{
            dispatch(getPage(currentPage))
        }
    }


    const goToPage = (pag) => {
        setCurrentPage(pag)
        fnFiltrar(textoFiltro)
    }

    
    return (
        <CiudadesContent
            response={response}
            togleMenu={togleMenu}
            dataGrid={dataGrid}
            eliminarRegistro={eliminarRegistro}
            fnFiltrar={fnFiltrar}
            goToPage={goToPage}
        />
    )

}