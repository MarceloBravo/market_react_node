import { LineCartComponent } from './content'


export const LineChart = (props) => {
    const { 
        data, 
        labelXParseTo 
    } = props
    const top = 60


    const formatXAxis = (v) => {
        switch(labelXParseTo){
            case 'date':
            case 'fecha':
                let fecha = new Date(v)
                let dia = fecha.getDate()
                let mes = fecha.getMonth()+1
                let anio = fecha.getFullYear()
                return `${dia < 10 ? '0' + dia : dia}-${mes < 10 ? '0' + mes : mes}-${anio}`
            case 'money':
            case 'currency':
            case 'pesos':
                return "$ " + (new Intl.NumberFormat("de-DE").format(v)).toString()
            case 'number':
            case 'numero':
            case 'número':
                return new Intl.NumberFormat("de-DE").format(v)
            default:
                return v
        }
    }

    return (
        <LineCartComponent data={data} top={top} formatXAxis={formatXAxis}/>
    )
}