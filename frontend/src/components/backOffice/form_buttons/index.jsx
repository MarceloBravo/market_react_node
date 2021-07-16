import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { aplicarPermisos } from '../../../actions/permisos'
import { useLocation } from 'react-router-dom'
import { types } from '../../../redux/Alert/types'
import './style.css'

export const FormButtons = (props) => {
    const { grabar, eliminar, handlerBtnCancelar, errors, id, ocultarCancelar, textoGrabar } = props
    const user = useSelector(state => state.LoginReducer.logedUser)
    const permisos = useSelector(state => state.PermisosReducer.aplicar_permisos)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(()=>{
        dispatch(aplicarPermisos(user ? user.roles.map(r => r.id) : [], location.pathname.split("/")[1]))
    },[dispatch, user, location])

    // eslint-disable-next-line
    const clearMessages = () => {
        dispatch({type: types.OCULTAR_ALERTA})
    }

    return (
        <div className="btn-group">
            {permisos && (permisos.crear === 1 || (permisos.modificar === 1 && id !== null)) && <Button variant="success" onClick={grabar} disabled={Object.keys(errors).filter(e => (errors[e]!== null && errors[e] !== "")).length>0}>{textoGrabar ? textoGrabar : 'Grabar'}</Button>}
            {permisos && permisos.eliminar === 1 && <Button variant="danger" onClick={eliminar} disabled={!id}>Eliminar</Button>}
            {!ocultarCancelar && <Button variant="primary" onClick={handlerBtnCancelar}>Cancelar</Button>}
        </div>
    )
}