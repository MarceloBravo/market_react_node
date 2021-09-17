import React from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, DiscreteColorLegend, HorizontalBarSeries } from 'react-vis';

export const HorizontalBarChart = (props) => {
    const { data } = props  //Ej.: [{value: 10, label: 'texto item 1'}, {value: 20, label: 'texto item 2'}]
    const top = data?.length > 0 ? 260 / data.length :26
    const datos =
        data.map((i, key) => {
            return data.map((e, k) => {return k === key ? {y: k+1, x: i.value} : {y: k+1, x: 0}})
          })
          

    return (
        
        <XYPlot width={300} height={300} stackBy="x">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            
            {data && data.length > 0 && data.reverse().map((i, key) =>{
                return <DiscreteColorLegend key={`lbl-${key}`}
                            style={{position: 'absolute', left: '95%', top: `${top*key }px`}}
                            orientation="horizontal"
                            items={[{title: i.value + ' ' + i.label ,color: 'white'}]}
                        />
            })}
            
            {datos && datos.length > 0 && datos.map((i, key) => {
              return <HorizontalBarSeries key={`bar-${key}`} data={i} />
            })}
        </XYPlot>
        /*
        <XYPlot width={300} height={300} stackBy="x">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <DiscreteColorLegend
                style={{position: 'absolute', left: '100%', top: '5px'}}
                orientation="horizontal"
                items={[{title: 'Producto 1',color: 'white'}]}
            />
            <DiscreteColorLegend
                style={{position: 'absolute', left: '100%', top: '50px'}}
                orientation="horizontal"
                items={[{title: 'Producto 2',color: 'white'}]}
            />
            <DiscreteColorLegend
                style={{position: 'absolute', left: '100%', top: '95px'}}
                orientation="horizontal"
                items={[{title: 'Producto 3',color: 'white'}]}
            />
            <DiscreteColorLegend
                style={{position: 'absolute', left: '100%', top: '140px'}}
                orientation="horizontal"
                items={[{title: 'Producto 4',color: 'white'}]}
            />
            <DiscreteColorLegend
                style={{position: 'absolute', left: '100%', top: '185px'}}
                orientation="horizontal"
                items={[{title: 'Producto 5',color: 'white'}]}
            />
            <HorizontalBarSeries data={[{y: 1, x: 0}, {y: 2, x: 0}, {y: 3, x: 0}, {y: 4, x: 0}, {y: 5, x: 11}]} />
            <HorizontalBarSeries data={[{y: 1, x: 0}, {y: 2, x: 0}, {y: 3, x: 0}, {y: 4, x: 9}, {y: 5, x: 0}]} />
            <HorizontalBarSeries data={[{y: 1, x: 0}, {y: 2, x: 0}, {y: 3, x: 6}, {y: 4, x: 0}, {y: 5, x: 0}]} />
            <HorizontalBarSeries data={[{y: 1, x: 0}, {y: 2, x: 10}, {y: 3, x: 0}, {y: 4, x: 0}, {y: 5, x: 0}]} />
            <HorizontalBarSeries data={[{y: 1, x: 3}, {y: 2, x: 0}, {y: 3, x: 0}, {y: 4, x: 0}, {y: 5, x: 0}]} />
        </XYPlot>
        */
    )
}