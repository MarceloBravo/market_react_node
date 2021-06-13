import React from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { Menu } from '../../../../components/backOffice/menu'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Alerta } from '../../../../components/shared/alerts';

export const PermisosContent = (props) => {
    const {
        response, 
        mostrarOcultarModal,
        roles,
        handlerChangeRoles,
        handlerChanges,
        errors,
        permisos,
        grabar,
        cancelar
    } = props

    return (
        <>
            <ModalDialog response={response} toggle={mostrarOcultarModal}/>
            <Header />
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="1"/>
                </div>
                <div className="content-section">   
                    <Alerta/>                 
                    <Form>
                        <div className="div-title">Mantenedor de Permisos</div>

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Rol</Form.Label>
                            <Col md="6">
                                <Form.Control 
                                    as="select"
                                    name="roles_id" 
                                    value={roles.id}
                                    onChange={e => handlerChangeRoles(e)}
                                >
                                    {roles.length === 0 && <option key="-1" value="">-- No se han encontrado roles --</option> }
                                    {roles.length > 0 && <option key="-1" value="">-- Selecciona un rol --</option> }
                                    {roles.map((r,key) => {
                                        return  <option key={key} value={r.id}>{r.name}</option>
                                    }
                                    )}
                                </Form.Control>
                            </Col>
                            
                        </Form.Group>
                        {errors.roles &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.roles }</Form.Text>
                            </Form.Group>
                        }
                        
                        <div>
                        {
                            permisos.length > 0 && 
                            <div className="divPermisos">
                                <div className="itemPermisos">
                                    <label className="lbl-head-column">Pantalla</label>
                                    <label className="lbl-head-column">crear</label>
                                    <label className="lbl-head-column">Editar</label>
                                    <label className="lbl-head-column">Eliminar</label>
                                </div>
                                {permisos.length > 1 && 
                                    <div className="itemPermisos">
                                        <label className="lbl-head-column">Pantalla</label>
                                        <label className="lbl-head-column">crear</label>
                                        <label className="lbl-head-column">Editar</label>
                                        <label className="lbl-head-column">Eliminar</label>
                                    </div>
                                }
                            </div>
                        }
                        {
                            permisos.map((p, key) => {
                                return <div key={key} className="itemPermisos">
                                            <Form.Group key={`${key}-pantalla`} controlId={`${key}-acceder`}>
                                                <Form.Check key={`${key}-chk-pantalla`} type="checkbox" label={p.pantalla} checked={p.acceder} onChange={(e) => handlerChanges(e)}/>
                                            </Form.Group>
                                            <Form.Group key={`${key}-crear`} controlId={`${key}-crear`}>
                                                {p.permite_crear === 1 && <Form.Check key={`${key}-chk-crear`} type="checkbox" checked={p.crear} onChange={(e) => handlerChanges(e)}/>}
                                            </Form.Group>
                                            <Form.Group key={`${key}-modificar`} controlId={`${key}-modificar`}>
                                                {p.permite_modificar === 1 && <Form.Check key={`${key}-chk-modificar`} type="checkbox" checked={p.modificar} onChange={(e) => handlerChanges(e)}/>}
                                            </Form.Group>
                                            <Form.Group key={`${key}-eliminar`} controlId={`${key}-eliminar`}>
                                                {p.permite_eliminar === 1 && <Form.Check key={`${key}-chk-eliminar`} type="checkbox" checked={p.eliminar} onChange={(e) => handlerChanges(e)}/>}
                                            </Form.Group>
                                        </div>
                            })
                        }
                        </div>

                        <div className="btn-group">
                            <Button variant="success" onClick={grabar} disabled={Object.keys(errors).filter(e => errors[e]!== '').length>0}>Grabar</Button>
                            <Button variant="info" onClick={cancelar}>Cancelar</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}