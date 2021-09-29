import { types } from './types'

const INITIAL_STATE = {
    ventasMensuales: [],
    ventasTrimestrales: [],
    ventasAnuales: [],
    masVendidos: [],
    menosVendidos: [],
    totalesVentasDespachos: null,
    ventasDespachosUltimoAnio: null,
}

export const DashboardReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case types.DASHBOARD_VENTAS_MENSUALES:
            return {
                ...state,
                ventasMensuales: action.payload.data
            }
        case types.DASHBOARD_VENTAS_TRIMESTRALES:
            return {
                ...state,
                ventasTrimestrales: action.payload.data
            }
        case types.DASHBOARD_VENTAS_ANUALES:
            return {
                ...state,
                ventasAnuales: action.payload.data
            }
        case types.DASHBOARD_MAS_VENDIDOS:
            return {
                ...state,
                masVendidos: action.payload.data
            }
        case types.DASHBOARD_MENOS_VENDIDOS:
            return {
                ...state,
                menosVendidos: action.payload.data
            }
        case types.DASHBOARD_TOTALES_VENTAS_DESPACHOS:
            return {
                ...state,
                totalesVentasDespachos: action.payload.data
            }
        case types.DASHBOARD_VENTAS_DESPACHOS_ULTIMO_ANIO:
            return {
                ...state,
                ventasDespachosUltimoAnio: action.payload.data
            }
        default:
            return state
    }
}