import React, { useState, useEffect } from 'react'
import { Menu } from '../../../../components/backOffice/menu'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Header } from '../../../../components/backOffice/header'
import { Alerta } from '../../../../components/shared/alerts'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { Form, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch  } from 'react-redux'

export const CiudadesGrid = (props) => {
    const [ id, setId ] = useState(null)
    const [ ciudad, setCiudad ] = useState({id: '', cod_region:'', cod_comuna: '', cod_provincia: '', nombre: ''})
    const [ errors, setErrors ] = useState({cod_region:'', cod_comuna: '', cod_provincia: '', nombre: ''})
    const togleMenu = useSelector(state => state.MenusReducer.togleMenu)
    const dispatch = useDispatch()

    const response = e => {

    }


    const handlerChangeValue = e => {

    }

    const btnGrabar = (e) => {

    }


    const btnEliminar = (e) => {

    }

    
    const btnCancelar = (e) => {

    }


    return (
        <div>
            <Menu activeKeyMenu="19"/>
            <ModalDialog response={response} />
            <SpinnerComponent /> 
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                <Header />
                <div className="content-section">
                    <Alerta />
                    <Form>
                        <div className="div-title">Mantenedor de {ciudad.nombre}</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre de la ciudad"
                                    value={ciudad.nombre}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.nombre &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.nombre}</Form.Text>
                            </Form.Group>
                        }

                        <FormButtons 
                            grabar={btnGrabar} 
                            eliminar={btnEliminar} 
                            handlerBtnCancelar={btnCancelar} 
                            errors={errors} 
                            id={id}
                        />
                    </Form>
                </div>
            </div>
        </div>
    )

}