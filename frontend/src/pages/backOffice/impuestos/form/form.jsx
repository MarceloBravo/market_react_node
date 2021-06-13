import React, { useState, useEffect } from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { Form, Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { types as ModalTypes } from '../../../../redux/ModalDialog/types'
import { find, insert, update, deleteReg } from '../../../../actions/impuestos'
import { Alerta } from '../../../../components/shared/alerts'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'

export const ImpuestosForm = (props) => {
    const { id } = useParams()
    const data = useSelector(state => state.ImpuestosReducer.impuesto)
    const ok = useSelector(state => state.AlertaReducer.tipo) 
    const [ impuesto, setImpuesto ] = useState({nombre:'', sigla:'', porcentaje: '', created_at: '', updated_at: '', deleted_at:''})
    const [ errors, setErrors ] = useState({nombre:'', sigla:'', porcentaje: ''})
    const [ accion, setAccion ] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory()

    
    useEffect(()=>{
        if(id){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(find(id))
        }
    },[id, dispatch])


    useEffect(()=> {
        if(data){
            setImpuesto(data)
        }
    },[data])


    useEffect(()=>{
        if(ok === 'success'){
            history.push('/impuestos')
        }
    },[ok,history])
    

    const response = e => {
        if(e){
            if(id){
                if(accion === 'eliminar'){
                    eliminarReg()
                }else{
                    actualizar()
                }
            }else{
                insertar()
            }
        }
    }


    const handlerChangeValue = (e) => {
        validaDatos(e.target.name, e.target.value)
        setImpuesto({...impuesto, [e.target.name]: e.target.value})
    }



    const grabar = (e) => {
        let errs = Object.keys(impuesto).map(f => validaDatos(f, impuesto[f])).filter(e => e === false).length > 0
        
        if(!errs){
            setAccion('grabar')
            dispatch({type: ModalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea grabar el registro?', tipo: 'Grabar'}})
        }
    }

    const eliminar = (e) => {
        setAccion('eliminar')
        dispatch({type: ModalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea grabar el eliminar?', tipo: 'Eliminar'}})
    }

    const handlerBtnCancelar = (e) => {
        history.push('/impuestos')
    }

    const insertar = () => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(insert(impuesto))
    }

    const actualizar = () => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(update(id, impuesto))
    }

    const eliminarReg = () => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(deleteReg(id))
    }


    const validaDatos = (field, value) => {
        let res = false
        switch(field){
            case 'nombre':
                if(value.length === 0){
                    setErrors({...errors, [field]: 'El nombre del impuesto es obligatorio.'})
                }else if(value.length < 3){
                    setErrors({...errors, [field]: 'El nombre debe tener un mínimo de 3 carácteres. Ingresa un nombre más largo.'})
                }else if(value.length > 100){
                    setErrors({...errors, [field]: 'El nombre debe tener hasta 100 carácteres. Ingresa un nombre más corto.'})
                }else{
                    setErrors({...errors, [field]:''})
                    res = true
                }
                break;
            case 'sigla':
                if(value.length === 0){
                    setErrors({...errors, [field]: 'La sigla del impuesto es obligatoria.'})
                }else if(value.length < 3){
                    setErrors({...errors, [field]: 'La sigla debe tener un mínimo de 3 carácteres. Ingresa una sigla más larga.'})
                }else if(value.length > 15){
                    setErrors({...errors, [field]: 'La sigla debe tener hasta 15 carácteres. Ingresa una sigla más corta.'})
                }else{
                    setErrors({...errors, [field]:''})
                    res = true
                }
                break;
            case 'porcentaje':
                if(value.length === 0){
                    setErrors({...errors, [field]: 'El porcentaje de impuesto es obligatorio.'})
                }else if(isNaN(value)){
                    setErrors({...errors, [field]: 'El porcentaje de impuesto debe ser un número.'})
                }else if(value < 0){
                    setErrors({...errors, [field]: 'El porcentaje de impuesto debe ser un valor positivo.'})
                }else{
                    setErrors({...errors, [field]:''})
                    res = true
                }
                break;
            default:
                setErrors({...errors, [field]: ''})
                res = true
        }
        return res
    }

    
    return (
        <div>
            <ModalDialog response={response} />
            <Header />      
            <SpinnerComponent /> 
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="1"/>
                </div>
                <div className="content-section">
                    <Alerta />
                    <Form>
                        <div className="div-title">Mantenedor de Impuestos</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre del impuesto"
                                    value={impuesto.nombre}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.nombre &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.nombre}</Form.Text>
                            </Form.Group>
                        }


                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Sigla</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="sigla"
                                    placeholder="Sigla"
                                    value={impuesto.sigla}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.sigla &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.sigla}</Form.Text>
                            </Form.Group>
                        }

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Porcentaje</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="porcentaje"
                                    placeholder="Porcentaje de Impuesto"
                                    value={impuesto.porcentaje}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.porcentaje &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.porcentaje }</Form.Text>
                            </Form.Group>
                        }

                        <FormButtons 
                            grabar={grabar} 
                            eliminar={eliminar} 
                            handlerBtnCancelar={handlerBtnCancelar} 
                            errors={errors} 
                            id={id}
                        />
                    </Form>
                </div>
            </div>
        </div>
    )
}
