import React, { useEffect } from 'react'
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
        showFindTextBox,
        showDeleteButton,
        showEditButton,
        handlerEditableColum,
        editableColumns,
        dateColumns,
        numericColumns,
        imageColumns,
        editByColumn,
        disabledTextControl,
        toDate,
        handlerEditableDateColum,
        deleteCondition,
        updateCondition,
        onChangeColumn,
        onDoubleClickColumn,
        rowRef
    } = props


    useEffect(()=>{
        return clearRef(rowRef)
    // eslint-disable-next-line
    },[])

    
    return (
        <div>
            <div className="div-title">{title}</div>
            <Container className="top-grid-form">
                <Row>
                    <Col className="align-left">
                        {showNewButton && permisos && permisos.crear === 1 && <Button variant="primary" onClick={handlerBtnNuevo }>Nuevo</Button>}
                    </Col>
                    <Col className="align-right">
                        {showFindTextBox && <Form.Control disabled={disabledTextControl} type="text" placeholder="Ingresa el texto a buscar..." onBlur={e => handlerFilter(e)}/>}
                    </Col>
                </Row>
            </Container>
            <Table striped bordered hover size="sm" responsive className="custom-class-table">
                <thead>
                    <tr>
                        {headers.map((value, index) => {
                            return (widthColumn.length > 0 ?
                                (
                                    //(index === 0) ?
                                    //<th key={index} className={'col-'+value}>{value} aaa</th> :
                                    <th key={index} style={{ width: + widthColumn[index] + '%' }} className={'col-'+value}>{value} {widthColumn[index]}</th>
                                )
                                :
                                <th key={index} className={'col-'+value.toLowerCase()}>{value}</th>
                            )
                        })}
                        {(((showDeleteButton || showEditButton) && actionColumn) || (actionColumn && permisos && (permisos.modificar === 1 || permisos.eliminar === 1))) && <th className="col-action">Acción</th>}
                    </tr>
                </thead>
                <tbody>
                    {data && data.data?.map((value, key) => {
                        return <tr key={ key} className={`row-${value.id}`} ref={ref => [...rowRef.current, ref]}>
                            {visibleFields.map((val, id, columns) => {
                                return <td key={key+'-'+id} className={"col-"+columns[id]} onDoubleClick={() => onDoubleClickColumn(key, id, columns[id])}>
                                    
                                            {editableColumns.filter(i =>  i=== columns[id]).length > 0 &&
                                                <>

                                                {dateColumns && dateColumns.find(e => e === columns[id]) && 
                                                    <DatePicker 
                                                        selected={toDate(data.data[key][columns[id]])} 
                                                        onChange={e => handlerEditableDateColum(key, columns[id], e) || onChangeColumn ? onChangeColumn(key, id, columns[id], e) : true}
                                                        dateFormat="dd/MM/yyyy"
                                                        className={"grid-text-column class-"+columns[id]}
                                                    />
                                                }
                                                
                                                {(!dateColumns || !dateColumns.find(e => e === columns[id])) && 
                                                    <Form.Control 
                                                        type={numericColumns.find(e => e === columns[id]) ? 'number' : 'text'}
                                                        name={columns[id]+'-'+key}
                                                        value={ data.data[key][columns[id]] ? data.data[key][columns[id]] : '' }
                                                        onChange={e => handlerEditableColum(key, columns[id], e) || onChangeColumn ? onChangeColumn(key, id, columns[id], e.target.value) : true}
                                                        className={"grid-text-column class-"+columns[id]}
                                                    />
                                                }
                                                </>
                                            }
                                            
                                            {imageColumns.find(i => i === columns[id]) && 
                                                <img src={data.data[key][columns[id]]} alt="Foto no encontrada" className={"class-"+columns[id]}/>
                                            }
                                            
                                            {!imageColumns.find(i => i === columns[id]) && (Array.isArray(editableColumns) && editableColumns.filter(i =>  i=== columns[id]).length === 0) && 
                                                (Array.isArray(value[val]) ? value[val].length :  formatDate(value[val]))
                                            }


                                        </td>
                            })}
                            {(((showDeleteButton || showEditButton) && actionColumn) || (actionColumn && permisos && (permisos.modificar === 1 || permisos.eliminar === 1))) &&
                                <td className="col-action">
                                {
                                    ((showEditButton === undefined && permisos) ? permisos.modificar === 1 : showEditButton) && (updateCondition !== undefined ? updateCondition : true) && 
                                    <i 
                                        className="bi bi-pencil action-button" 
                                        title="Editar" 
                                        onClick={() => handlerEdit(value[editByColumn])}>
                                    </i>
                                }
                                {
                                    ((showDeleteButton === undefined && permisos) ? permisos.eliminar === 1 : showDeleteButton) && (deleteCondition !== undefined ? deleteCondition(value) : true) &&  
                                    <i 
                                        className="bi bi-trash action-button" 
                                        title="Eliminar" 
                                        onClick={() => handlerDelete(value[editByColumn])}>
                                    </i>
                                }
                                </td>
                            }
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    )
}

const clearRef = (rowRef) => {
    rowRef.current = []
}