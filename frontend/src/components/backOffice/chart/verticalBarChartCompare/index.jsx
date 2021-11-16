import React from 'react'
import {
    XYPlot, 
    XAxis, 
    YAxis, 
    HorizontalGridLines, 
    VerticalGridLines, 
    VerticalBarSeries, 
    DiscreteColorLegend 
} from 'react-vis';

export const VerticalBarChartCompare = (props) => {
    const { data, ancho, alto } = props 
    /*    
        leyenda, //Ej.: [{title: 'Vendidos', color: '#12939A'},{title: 'Stock',color: '#79C7E3'}]
        data1, //Ej.: [{x: 'Q1', y: 10},{x: 'Q2', y: 5},{x: 'Q3', y: 15},{x: 'Q4', y: 20}] 
        data2, //Ej.: [{x: 'Q1', y: 3},{x: 'Q2', y: 7},{x: 'Q3', y: 2},{x: 'Q4', y: 1}]
    */
   const top = data?.productos?.length > 0 ? (alto ? alto : 300)/data.productos.length : 45


    return (
        <XYPlot
            className="clustered-stacked-bar-chart-example"
            xType="ordinal"
            stackBy="y"
            width={ancho ? ancho : 300}
            height={alto ? alto : 300}
            >
            <DiscreteColorLegend
                style={{position: 'absolute', left: '50px', top: '-50px'}}
                orientation="horizontal"
                items={data.leyenda ? data.leyenda : []}
            />

            {data?.productos?.length > 0 && data.productos.map((i, key) =>{
                    return <DiscreteColorLegend key={key}
                                style={{position: 'absolute', left: '100%', top: `${key*top - top}px`}}
                                orientation="horizontal"
                                items={[{title: i, color: 'white'}]}
                            />
                    })
            }

            
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries
                cluster="grupo1"
                color="#12939A"
                data={data.vendidos}
            />
            <VerticalBarSeries
                cluster="grupo2"
                color="#79C7E3"
                data={data.stock}
            />
            
        </XYPlot>

    )
}