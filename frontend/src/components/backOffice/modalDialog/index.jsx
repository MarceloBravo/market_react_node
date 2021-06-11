import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { types } from '../../../redux/ModalDialog/types'
import './style.css'

export const ModalDialog = (props) => {
    const { textoBtnAceptar, textoBtnCancelar, response } = props //Se dee implementar la función response en el componente que implemente éste modal
    const { show, titulo, mensaje } = useSelector(state => state.ModalDialogReducer)
    const dispatch = useDispatch()

    const handlerBtnAceptar = () => {
        dispatch({ type: types.HIDE_MODAL_DIALOG, action: false})
        response(true)
    }

    const handlerClose = () => {
        dispatch({type: types.HIDE_MODAL_DIALOG, action: false})
        response(false)
    }
    
    return (
            <Modal show={show} onHide={handlerClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titulo ? titulo : 'Atención'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{mensaje ? mensaje : 'Selecciona'}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handlerClose}>
                        {textoBtnCancelar ? textoBtnCancelar : 'Cancelar'}
                    </Button>
                    <Button variant="primary" onClick={handlerBtnAceptar}>
                        {textoBtnAceptar ? textoBtnAceptar : 'Aceptar'}
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}