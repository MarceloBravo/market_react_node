import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ventasUltimoMes, ventasTrimestrales, ventasAnuales, masVendidos, menosVendidos, totalesVentasDespachos, ventasDespachosUltimoAnio } from '../../../actions/dashboard'
import { types as spinnerTypes } from '../../../redux/Spinner/types'
import { DashBoardContent } from './content'
import './style.css'

export const Dashboard = () => {
    const ventasMensualesState = useSelector(state => state.DashboardReducer.ventasMensuales)
    const ventasTrimestralesState = useSelector(state => state.DashboardReducer.ventasTrimestrales)
    const ventasAnualesState = useSelector(state => state.DashboardReducer.ventasAnuales)
    const masVendidosState = useSelector(state => state.DashboardReducer.masVendidos)
    const menosVendidosState = useSelector(state => state.DashboardReducer.menosVendidos)
    const totalesVentasDespachosState = useSelector(state => state.DashboardReducer.totalesVentasDespachos)
    const ventasDespachosUltimoAnioState = useSelector(state => state.DashboardReducer.ventasDespachosUltimoAnio)
    const [ dataVentasMenusuales, setDataVentasMensuales ] = useState([])
    const [ dataUnidadesMenusuales, setDataUnidadesMensuales ] = useState([])
    const [ dataVentasTrimestrales, setDataVentasTrimestrales ] = useState([])
    const [ dataUnidadesTrimestrales, setDataUnidadesTrimestrales ] = useState([])
    const [ dataVentasAnuales, setDataVentasAnuales ] = useState([])
    const [ dataUnidadesAnuales, setDataUnidadesAnuales ] = useState([])
    const [ prodMasVendidos, setProdMasVendidos ] = useState([])
    const [ prodMenosVendidos, setProdMenosVendidos ] = useState([])
    const [ dataHBarChartMasVendidos, setDataHBarChartMasVendidos ] = useState([])
    const [ dataHBarChartMenosVendidos, setDataHBarChartMenosVendidos ] = useState([])
    const [ dataVerticalBarChart, setDataVerticalBarChart ] = useState([])
    const [ totVentasDespachos, setTotVentasDespachos] = useState([])
    const [ dataVentasDespachosUltimoAnio, setDataVentasDespachosUltimoAnio ] = useState({datos: [], leyenda:[]})
    
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(ventasUltimoMes())
        dispatch(ventasTrimestrales())
        dispatch(ventasAnuales())
        dispatch(masVendidos())
        dispatch(menosVendidos())
        dispatch(totalesVentasDespachos())
        dispatch(ventasDespachosUltimoAnio())
    },[dispatch])


    useEffect(()=>{ 
        if(ventasMensualesState){
            setDataUnidadesMensuales(ventasMensualesState.map(v => {
                return {fecha: v.fecha_venta, cant_ventas: 'Unidades', unidades: parseInt(v.ventas)}
            }))

            setDataVentasMensuales(ventasMensualesState.map(v => {
                return {fecha: v.fecha_venta, tot_ventas: 'Facturado', total: parseInt(v.total_diario)}
            }))
        }
    // eslint-disable-next-line
    },[ventasMensualesState])


    useEffect(()=>{
        if(ventasTrimestralesState){
            setDataUnidadesTrimestrales(ventasTrimestralesState.map(v => {
                return {trimestre: `Trimestre ${v.trimestre}`, y: 'Trimestre ' , unidades: parseInt(v.cantidad)}
            }))

            setDataVentasTrimestrales(ventasTrimestralesState.map(v => {
                return {trimestre: `Trimestre ${v.trimestre}`, y: 'Trimestre ', total: parseInt(v.total_trimestre)}
            }))
        }
    },[ventasTrimestralesState])


    useEffect(()=>{
        if(ventasAnualesState){
            setDataUnidadesAnuales(ventasAnualesState.map(v => {
                return {mes: `Mes ${v.mes}`, y: 'Meses' , unidades: parseInt(v.total)}
            }))

            setDataVentasAnuales(ventasAnualesState.map(v => {
                return {mes: `Mes ${v.mes}`, y: 'Meses', ventas: parseInt(v.ventas)}
            }))
        }
    },[ventasAnualesState])


    useEffect(()=>{
        if(masVendidosState){
            setProdMasVendidos(masVendidosState.map((p, k) => {return {angle: p.cantidad, label: p.nombre.substr(0, 20), key: k}}).filter( i => i.key < 5))
            setDataHBarChartMasVendidos(masVendidosState.map((p, k) => {return {value: p.cantidad, label: p.nombre.substr(0, 45), key: k}}).filter( i => i.key < 5).reverse())
            
            let datos = masVendidosState.filter( (i, k) => k < 10).map((p, k) => {return {cantidad: p.cantidad, producto: p.nombre.substr(0, 60), stock: p.stock}})
            setDataVerticalBarChart({
                ...dataVerticalBarChart, 
                vendidos: datos.map((i, k )=> {return {x: `Prod ${k+1}`, y: i.cantidad}}),
                stock: datos.map((i, k) => {return {x: `Prod ${k+1}`, y: i.stock}}),
                leyenda: [{title: 'Vendidos', color: '#12939A'},{title: 'Stock disponible',color: '#79C7E3'}],
                productos: datos.map((i, k) => `Prod ${k+1} - ${i.producto}`)
            })
        }
    // eslint-disable-next-line
    },[masVendidosState])


    useEffect(()=>{
        if(menosVendidosState){
            setProdMenosVendidos(menosVendidosState.map((p, k) => {return {angle: p.cantidad, label: p.nombre.substr(0, 20), key: k}}).filter( i => i.key < 5))
            setDataHBarChartMenosVendidos(menosVendidosState.map((p, k) => {return {value: p.cantidad, label: p.nombre.substr(0, 45), key: k}}).filter( i => i.key < 5).reverse())
        }
    },[menosVendidosState])
    

    useEffect(()=>{
        if(totalesVentasDespachosState){
            setTotVentasDespachos([{angle: totalesVentasDespachosState.ventas, label: 'Ventas'},{angle: totalesVentasDespachosState.despachos, label: 'Despachos'}])
        }
    },[totalesVentasDespachosState])


    useEffect(()=>{
        if(ventasDespachosUltimoAnioState){
            console.log('ventasDespachosUltimoAnioState',ventasDespachosUltimoAnioState)
            let datos =ventasDespachosUltimoAnioState.map((i, k) => {return {fecha_venta: i.fecha_venta, fecha_despacho: i.fecha_despacho, productos: i.productos, despachos: i.despachos}})
            setDataVentasDespachosUltimoAnio({
                ...dataVentasDespachosUltimoAnio,
                datos: [datos.map(i => {return {x: new Date(i.fecha_venta.split("-").reverse().join("-")), y: i.productos}}),
                datos.filter(e => e.fecha_despacho !== null).map(i => {return {x: new Date(i.fecha_despacho.split("-").reverse().join("-")), y: i.despachos}})],
                config: [{title: "Ventas"}, {title: "Despachos"}],
            })
        }
    // eslint-disable-next-line
    },[ventasDespachosUltimoAnioState])
    
    return (
        <DashBoardContent 
            dataVerticalBarChart={dataVerticalBarChart} 
            totVentasDespachos={totVentasDespachos} 
            dataVentasDespachosUltimoAnio={dataVentasDespachosUltimoAnio} 
            prodMasVendidos={prodMasVendidos} 
            dataHBarChartMasVendidos={dataHBarChartMasVendidos} 
            prodMenosVendidos={prodMenosVendidos} 
            dataHBarChartMenosVendidos={dataHBarChartMenosVendidos} 
            dataVentasMenusuales={dataVentasMenusuales} 
            dataUnidadesMenusuales={dataUnidadesMenusuales} 
            dataVentasTrimestrales={dataVentasTrimestrales} 
            dataUnidadesTrimestrales={dataUnidadesTrimestrales} 
            dataVentasAnuales={dataVentasAnuales} 
            dataUnidadesAnuales={dataUnidadesAnuales}
        />       
    )
}