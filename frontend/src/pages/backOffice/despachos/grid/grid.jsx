import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPage, filtrar } from '../../../../actions/despachos'
import { GridContent } from './content'

export const DespachosGrid  = () => {
    const listaDespachosState = useSelector(state => state.DespachosReducer.list)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const [ currentPage, setCurrentPage ] = useState(0)
    const [ dataGrid, setDataGrid ] = useState({data:[], rowsPerPage: 10, totRows: 0})
    const [ textoFiltro, setTextoFiltro ] = useState('')
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getPage(0))
    },[dispatch])


    useEffect(()=>{
        if(textoFiltro){
            dispatch(filtrar(textoFiltro, currentPage))
        }else{
            dispatch(getPage(currentPage))
        }
    },[textoFiltro, currentPage, dispatch])


    useEffect(()=>{
        if(listaDespachosState){
            setDataGrid({...dataGrid, data:listaDespachosState.data, totRows: listaDespachosState.totRows, page: listaDespachosState.pag})
            //setDataGrid({...dataGrid, data:listaDespachosState.data})
        }
        // eslint-disable-next-line
    },[listaDespachosState])


    const fnFiltrar = (texto) => {
        setCurrentPage(0)
        setTextoFiltro(texto)
    }

    const goToPage = (e) => {
        setCurrentPage(e)
    }


    return(
        <GridContent dataGrid={dataGrid} fnFiltrar={fnFiltrar} goToPage={goToPage} togleMenu={togleMenu}/>       
    )
}