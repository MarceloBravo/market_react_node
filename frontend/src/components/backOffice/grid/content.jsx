import React from 'react'
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap'

export const TableGrid = (props) => {
    const {
        title,
        handlerBtnNuevo,
        handlerFilter,
        headers,
        widthColumn,
        actionColumn,
        data,
        visibleFields,
        formatDate,
        handlerEdit,
        handlerDelete,
        permisos,
    } = props

    
    return (
        <div>
            <div className="div-title">{title}</div>
            <Container className="top-grid-form">
                <Row>
                    <Col className="align-left">
                        {permisos && permisos.crear === 1 && <Button variant="primary" onClick={handlerBtnNuevo }>Nuevo</Button>}
                    </Col>
                    <Col className="align-right">
                        <Form.Control type="text" placeholder="Ingresa el texto a buscar..." onBlur={e => handlerFilter(e)}/>
                    </Col>
                </Row>
            </Container>
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        {headers.map((value, index) => {
                            return (widthColumn > 0 ?
                                (
                                    (index === 0) ?
                                    <th key={index}>{value}</th> :
                                    <th key={index} style={{ width: + widthColumn + '%' }}>{value}</th>
                                )
                                :
                                <th key={index}>{value}</th>
                            )
                        })}
                        {actionColumn && permisos && (permisos.modificar === 1 || permisos.eliminar === 1) && <th className="col-action">Acción</th>}
                    </tr>
                </thead>
                <tbody>
                    {data && data.data.map((value, key) => {
                        return <tr key={ key}>
                            {visibleFields.map((val, id) => {
                                return <td key={key+'-'+id}>{ formatDate(value[val])}</td>
                            })}
                            {actionColumn && permisos && (permisos.modificar === 1 || permisos.eliminar === 1) &&
                                <td>
                                {permisos.modificar === 1 && <i className="bi bi-pencil action-button" title="Editar" onClick={() => handlerEdit(value['id'])}></i>}
                                {permisos.eliminar === 1 && <i className="bi bi-trash action-button" title="Eliminar" onClick={() => handlerDelete(value['id'])}></i>}
                                </td>
                            }
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    )
}