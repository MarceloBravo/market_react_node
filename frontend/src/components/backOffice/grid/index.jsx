import React, { useEffect, useState } from 'react'
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
        data, 
        headers, 
        actionColumn, 
        title, 
        editableColumns,
        numericColumns,
        imageColumns,
        visibleFields, 
        urlToForm, 
        onClickDelete, 
        onChangeFilter, 
        urlPantalla, 
        totRows, 
        rowsPerPage, 
        page, 
        showNewButton, 
        showFindTextBox,
        showEditButton,
        showDeleteButton,
        changeGridColumn,
        checkPermisos,  //Determina si se deben verificr los permisos del usuario, por defecto el valor es undefined, si el valor es undefined o true se verificarán los permisos del usuario  
        editByColumn, //Editar por (nombre de la columna por la cual efectuar la búsqueda del registro a editar)
} = props
    const permisos = useSelector(state => state.PermisosReducer.aplicar_permisos)
    const logedUser = useSelector(state => state.LoginReducer.logedUser)
    const [widthColumn, setWidthColumn] = useState(0)
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const [ datos, setDatos ] = useState(data)


    useEffect(() => {
        setWidthColumn(100/(headers.length+(actionColumn ? 1 : 0)))
    }, [headers, setWidthColumn, actionColumn])


    useEffect(()=>{
        if(checkPermisos === undefined || checkPermisos === true){    
            if(logedUser.roles){
                let roles = logedUser ? logedUser.roles.map(r => r.id) : []
                dispatch(aplicarPermisos(roles, location.pathname.split("/")[1]))
            }else{
                history.push('/home')
            }
        }
    },[logedUser, urlPantalla, location, history, dispatch, checkPermisos])


    useEffect(()=>{
        console.log('DATA',data)
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
        />
    )
}