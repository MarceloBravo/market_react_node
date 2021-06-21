import React, { useState, useEffect } from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { Form, Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { find, insert, update, deleteReg } from '../../../../actions/unidades'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { types as modalTypes } from '../../../../redux/ModalDialog/types'
import { findByUrl } from '../../../../actions/pantallas'
import { Alerta } from '../../../../components/shared/alerts'

export const UnidadesForm = () => {
    const { id } = useParams()
    const currentUrl = window.location.pathname.split('/')[1]
    const pantalla = useSelector(state => state.PantallasReducer.pantalla)
    const unidadState = useSelector(state => state.UnidadesReducer.unidad)
    const alertaTipo = useSelector(state => state.AlertaReducer.tipo)
    const [ unidad, setUnidad ] = useState({id: '', nombre: '', created_at: '', updated_at:'', deleted_at: ''})
    const [ errors, setErrors ] = useState({nombre: ''})
    const [ accion, setAccion ] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()


    useEffect(()=>{
        if(id){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(find(id))
        }
    },[dispatch, id])


    useEffect(()=>{
        if(unidadState){
            setUnidad(unidadState)
        }
    },[unidadState])


    useEffect(()=>{
        dispatch(findByUrl(currentUrl))
    },[dispatch, currentUrl])


    useEffect(()=>{
        if(alertaTipo === 'success'){
            history.push('/'+currentUrl)
        }
    },[alertaTipo, currentUrl, history])


    const response = (e) => {
        if(e){
            if(accion === 'grabar'){
                if(id){
                    dispatch(update(id, unidad))
                }else{
                    dispatch(insert(unidad))
                }
            }else{
                dispatch(deleteReg(id))
            }
        }
    }


    const handlerChangeValue = (e) => {
        validaDatos(e.target.value)
        setUnidad({
            ...unidad,
            [e.target.name]: e.target.value
        })

    }

    const grabar = (e) => {
        if(validaDatos(unidad.nombre)){
            setAccion('grabar')
            dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea grabar el registro?', tipo:'Grabar'}})
        }
    }


    const eliminar = (e) => {
        setAccion('eliminar')
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', tipo:'eliminar'}})
    }


    const cancelar = (e) => {
        history.push('/'+currentUrl)
    }


    const validaDatos = (valor) => {
        let res = false
        if(valor.length === 0){
            setErrors({...errors, nombre: 'Debe ingresar el nombre para la unidad de medida.'})
        }else if(valor.length < 3){
            setErrors({...errors, nombre: 'El nombre para la unidad de medida debe tener almenos 3 carácteres. Ingresa un nombre más largo.'})
        }else if(valor.length > 50){
            setErrors({...errors, nombre: 'El nombre para la unidad de medida debe tener de asta 50 carácteres. Ingresa un nombre más corto.'})
        }else{
            setErrors({...errors, nombre: ''})
            res = true
        }
        return res
    }


    return (
        <>
            <ModalDialog response={response} />
            <Header />
            <SpinnerComponent />
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="1"/>
                </div>
                <div className="content-section">                    
                    <Alerta/>
                    <Form>
                        <div className="div-title">Mantenedor de {pantalla.nombre}</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre de la unidad"
                                    value={unidad.nombre}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.nombre &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.nombre }</Form.Text>
                            </Form.Group>
                        }

                        <FormButtons 
                            grabar={grabar} 
                            eliminar={eliminar} 
                            handlerBtnCancelar={cancelar} 
                            errors={errors} 
                            id={id}
                        />
                    </Form>
                </div>
            </div>
        </>
    )
}