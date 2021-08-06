import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAll as listadoMarcas } from '../../../actions/marcas'
import { getAll as listadoDeptos } from '../../../actions/categorias'
import { getItemsPage as getProductos, filterParams, getPreciosMinMax } from '../../../actions/productos'
import { formatearPrecio } from '../../../shared/funciones'
import { CatalogoContent } from './content'



export const Catalogo = () => {
    const [ dataGrid, setDataGrid ] = useState({data: []})
    const [ rangeValue, setRangeValue ] = useState([null, null])
    // eslint-disable-next-line
    const [ buscar, setBuscar ]  = useState(true)
    const [ itemsPorPagina, setItemsPorPagina ] = useState(10)
    const [ marcas, setMarcas ] = useState([])
    const [ departamentos, setDepartamentos ] = useState([])
    const [ orderBy, setOrderBy ] = useState({field: null, direction: null})
    const marcasState = useSelector(state => state.MarcasReducer.list)
    const departamentosState = useSelector(state => state.CategoriasReducer.list)
    const productosState = useSelector(state => state.ProductosReducer.dataGrid)
    const textoFiltroState = useSelector(state => state.ProductosReducer.textoFiltro)
    const preciosMinMaxState = useSelector(state => state.ProductosReducer.preciosMinMax)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(listadoMarcas())
        dispatch(listadoDeptos())
        dispatch(getPreciosMinMax())
    },[dispatch])

    
    useEffect(()=>{
        if(rangeValue[0] && rangeValue[1] && buscar){
            aplicarFiltro()
            setBuscar(false)
        }
        // eslint-disable-next-line
    },[dispatch, itemsPorPagina, orderBy, textoFiltroState, rangeValue])


    useEffect(()=>{
        aplicarFiltro()
        // eslint-disable-next-line
    },[textoFiltroState])


    useEffect(()=>{
        setMarcas(marcasState.map(m => {return {[m.nombre.split(' ').join('_')]: false}} ))
    },[marcasState])
    

    useEffect(()=>{
        setDepartamentos(departamentosState.map(d => {return {[d.nombre.split(' ').join('_')]: false}} ))
    },[departamentosState])
    

    useEffect(()=>{
        setDataGrid({...dataGrid, data: productosState.data})
        // eslint-disable-next-line
    },[productosState])

    useEffect(()=>{
        setRangeValue([preciosMinMaxState.min, preciosMinMaxState.max])
    },[preciosMinMaxState])


    const initialValuesGridCard = (items, orden) => {
        configurarOrden(orden)
        setItemsPorPagina(items)
    }


    const itemsPerPageOnChange = (e) => {
        setBuscar(true)
        setItemsPorPagina(e.target.value)
    }


    const handlerRange = (e) => {
        setRangeValue(e)
    }


    const goToPage = (e) => {
        dispatch(getProductos(e, itemsPorPagina))
    }


    // ******** FILTRO DE REGISTROS ************
    const handlerMarcasChanges = e => {
        let copia = [...marcas]  //Clonando el array marcas
        copia[e.target.name.split("-")[1]][e.target.name.split("-")[2]] = e.target.checked   //Actualizando el estado en el array clonado
        setMarcas(copia)     //Asignando el array clone al nuevo estado
    }


    const handlerDeptosChanges = e => {
        let copia = [...departamentos]  //Clonando el array departamentos
        copia[e.target.name.split("-")[1]][e.target.name.split("-")[2]] = e.target.checked   //Actualizando el estado en el array clonado
        setDepartamentos(copia)     //Asignando el array clone al nuevo estado
    }


    const aplicarFiltro = () => {
        let _marcas = '', _deptos = ''
        marcas.forEach((m, id) => {if( m[Object.keys(m)[0]]){_marcas += (_marcas !== '' ? ',': '') + '"' + marcasState[id].nombre + '"'}})
        departamentos.forEach((d, id) => {if( d[Object.keys(d)[0]]){_deptos += (_deptos !== '' ? ',': '') + '"' + departamentosState[id].nombre + '"'}})
        dispatch(filterParams({
            texto: textoFiltroState, //*
            min: rangeValue[0], 
            max: rangeValue[1], 
            marcas: _marcas, 
            departamentos: _deptos, 
            ordenar_por: orderBy.field, 
            direccion: orderBy.direction,
            itemsPorPagina: itemsPorPagina  //*
        },0))
    }
    

    const strPrecio = (neto, impuestos) => {
        let precio = formatearPrecio(neto, impuestos)
        return precio.substr(0, precio.length-3)
    }


    const orderByOnChange = (e) => {
        setBuscar(true)
        configurarOrden(parseInt(e.target.value))
    }
    

    const configurarOrden  = (e) => {
        switch(e){
            case 1: //Menor a mayor precio
                setOrderBy({field: 'p.precio_venta_normal', direction: 'ASC'})
                break;
            case 2: //Mayor a menor precio
                setOrderBy({field: 'p.precio_venta_normal', direction: 'DESC'})
                break;
            case 3: //Más vendidos primero
                //Pendiente, actualizar al crear la tabla de registro de ventas
                setOrderBy({field: 'p.precio_venta_normal', direction: 'ASC'})
                break;
            case 4: //Menos vendidos primero
                //Pendiente, actualizar al crear la tabla de registro de ventas
                setOrderBy({field: 'p.precio_venta_normal', direction: 'DESC'})
                break;
            case 5: //Recién llegados primero
                setOrderBy({field: 'p.created_at', direction: 'ASC'})
                break;
            case 6: //Recién llegados al final
                setOrderBy({field: 'p.created_at', direction: 'DESC'})
                break;
            default:
                setOrderBy({field: null, direction: null})
        }
    }


    return (
        <CatalogoContent 
            strPrecio={strPrecio} 
            preciosMinMaxState={preciosMinMaxState} 
            rangeValue={rangeValue} 
            handlerRange={handlerRange} 
            marcasState={marcasState} 
            marcas={marcas} 
            handlerMarcasChanges={handlerMarcasChanges}
            departamentosState={departamentosState}
            departamentos={departamentos}
            handlerDeptosChanges={handlerDeptosChanges} 
            itemsPerPageOnChange={itemsPerPageOnChange} 
            dataGrid={dataGrid} 
            aplicarFiltro={aplicarFiltro} 
            orderByOnChange={orderByOnChange} 
            initialValuesGridCard={initialValuesGridCard} 
            productosState={productosState} 
            goToPage={goToPage}
        />
    )
}