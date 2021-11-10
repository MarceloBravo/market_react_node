import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { types } from '../../../../redux/ModalDialog/types'
import { getPage, filter, deleteReg } from '../../../../actions/subCategorias'
import { findByUrl } from '../../../../actions/pantallas'
import { SubCategoriasGridContent } from './content'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'


export const SubCategoriasGrid = () => {
    const [ idEliminar, setIdEliminar ] = useState(null)
    const dataGrid = useSelector(state => state.SubCategoriasReducer.dataGrid)
    const pantalla = useSelector(state => state.PantallasReducer.pantalla)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(findByUrl(window.location.pathname.split('/')[1])) //Solicita los datos de la pantalla tales como el nombre
        dispatch(getPage(0))    //Solicita los datos para la grilla
    },[dispatch])


    const eliminarRegistro = (e) => {
        dispatch({type: types.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', titulo: 'Eliminar'}})
        setIdEliminar(e)
    }

    const filtrar = (texto) => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        if(texto){
            dispatch(filter(texto, 0))
        }else{
            dispatch(getPage(0))
        }
        
    }

    const response = (e) => {
        if(e){
            dispatch(deleteReg(idEliminar))
            dispatch(getPage(0))
        }
    }

    const goToPage = (e) => {
        dispatch(getPage(e))
    }

    return (
        <SubCategoriasGridContent 
            dataGrid={dataGrid} 
            pantalla={pantalla}
            response={response} 
            goToPage={goToPage}
            eliminarRegistro={eliminarRegistro}
            filtrar={filtrar}
            togleMenu={togleMenu}
        />
    )
}