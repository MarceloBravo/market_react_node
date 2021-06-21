import { useEffect, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getPage, filter, deleteReg } from '../../../../actions/unidades'
import { types as modalTypes } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { UnidadesGridContent } from './content'
import { findByUrl } from '../../../../actions/pantallas'

export const UnidadesGrid = () => {
    const currentUrl = window.location.pathname.split('/')[1]
    const dataGrid = useSelector(state => state.UnidadesReducer.dataGrid)
    const tipoAlerta = useSelector(state => state.AlertaReducer.tipo)
    const pantalla = useSelector(state => state.PantallasReducer.pantalla)
    const [ idEliminar, setIdEliminar ] = useState(null)
    const dispatch = useDispatch()


    useEffect(()=> {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(getPage(0))
    },[dispatch])


    useEffect(()=>{
        if(tipoAlerta === 'success'){
            dispatch(getPage(0))
        }
    },[tipoAlerta, dispatch])

    useEffect(()=>{
        dispatch(findByUrl(currentUrl))
    },[dispatch, currentUrl])


    const response = (e) => {
        if(e){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(deleteReg(idEliminar))
        }
    }

    const eliminarRegistro = (e) => {
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', titulo: 'Eliminar'}})
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

    const goToPage = (e) => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(getPage(e))
    }

    return (
        <UnidadesGridContent 
            response={response} 
            dataGrid={dataGrid} 
            currentUrl={currentUrl} 
            eliminarRegistro={eliminarRegistro} 
            filtrar={filtrar} 
            goToPage={goToPage}
            pantalla={pantalla}
        />       
    )
}