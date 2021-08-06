import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { GridCardContent } from './content'
import './style.css'

export const GridCardComponent = (props) => {
    const { 
        title,              //(Opcional) Título a mostrar sobre la grilla
        showFindTextBox,    //(Opcional) Booleano que determina si se muestra el cuadro de texto para la búsqueda o no
        itemsPerPage,       //(Opcional) Por defecto tomará el valor de 12
        itemsPerPageOnChange,//(Obligatorio) Función manejadora para el botón nuevo
        handlerFilter,      //(Obligatorio) Función manejadora de la búsqueda
        data,               //(Obligatorio) Array que contiene los objetos con los datos a mostrar, cada objeto debe tener las propiedades, imagen, titulo, texto, texto_footer
        ocultarOrdenarPor,
        ocultarItemsPorPagina,
        orderBy,
        orderByOnChange,
        initialValues
     } = props
        const [ itemsPorPagina, setItemsPorPagina ] = useState(0)
        // eslint-disable-next-line
        const [ arrOptions, setArrOptions ] = useState([12, 24, 36, 48, 60])
        const history = useHistory()

        useEffect(()=>{
            initialValues(arrOptions[0], 1)
            // eslint-disable-next-line
        },[])

     useEffect(()=>{
         // eslint-disable-next-line
         if(arrOptions.find(i => i == itemsPerPage)){
            setItemsPorPagina(itemsPerPage)
         }else{
            setItemsPorPagina(10)
         }
     },[arrOptions, itemsPerPage, itemsPorPagina])

     
     const detalleProducto = (id) => {
        history.push('/detalleProducto/'+id)
     }

     
    return (
        <GridCardContent 
            title={title} 
            ocultarItemsPorPagina={ocultarItemsPorPagina} 
            itemsPerPage={itemsPerPage} 
            itemsPerPageOnChange={itemsPerPageOnChange} 
            arrOptions={arrOptions} 
            ocultarOrdenarPor={ocultarOrdenarPor}
            orderBy={orderBy} 
            orderByOnChange={orderByOnChange}
            showFindTextBox={showFindTextBox} 
            handlerFilter={handlerFilter}
            data={data}
            detalleProducto={detalleProducto}
        />       
    )
}