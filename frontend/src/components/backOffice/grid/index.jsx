import React, { useEffect, useState, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TableGrid } from './content'
import { types } from '../../../redux/Alert/types'
import './style.css'
import { aplicarPermisos } from '../../../actions/permisos'

export const Grid = (props) => {
    //Para forzar la aparición de la columna acción ahunque los permisos no estén otorgados 
    //para que aparezca, se deben recibir los parametros actionColumn como true y almenos uno 
    //de los parametros showEditButton o showDeleteButton, con el valor true
    const { 
        actionColumn,       //Booleano que determina si se mostrará (true, null o undefined) o no (false) la columna action
        arrWidthColumn,     //Ej.: [20, 15, 30, 25, 10] Obs.: Las cifras reprecentan al porcentaje al que se configurará el ancho de cada columna, si se ingresan menos números que columnas el resto de las columnas será configurado automáticamente. La suma debe ser igual a 100.
        changeGridColumn,
        checkPermisos,      //Booleano que determina si se deben verificar los permisos del usuario, por defecto el valor es undefined, si el valor es undefined o true se verificarán los permisos del usuario  
        data,               //OBLIGATORIO: objeto que contiene la grilla con los datos a mostrar    Ej.: {data: [datos...]} (Obs.: El objeto debe tener una propiedad con nombre data)
        dateColumns,        //Ej.: ['nombre_campo_fecha_1','nombre_campo_fecha_2','nombre_campo_fecha_3',...] Array que contiene los nombre de aquellas columnas editables que sólo aceptan datos de tipo fecha. Obs.: Los nombres de los campos deben estar listados en el array de capos editables (editableColumns) 
        deleteCondition,    //Función que ha de cumplirse para mostrar el icono eliminar en la columna acción de cada fila 
        disabledTextControl,
        editableColumns,    //Ej.: ['nombre_col_1','nombre_col_2','nombre_col_3','nombre_col_4']    Array que contiene el nombre de los campos que pueden ser editados directamente en la grilla
        editByColumn,       //Editar por (nombre de la columna por la cual efectuar la búsqueda del registro a editar)
        headers,            //OBLIGATORIO: array que contiene los nombres de las cabeceras de las columnas
        imageColumns,       //Array con las columnas en las que se mostrarán imágenes de imágen en lugar de texto o fecha
        numericColumns,     //Ej.: ['nombre_col_1','nombre_col_3',...]      Array que contiene el nombre de aquellas columnas editables que sólo permiten números. Obs.: El nombre de las columnas debe estar en el array de columnas editables (editableColumns)
        onClickDelete, 
        onChangeFilter, 
        onChangeColumn,     //Opcional: Función que será asociada al evento onChange de las celdas de las grillas editables
        onDoubleClickColumn, 
        page,               //Número de página que se está mostrando actualmente (Las páginas comienzan desde cero al igual que los arrays)
        rowsPerPage,        //Número que indica la cantidad de filas o registros que se mostrarán en cada página
        showNewButton, 
        showFindTextBox,
        showEditButton,
        showDeleteButton,
        title,              //Texto a mostrar sobre la grilla
        totRows,            //Cantidad total de registros existentes en la base de datos 
        urlToForm,          //URL que se utilizarán para los botones editar y el boton nuevo, donde redireccionar al presionar sobre ellos
        urlPantalla,        //Ruta actual en la que se encuentra el navegador, se utiliza para consultar los permisos
        updateCondition,    //Función que ha de cumplirse para mostrar el icono actualizar en la columna acción de cada fila 
        visibleFields,      //Array con el nombre de las columnas a mostrar
        arrRowRef
} = props
    const permisos = useSelector(state => state.PermisosReducer.aplicar_permisos)
    const logedUser = useSelector(state => state.LoginReducer.logedUser)
    const [widthColumn, setWidthColumn] = useState(arrWidthColumn ? arrWidthColumn : 0)
    const startDate = useState(new Date());
    const refRows = useRef([])
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const [ datos, setDatos ] = useState(data)

    useEffect(() => {
        if(!arrWidthColumn){
            setWidthColumn(100/(headers.length+(actionColumn ? 1 : 0)))
        }
        // eslint-disable-next-line
    }, [arrWidthColumn])


    useEffect(()=>{
        if(checkPermisos === undefined || checkPermisos === true){    
            if(logedUser.roles){
                let roles = logedUser ? logedUser.roles.map(r => r.id) : []
                dispatch(aplicarPermisos(roles, location.pathname.split("/")[1]))
            }else{
                history.push('/')
            }
        }
    },[logedUser, urlPantalla, location, history, dispatch, checkPermisos])


    useEffect(()=>{
        setDatos(data)
    },[data])


    const handlerDelete = (id) => {
        dispatch({type: types.OCULTAR_ALERTA})
        onClickDelete(id)
    }

    
    const handlerEdit = (id) => {
        dispatch({type: types.OCULTAR_ALERTA})
        history.push(`${urlToForm}/edit/${id}`)
    }


    const handlerFilter = (e) => {
        dispatch({type: types.OCULTAR_ALERTA})
        onChangeFilter(e.target.value)
    }

    const handlerKeyFilter = e => {
        if(e.keyCode === 13){
            handlerFilter(e)
        }
    }

    const handlerBtnNuevo = () => {
        dispatch({type: types.OCULTAR_ALERTA})
        history.push(`${urlToForm}/nuevo`)
    }


    const formatDate = (date) => {
        if (date && date !== null && date.toString().length >= 10 && (new Date(date)).toString() !== 'Invalid Date' && date.substr(0, 10).split('-').length === 3) {
            let fecha = date.substr(0, 10).split('-').reverse().join('-')
            return fecha
        }
        return date
    }
    

    const handlerEditableColum = (key, columna, e) => {
        let arrData = [...datos.data]
        arrData[key][columna] = e.target.value
        changeGridColumn(key, columna, e.target.value)
        setDatos({
            ...datos,
           data: arrData
        })
    }

    const handlerEditableDateColum = (key, columna, e) => {
        let arrData = [...datos.data]
        arrData[key][columna] = toDate(e)
        changeGridColumn(key, columna, e)
        setDatos({
            ...datos,
           data: arrData
        })
    }


    const toDate = (fecha) => {
        return fecha ? (new Date(`${fecha}`)) : null
    }


    return (
        <TableGrid
            title={title}
            handlerBtnNuevo={handlerBtnNuevo}
            handlerFilter={handlerFilter}
            headers={headers}
            widthColumn={widthColumn}
            actionColumn={actionColumn}
            data={datos}
            visibleFields={visibleFields}
            formatDate={formatDate}
            handlerEdit={handlerEdit}
            handlerDelete={handlerDelete}
            permisos={permisos}
            totRows={totRows}
            rowsPerPage={rowsPerPage}
            page={page}
            showNewButton={showNewButton !== undefined ? showNewButton : true}
            showFindTextBox={showFindTextBox !== undefined ? showFindTextBox : true}
            showEditButton={showEditButton}
            showDeleteButton={showDeleteButton}
            handlerEditableColum={handlerEditableColum}
            editableColumns={editableColumns && Array.isArray(editableColumns) ? editableColumns : []}
            numericColumns={numericColumns && Array.isArray(numericColumns) ? numericColumns : []}
            imageColumns={imageColumns && Array.isArray(imageColumns) ? imageColumns : []}
            editByColumn={editByColumn ? editByColumn : 'id'}
            dateColumns={dateColumns}
            defaultDate={startDate}
            toDate={toDate}
            handlerEditableDateColum={handlerEditableDateColum}
            deleteCondition={deleteCondition}
            updateCondition={updateCondition}
            onChangeColumn={onChangeColumn}
            onDoubleClickColumn={onDoubleClickColumn}
            disabledTextControl={disabledTextControl}
            rowRef={arrRowRef ? arrRowRef : refRows}
            handlerKeyFilter={handlerKeyFilter}
        />
    )
}