import React from 'react'
import { RadialChart } from 'react-vis';
import { Header } from '../../../components/backOffice/header'
import { SpinnerComponent } from '../../../components/shared/spinner'
import { Menu } from '../../../components/backOffice/menu'
import { Alerta } from '../../../components/shared/alerts'
import { HorizontalBarChart } from '../../../components/backOffice/chart/horizontalBarChart'
import { Chart, LineAdvance } from "bizcharts";
import { Row, Col } from 'react-bootstrap'
import { VerticalBarChartCompare } from '../../../components/backOffice/chart/verticalBarChartCompare'
import { LineChart } from '../../../components/backOffice/chart/lineChart'

export const DashBoardContent = (props) => {
    const { 
        dataVerticalBarChart, 
        totVentasDespachos, 
        dataVentasDespachosUltimoAnio, 
        prodMasVendidos, 
        dataHBarChartMasVendidos, 
        prodMenosVendidos, 
        dataHBarChartMenosVendidos, 
        dataVentasMenusuales, 
        dataUnidadesMenusuales, 
        dataVentasTrimestrales, 
        dataUnidadesTrimestrales, 
        dataVentasAnuales, 
        dataUnidadesAnuales,
        togleMenu,
    } = props

    return (
        <>
            <Menu activeKeyMenu="30"/>
            <SpinnerComponent />
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>                    
                <Header />
                <div className="content-section home-page">                    
                    <Alerta />
                    <div className="div-title">Cuadro de mando</div>
                    <Row>
                        <h3>10 productos más vendidos v/s stock disponible</h3>
                        <Col className="chart-vendidos-stock">
                            <VerticalBarChartCompare 
                                data={dataVerticalBarChart}
                                ancho={500}
                            />
                        </Col>
                    </Row>   
                    <Row>
                        <h3>Ventas v/s Despachos</h3>
                        {totVentasDespachos && 
                            <Col>
                                <h4>Últimos 6 meses</h4>
                                <RadialChart
                                    data={totVentasDespachos}
                                    width={400}
                                    height={300} 
                                    showLabels={true}/>
                            </Col>
                        }
                        <Col>
                            <h4>Últimos 2 meses</h4>
                            <LineChart data={dataVentasDespachosUltimoAnio} labelXParseTo={'fecha'}/>
                        </Col>
                    </Row>
                    <Row>
                        <h3>Los 5 productos más vendidos</h3>
                        <Col>
                            <RadialChart
                                data={prodMasVendidos}
                                width={400}
                                height={300} 
                                showLabels={true}/>
                        </Col>
                        <Col>
                            <HorizontalBarChart data={dataHBarChartMasVendidos} />
                        </Col>
                    </Row>   
                    <Row>
                        <h3>Los 5 productos menos vendidos</h3>
                        <Col>
                            <RadialChart
                                data={prodMenosVendidos}
                                width={400}
                                height={300}
                                showLabels={true}/>
                        </Col>
                        <Col>
                            <HorizontalBarChart data={dataHBarChartMenosVendidos} />
                        </Col>
                    </Row>
                    <h1>Comportamiento de las ventas en los últimos 30 días</h1>
                    <h3>Facturación</h3>
                    {dataVentasMenusuales.length > 0 && 
                        <Chart padding={[10, 20, 50, 100]} autoFit height={300} data={dataVentasMenusuales} >
                            <LineAdvance
                                shape="smooth"
                                point
                                area
                                position="fecha*total"
                                color="tot_ventas"
                            />
                            
                        </Chart>
                    }

                    <h3>Unidades vendidades</h3>
                    {dataUnidadesMenusuales.length > 0 && 
                        <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={dataUnidadesMenusuales} >
                            <LineAdvance
                                shape="smooth"
                                point
                                area
                                position="fecha*unidades"
                                color="cant_ventas"
                            />
                        </Chart>
                    }


                    <h1>Comportamiento de las ventas en los últimos 3 trimestres</h1>
                    <h3>Facturación</h3>
                    {dataVentasTrimestrales.length > 0 && 
                        <Chart padding={[10, 20, 50, 100]} autoFit height={300} data={dataVentasTrimestrales} >
                            <LineAdvance
                                shape="smooth"
                                point
                                area
                                position="trimestre*total"
                                color="y"
                            />
                        </Chart>
                    }

                    <h3>Unidades vendidades</h3>
                    {dataUnidadesTrimestrales.length > 0 && 
                        <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={dataUnidadesTrimestrales} >
                            <LineAdvance
                                shape="smooth"
                                point
                                area
                                position="trimestre*unidades"
                                color="y"
                            />
                        </Chart>
                    }


                    <h1>Comportamiento de las ventas en los últimos 12 meses</h1>
                    <h3>Facturación</h3>
                    {dataVentasAnuales.length > 0 && 
                        <Chart padding={[10, 20, 50, 100]} autoFit height={300} data={dataVentasAnuales} >
                            <LineAdvance
                                shape="smooth"
                                point
                                area
                                position="mes*ventas"
                                color="y"
                            />
                        </Chart>
                    }

                    <h3>Unidades vendidades</h3>
                    {dataUnidadesAnuales.length > 0 && 
                        <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={dataUnidadesAnuales} >
                            <LineAdvance
                                shape="smooth"
                                point
                                area
                                position="mes*unidades"
                                color="y"
                            />
                        </Chart>
                    }


                </div>
            </div>
        </>
    
    )
}