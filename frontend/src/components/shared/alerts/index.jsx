import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { types} from '../../../redux/Alert/types'

export const Alerta = (props) => {
    const { ocultarCerrar } = props
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
        { show && !ocultarCerrar && 
            <Alert variant={tipo} onClose={() => closeAlert()} dismissible>
                {mensaje}
            </Alert>
        }
        { show && ocultarCerrar === true && 
            <Alert variant={tipo} onClose={() => closeAlert()}>
                {mensaje}
            </Alert>
        }
        </div>
    )
}