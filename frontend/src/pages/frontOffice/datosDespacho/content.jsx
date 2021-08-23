import React from 'react'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { Alerta } from '../../../components/shared/alerts'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { ResumenVentaComponent } from '../../../components/frontOffice/resumenVenta/resumenVenta'

export const DatosDespachoContent = (props) => {
    const { 
        cliente, 
        handlerChangeValue, 
        errors, 
        cargarProvincias, 
        cargarComunas, 
        regiones, 
        provincias, 
        comunas, 
        totalNeto,
        subTotal,
        impuestos,
        volver,
        continuarCompra,
        despacho,         
        disabledButtonContinuar,
        webpayEndPoint,
        token, 
        btnSubmitWebPay, 
  } = props


    return (
        <>
            <HeaderMarketComponent />
            <Container>
                <Alerta />
                <Row>
                    <Col>
                        <h4>Datos de despacho</h4>
                    </Col>
                    <Col>
                        <h4 className="titulo-paso">Paso 2</h4>
                    </Col>                    
                </Row>
                <Row>
                    <Col md="8">


                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="direccion"
                                    placeholder="Dirección de despacho" 
                                    value={cliente.direccion}
                                    onChange={e => handlerChangeValue(e)}    
                                />
                                {errors.direccion  &&
                                    <Form.Group as={Row}>
                                        <Form.Text  className="field-error">{ errors.direccion }</Form.Text>
                                    </Form.Group>
                                }
                            </Form.Group>

                            <Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Región</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        name="cod_region" 
                                        value={cliente.cod_region}
                                        onChange={e => cargarProvincias(e)}
                                    >
                                        {regiones.length === 0 && <option key="-1" value="">-- No se han encontrado regiones --</option> }
                                        {regiones.length > 0 && <option key="-1" value="">-- Seleccione --</option> }
                                        {regiones.map((r,key) => {
                                            return  <option key={key} value={r.codigo}>{r.nombre}</option>
                                        })}
                                        {errors.cod_region  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.cod_region }</Form.Text>
                                        </Form.Group>
                                    }
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Provincia</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        name="cod_provincia" 
                                        value={cliente.cod_provincia}
                                        onChange={e => cargarComunas(e)}
                                    >
                                        {provincias.length === 0 && <option key="-1" value="">-- No se han encontrado provincias --</option> }
                                        {provincias.length > 0 && <option key="-1" value="">-- Seleccione --</option> }
                                        {provincias.map((c,key) => {
                                            return  <option key={key} value={c.codigo}>{c.nombre}</option>
                                        })}
                                        {errors.cod_provincia  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.cod_provincia }</Form.Text>
                                        </Form.Group>
                                    }
                                    </Form.Control>
                                    
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Comuna</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        name="cod_comuna" 
                                        value={cliente.cod_comuna}
                                        onChange={e => handlerChangeValue(e)}
                                    >
                                        {comunas.length === 0 && <option key="-1" value="">-- No se han encontrado comunas --</option> }
                                        {comunas.length > 0 && <option key="-1" value="">-- Seleccione --</option> }
                                        {comunas.map((c,key) => {
                                            return  <option key={key} value={c.codigo}>{c.nombre}</option>
                                        })}
                                        {errors.cod_comuna  &&
                                        <Form.Group as={Row}>
                                            <Form.Text  className="field-error">{ errors.cod_comuna }</Form.Text>
                                        </Form.Group>
                                    }
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        name="ciudad" 
                                        placeholder="Ciuidad"
                                        value={cliente.ciudad}
                                        onChange={e => handlerChangeValue(e)}
                                    />
                                    {errors.ciudad  &&
                                        <Form.Group as={Row}>
                                            <Form.Text className="field-error">{ errors.ciudad }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>

                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Casa número</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="casa_num"
                                        placeholder="Número de casa" 
                                        value={cliente.casa_num}
                                        onChange={e => handlerChangeValue(e)}    
                                    />
                                    {errors.casa_num  &&
                                        <Form.Group as={Row}>
                                            <Form.Text className="field-error">{ errors.casa_num }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Block N°</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="block_num"
                                        placeholder="Número de block (Opcional)" 
                                        value={cliente.block_num}
                                        onChange={e => handlerChangeValue(e)}
                                    />
                                    {errors.block_num  &&
                                        <Form.Group as={Row}>
                                            <Form.Text className="field-error">{ errors.block_num }</Form.Text>
                                        </Form.Group>
                                    }
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Referencia</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="referencia"
                                    placeholder="Cómo llegar... (Opcional)" 
                                    value={cliente.referencia}
                                    onChange={e => handlerChangeValue(e)}    
                                />
                                {errors.referencia  &&
                                    <Form.Group as={Row}>
                                        <Form.Text className="field-error">{ errors.referencia }</Form.Text>
                                    </Form.Group>
                                }
                            </Form.Group>

                    </Col>
                    <Col md="4">
                        <ResumenVentaComponent 
                            totalNeto={totalNeto} 
                            subTotal={subTotal}
                            impuestos={impuestos}
                            volver={volver}
                            continuarCompra={continuarCompra}
                            despacho={despacho}
                            disabledButton1={disabledButtonContinuar}
                            textoContinuarCompra={'Continuar con el pago'}
                            textoVolver={'Volver al carrito de compras'}
                        />
                        <form action={webpayEndPoint} method="POST">
                            <input type="hidden" name="token_ws" value={token}/>
                            <input type="submit" value="Pagar" className="btn-pagar" ref={btnSubmitWebPay}/>
                        </form>
                    </Col>
                </Row>
                <Row className="row-bottom">

                </Row>
            </Container>
            <FooterComponent />
        </>
    )
}