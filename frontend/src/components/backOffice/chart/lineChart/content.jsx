import React from 'react'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries, DiscreteColorLegend } from 'react-vis';

export const LineCartComponent = (props) => {
    const { data, top, formatXAxis } = props 

    return (
        <XYPlot
        width={400}
        height={300}>
        <HorizontalGridLines />
        {data && data?.config?.length > 0 && data.config.map((i, key) =>{
            return <DiscreteColorLegend key={`lbl-${key}`}
                        style={{position: 'absolute', left: '100%', top: `${top*key+top }px`}}
                        orientation="horizontal"
                        items={[{title: i.title ,color: i.color}]}
                    />
        })}
        {data && data?.datos?.length > 0 && data.datos.map((i, key) =>{
        return <LineMarkSeries key={key}
                    className="linemark-series-example"
                    style={{
                    strokeWidth: '2px',
                    
                    }}
                    curve={'curveMonotoneX'}
                    //lineStyle={{stroke: i[0].color}}
                    data={i}
                />
            })
        }
        
        <XAxis tickFormat={v => `${formatXAxis(v)}`} tickLabelAngle={-30} />
        <YAxis />
    </XYPlot>

    )
}