import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TableGrid } from './content'
import { types } from '../../../redux/Alert/types'
import './style.css'
import { aplicarPermisos } from '../../../actions/permisos'

export const Grid = (props) => {
    const { 
        data, 
        headers, 
        actionColumn, 
        title, 
        editableColumns,
        visibleFields, 
        urlToForm, 
        onClickDelete, 
        onChangeFilter, 
        urlPantalla, 
        totRows, 
        rowsPerPage, 
        page, 
        showNewButton, 
        showFindText,
        showEditButton,
        showDeleteButton
} = props
    const permisos = useSelector(state => state.PermisosReducer.aplicar_permisos)
    const logedUser = useSelector(state => state.LoginReducer.logedUser)
    const [widthColumn, setWidthColumn] = useState(0)
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const [ datos, setDatos ] = useState(data)

    console.log('---- data ----', data)

    useEffect(() => {
        setWidthColumn(100/(headers.length+(actionColumn ? 1 : 0)))
    }, [headers, setWidthColumn, actionColumn])


    useEffect(()=>{
        if(logedUser.roles){
            let roles = logedUser ? logedUser.roles.map(r => r.id) : []
            dispatch(aplicarPermisos(roles, location.pathname.split("/")[1]))
        }else{
            history.push('/home')
        }
    },[logedUser, urlPantalla, location, history, dispatch])


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
            showFindText={showFindText !== undefined ? showFindText : true}
            showEditButton={showEditButton}
            showDeleteButton={showDeleteButton}
            handlerEditableColum={handlerEditableColum}
            editableColumns={editableColumns && Array.isArray(editableColumns) ? editableColumns : []}
        />
    )
}