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
        showNewButton,
        showFindText,
        showDeleteButton,
        showEditButton,
        handlerEditableColum,
        editableColumns,
    } = props

    
    return (
        <div>
            <div className="div-title">{title}</div>
            <Container className="top-grid-form">
                <Row>
                    <Col className="align-left">
                        {showNewButton && permisos && permisos.crear === 1 && <Button variant="primary" onClick={handlerBtnNuevo }>Nuevo</Button>}
                    </Col>
                    <Col className="align-right">
                        {showFindText && <Form.Control type="text" placeholder="Ingresa el texto a buscar..." onBlur={e => handlerFilter(e)}/>}
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
                            {visibleFields.map((val, id, columns) => {
                                return <td key={key+'-'+id}>
                                    
                                            {editableColumns.filter(i =>  i=== columns[id]).length > 0 &&
                                                <Form.Control 
                                                    type="text"
                                                    name={columns[id]+'-'+key}
                                                    value={ data.data[key][columns[id]] }
                                                    onChange={e => handlerEditableColum(key, columns[id], e)}
                                                    className="grid-text-column"
                                                />
                                            }
                                            {(Array.isArray(editableColumns) && editableColumns.filter(i =>  i=== columns[id]).length === 0) && 
                                                formatDate(value[val])
                                            }
                                        </td>
                            })}
                            {actionColumn && permisos && (permisos.modificar === 1 || permisos.eliminar === 1) &&
                                <td>
                                {(showEditButton === undefined ? permisos.modificar === 1 : showEditButton) && <i className="bi bi-pencil action-button" title="Editar" onClick={() => handlerEdit(value['id'])}></i>}
                                {(showDeleteButton === undefined ? permisos.eliminar === 1 : showDeleteButton) && <i className="bi bi-trash action-button" title="Eliminar" onClick={() => handlerDelete(value['id'])}></i>}
                                </td>
                            }
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    )
}