import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { types} from '../../../redux/Alert/types'

export const Alerta = () => {
    const tipo = useSelector(state => state.AlertaReducer.tipo)
    const mensaje = useSelector(state => state.AlertaReducer.mensaje)
    const show = useSelector(state => state.AlertaReducer.show)
    const dispatch = useDispatch()

    useEffect(()=>{
    
    },[show])

    const closeAlert = () => {
        dispatch({type: types.OCULTAR_ALERTA})
    }

    return (
        <div>
        { show && 
            <Alert variant={tipo} onClose={() => closeAlert()} dismissible>
                {mensaje}
            </Alert>
        }
        </div>
    )
}