import React, { useState, useEffect } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { ModalDialog } from '../../../components/backOffice/modalDialog' 
import { Header } from '../../../components/backOffice/header'
import { SpinnerComponent } from '../../../components/shared/spinner'
import { Menu } from '../../../components/backOffice/menu'
import { Alerta } from '../../../components/shared/alerts'
import { types as modalDialogTypes } from '../../../redux/ModalDialog/types'
import { FormButtons } from '../../../components/backOffice/form_buttons'
import { useSelector, useDispatch } from 'react-redux'
import { isEmail } from '../../../shared/funciones'
import { getData, save } from '../../../actions/tiendaInfo'
import { useHistory } from 'react-router-dom'

export const InfoTiendaFormComponent = () => {
    const id = 1
    const [ infoTienda, setInfoTienda ] = useState({nombre_tienda: '', fono_venta: '', email: '', direccion:'', comuna:'', ciudad: ''})
    const [ errors, setErrors ] = useState({nombre_tienda: '', fono_venta: '', email: '', direccion:'', comuna:'', ciudad: ''})
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(() => {
        dispatch(getData())
    },[dispatch])


    useEffect(()=>{
        if(infoTiendaState){
            setInfoTienda(infoTiendaState)
            console.log(infoTiendaState)
        }
    },[infoTiendaState])


    const response = (res) => {
        if(res){
            dispatch(save(infoTienda))
        }
    }


    const handlerChangeValue = (e) => {
        validaDatos(e.target.name, e.target.value)
        setInfoTienda({
            ...infoTiendaState,
            [e.target.name]: e.target.value
        })
    }


    const grabar = () => {
        dispatch({type: modalDialogTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Deseas actualizar los datos?', titulo: 'Actualizar datos tienda'}})
    }


    const handlerBtnCancelar = () => {
        history.push('/home')
    }


    const validaDatos = (field, value) => {
        let res = false;
        switch(field){
            case 'nombre_tienda':
                if(value.length === 0){
                    setErrors({...errors, [field]: 'Debe ingresar el nombre de la tienda.'})
                }else if(value.length < 3){
                    setErrors({...errors, [field]: 'El nombre de la tienda debe tener almenos 3 carácteres. Ingresa un nombre más largo.'})
                }else if(value.length > 100){
                    setErrors({...errors, [field]: 'El nombre de la tienda debe tener hasta 100 carácteres. Ingresa un nombre más corto.'})
                }else{
                    setErrors({...errors, [field]:''})
                    res = true
                }
                break;
            case 'fono_venta':
                if(value.length === 0){
                    setErrors({...errors, [field]: 'Debe ingresar el teléfono de venta de la tienda.'})
                }else if(value.length < 6){
                    setErrors({...errors, [field]: 'El teléfono debe tener almenos 6 carácteres. Ingresa un fono más largo.'})
                }else if(value.length > 30){
                    setErrors({...errors, [field]: 'El teléfono debe tener hasta 30 carácteres. Ingresa un fono más corto.'})
                }else{
                    setErrors({...errors, [field]:''})
                    res = true
                }
                break;
            case 'email':
                if(value.length === 0){
                    setErrors({...errors, [field]: 'Debe ingresar el email de contacto.'})
                }else if(!isEmail(value)){
                    setErrors({...errors, [field]: 'El email ingresado no es válido.'})
                }else if(value.length > 150){
                    setErrors({...errors, [field]: 'El email debe tener hasta 150 carácteres. Ingresa un email más corto.'})
                }else{
                    setErrors({...errors, [field]:''})
                    res = true
                }
                break;
            case 'direccion':
                if(value.length === 0){
                    setErrors({...errors, [field]: 'Debe ingresar una dirección para la tienda.'})
                }else if(value.length < 6){
                    setErrors({...errors, [field]: 'La dirección debe tener almenos 10 carácteres. Ingresa una dirección más larga.'})
                }else if(value.length > 150){
                    setErrors({...errors, [field]: 'La dirección debe tener hasta 255 carácteres. Ingresa una dirección más corta.'})
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
        <>
            <ModalDialog response={response}/>
            <Header />
            <SpinnerComponent />

            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="1"/>
                </div>
                <div className="content-section">                    
                    <Alerta />
                    <Form>
                        <div className="div-title">Información de la tienda</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre de la tienda</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre_tienda"
                                    placeholder="Nombre de la tienda"
                                    value={infoTienda.nombre_tienda}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.nombre_tienda &&
                            <Form.Group as={Row}>
                                <Form.Text className="field-error offset-2">{ errors.nombre_tienda}</Form.Text>
                            </Form.Group>
                        }


                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Fono venta</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="fono_venta"
                                    placeholder="Fono venta (Ej. +56 1 987654321)"
                                    value={infoTienda.fono_venta}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.fono_venta &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.fono_venta}</Form.Text>
                            </Form.Group>
                        }


                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Email</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="email"
                                    placeholder="Email de contacto"
                                    value={infoTienda.email}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.email &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.email}</Form.Text>
                            </Form.Group>
                        }


                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Dirección</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="direccion"
                                    placeholder="Dirección Casa Matriz"
                                    value={infoTienda.direccion}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.direccion &&
                            <Form.Group as={Row}>
                                <Form.Text className="field-error offset-2">{ errors.direccion}</Form.Text>
                            </Form.Group>
                        }

                        <FormButtons
                            grabar={grabar} 
                            handlerBtnCancelar={handlerBtnCancelar}
                            errors={errors} 
                            id={id} 
                        />

                    </Form>
                </div>
            </div>
        </>
    )
}