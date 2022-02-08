import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Menu } from '../../../../components/backOffice/menu'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Header } from '../../../../components/backOffice/header'
import { Alerta } from '../../../../components/shared/alerts'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { Form, Row, Col } from 'react-bootstrap'

export const TallasContent = (props) => {
    const {
        response,
        togleMenu,
        pantalla,
        talla,
        handlerChangeValue,
        errors,
        categorias,
        subCategorias,
        grabar,
        eliminar,
        cancelar,
        id
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
                            <Form.Label column sm="2">Talla</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="talla"
                                    placeholder="Número o valor"
                                    value={talla.talla}
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
                            <Col md="4">
                                <Form.Control
                                    as="select"
                                    name="categoria_id"
                                    value={talla.categoria_id}
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
                        
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Sub Categoría</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    as="select"
                                    name="sub_categorias"
                                    multiple
                                    value={talla.sub_categorias}
                                    onChange={e => handlerChangeValue(e)}
                                >
                                    {subCategorias.length === 0 && <option>-- No se han encontrado sub categorías --</option>}
                                    { subCategorias.map((c, key) => {
                                        return <option key={key} value={c.id}>{c.nombre}</option>
                                        })
                                    }
                                </Form.Control>
                            </Col>
                            
                        </Form.Group>
                        {errors.categoria_id &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.sub_categorias}</Form.Text>
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