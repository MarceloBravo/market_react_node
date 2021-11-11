import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { Form, Row, Col } from 'react-bootstrap'
import { Alerta } from '../../../../components/shared/alerts'

export const SubCategoriasContent = (props) => {
    const { 
        response, 
        pantalla, 
        sub_categoria, 
        handlerChangeValue, 
        errors, 
        categorias, 
        grabar, 
        eliminar, 
        cancelar, 
        id,
        togleMenu, 
    } = props

    return (
        <>
            <ModalDialog response={response}/>
            <Menu activeKeyMenu="19"/>
            <SpinnerComponent />
            <div className={"main-section " + (togleMenu ? 'main-width' : 'main-normal')}>
                <Header />
                <div className="content-section"> 
                    <Alerta />                   
                    <Form>
                        <div className="div-title">Mantenedor de {pantalla.nombre}</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre de la sub-categoría"
                                    value={sub_categoria.nombre}
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
                            <Form.Label column sm="2">Categoría</Form.Label>
                            <Col md="8">
                                <Form.Control
                                    as="select"
                                    name="categoria_id"
                                    value={sub_categoria.categoria_id}
                                    onChange={e => handlerChangeValue(e)}
                                >
                                    {categorias.length > 0 && <option>-- Seleccione --</option>}
                                    {categorias.length === 0 && <option>-- No se han encontrado categorías --</option>}
                                    { categorias.map((c, key) => {
                                        return <option key={key} value={c.id}>{c.nombre}</option>
                                        })
                                    }
                                </Form.Control>
                            </Col>
                            
                        </Form.Group>
                        {errors.categoria_id &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.categoria_id}</Form.Text>
                            </Form.Group>
                        }
                        <br/>
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