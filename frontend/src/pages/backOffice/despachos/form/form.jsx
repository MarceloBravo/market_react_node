import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { findByBuyOrden }  from '../../../../actions/ordenesCompra'
import { formatearFechaHora } from '../../../../shared/funciones'
import { buscar as buscarRegion } from '../../../../actions/regiones'
import { buscar as buscarProvincia} from '../../../../actions/provincias'
import { buscar as buscarComuna} from '../../../../actions/comunas'
import { anularVenta } from '../../../../actions/ventas'
import { cambiarEstado } from '../../../../actions/despachos'
import { types as modalTypes } from '../../../../redux/ModalDialog/types'
import { types as alertasTypes } from '../../../../redux/Alert/types'
import { DespachosFormComponent } from './content'

export const DespachosForm = () => {
    const id = useParams('id')
    const ordenState = useSelector(state => state.OrdenesCompraReducer.orden)
    const regionState = useSelector(state => state.RegionesReducer.ciudad)
    const provinciaState = useSelector(state => state.ProvinciasReducer.provincia)
    const comunaState = useSelector(state => state.ComunasReducer.comuna)
    const tipoAlertaState = useSelector(state => state.AlertaReducer.tipo)
    const [ dataGrid, setDataGrid ] = useState({data:[]})
    const [ accion, setAccion ] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()

    
    useEffect(()=>{
        if(id?.id){
            dispatch(findByBuyOrden(id.id))
        }
    },[dispatch, id])


    useEffect(()=>{
        //console.log('ordenState',ordenState)
        if(ordenState.region && ordenState.provincia && ordenState.comuna){
            dispatch(buscarRegion(ordenState.region))
            dispatch(buscarProvincia(ordenState.provincia))
            dispatch(buscarComuna(ordenState.comuna))
        }
        setDataGrid({...dataGrid, data:ordenState.productos})
        // eslint-disable-next-line
    },[ordenState])


    useEffect(()=>{
        if(tipoAlertaState === 'success'){
            history.push('/detalle_despacho')
        }
        // eslint-disable-next-line
    },[tipoAlertaState])


    const response = (resp) => {
        if(resp){
            if(accion === 'despachar'){
                dispatch(cambiarEstado(ordenState.id, 1))
            }else if(accion === 'anular'){
                dispatch(anularVenta(ordenState.venta_id))
            }
        }
    }


    const grabar = () => {
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea despachar la venta?', titulo: 'Despachar Venta'}})
        setAccion('despachar')
    }


    const handlerBtnCancelar = () => {
        dispatch({type: alertasTypes.OCULTAR_ALERTA})
        history.push('/detalle_despacho')
    }


    const eliminar = (e) => {
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea anular la venta?', titulo: 'Anular Venta'}})
        setAccion('anular')
    }

    
    return (
        <DespachosFormComponent 
            response={response} 
            ordenState={ordenState} 
            regionState={regionState} 
            comunaState={comunaState} 
            provinciaState={provinciaState} 
            formatearFechaHora={formatearFechaHora} 
            dataGrid={dataGrid} 
            grabar={grabar} 
            eliminar={eliminar} 
            handlerBtnCancelar={handlerBtnCancelar} 
            id={id}
        />
    )
}