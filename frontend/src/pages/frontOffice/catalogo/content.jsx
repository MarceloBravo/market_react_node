import React from 'react'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { GridCardComponent } from '../../../components/frontOffice/gridCard/gridCard'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Paginacion } from '../../../components/backOffice/paginacion'
//yarn add rc-range
//Documentación react-range 
//https://github.com/react-component/slider
//https://www.npmjs.com/package/react-range
import { Range } from 'rc-range'
import 'rc-range/assets/index.css'

import './style.css'

export const CatalogoContent = (props) => {
    const { 
        strPrecio, 
        preciosMinMaxState, 
        rangeValue, 
        handlerRange, 
        marcasState, 
        marcas, 
        handlerMarcasChanges,
        departamentosState,
        departamentos,
        handlerDeptosChanges, 
        itemsPerPageOnChange, 
        dataGrid, 
        aplicarFiltro, 
        orderByOnChange, 
        initialValuesGridCard, 
        productosState, 
        goToPage,
        panelFiltro,
        mostrarFiltros
    } = props
    
    
    return (
        <>
            <HeaderMarketComponent/>
            <Container>
                <Row>
                    <h4>Catálogo</h4>
                </Row>
                <Row>
                    <Button variant="primary" className="btn-filtros" onClick={() => mostrarFiltros()}>Filtros</Button>
                    <Col className="filter-panel" ref={panelFiltro}>  
                        <div className="backgroud-panel-filtro"></div>                      
                        {/* Filtro Rango de precio */}
                        <Row className="rango-precio-row">
                            <Form.Label>Rango de precios</Form.Label>
                            <Row className="rango-precio-row">
                                <Col className="rango-precio-min">$ {strPrecio(preciosMinMaxState.min, 0)}</Col>
                                <Col className="rango-precio-max">$ {strPrecio(preciosMinMaxState.max, 0)}</Col>
                            </Row>
                            <Range 
                                count={2} 
                                defaultValues={[0, 10000]} 
                                value={rangeValue} 
                                onChange={e => handlerRange(e)}
                                min={preciosMinMaxState.min ? preciosMinMaxState.min : 0} 
                                max={preciosMinMaxState.max ? preciosMinMaxState.max : 10000}
                                step={preciosMinMaxState.max ? parseInt((preciosMinMaxState.max - preciosMinMaxState.min) / 20) : 1000}
                                allowCross={false}
                            />
                            <Row className="rango-precio-row">
                                <Col className="rango-precio-min">$ {strPrecio(rangeValue[0], 0)}</Col>
                                <Col className="rango-precio-max">$ {strPrecio(rangeValue[1], 0)}</Col>
                            </Row>
                        </Row>
                        
                        { /* Filtro Marcas */ }
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label as="legend" column sm={12}>
                                Marca
                            </Form.Label>
                            <Col sm={12}>
                                {marcasState.map((m, key) => {
                                        return <Form.Check
                                            id={"marcas-"+m.id}
                                            key={key}
                                            type="checkbox"
                                            label={m.nombre}
                                            name={"marcas-"+key+"-"+m.nombre.split(" ").join("_")}
                                            checked={marcas[m.nombre]}
                                            onChange={e => handlerMarcasChanges(e)}
                                        />
                                    })
                                }
                            </Col>
                        </Form.Group>
                        

                        { /* Filtro Departamento */ }
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label as="legend" column sm={12}>
                                Departamento
                            </Form.Label>
                            <Col sm={12}>
                                {departamentosState.map((m, key) => {
                                        return <Form.Check
                                            id={"deptos-"+m.id}
                                            name={"deptos-"+key+"-"+m.nombre.split(" ").join("_")}
                                            key={key}
                                            type="checkbox"
                                            label={m.nombre}
                                            checked={departamentos[m.nombre]}
                                            onChange={e => handlerDeptosChanges(e)}
                                        />
                                    })
                                }
                            </Col>
                        </Form.Group>


                        <Button variant="primary" onClick={() => aplicarFiltro()}>Aplicar filtro</Button>
                    </Col>
                    <Col xs={12} md={10}>
                        <GridCardComponent 
                            itemsPerPageOnChange={itemsPerPageOnChange}
                            data={dataGrid}
                            orderByOnChange={orderByOnChange}
                            initialValues={initialValuesGridCard}
                        />
                        <Row className="row-paginacion">
                            <Col className="paginacion">
                                {(productosState?.data && productosState?.data?.length < productosState.totRows) && <Paginacion data={productosState} goToPage={goToPage}/>}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            
                                
            <FooterComponent/>
        </>
    )
}