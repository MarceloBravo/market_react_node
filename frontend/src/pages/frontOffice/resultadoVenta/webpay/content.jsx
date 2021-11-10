import React from 'react'
import { HeaderMarketComponent } from '../../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../../components/frontOffice/footer/footer'
import { Container, Button, Row, Col, Image, Table } from 'react-bootstrap'
import { formatearNumero, formatearFechaHora }  from '../../../../shared/funciones'
import { Alerta } from '../../../../components/shared/alerts'
//import { BoletaPDFComponent } from '../../../../components/shared/boletaPDF/BoletaPDF'
// eslint-disable-next-line
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { ErrorHandler } from '../../../../components/errorHandler/ErrorHandlrer'

import { PDFComponent } from '../../../../components/shared/pdf/boletaPdf'
import{ init } from 'emailjs-com';
init("user_LZ7olBSXez61SyilXGFV9");

export const  ResultadoVentaContent = (props) => {
    const {
        tipoAlertaState, 
        transactionStatus, 
        tipoPagoState, 
        carrito, 
        impuestos, 
        goToInicio, 
        dataPDF,
        nombreTienda,
        sendEmail,
        generarBoleta
    } = props

    return (
        <>
            <HeaderMarketComponent />
            <Container className="containner containner-resume">
                <Alerta ocultarCerrar={true}/>
                {tipoAlertaState === 'success' && 
                    <Row className="row-message">
                        <Row><Col></Col><Col className="titulo-resumen">Resumen</Col><Col></Col></Row>
                        <Col md={{span: 8, offset: 2}} className="col-message">
                            <Row>
                                <Col md={2}>
                                    <Image src="images/exclamacion.png" alt="Signo exclamación"></Image>
                                </Col>
                                <Col className="col-texto-menssage">
                                    <Row>
                                        <Col>Estado de la transacción</Col>
                                        <Col>{transactionStatus?.status}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Fecha</Col>
                                        <Col>{formatearFechaHora(transactionStatus?.transaction_date)}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Orden de compra</Col>
                                        <Col>{transactionStatus?.buy_order}</Col>
                                    </Row>
                                    <Row>
                                        <Col>N° de tarjeta</Col>
                                        <Col>...{transactionStatus?.card_detail?.card_number}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Código autorización</Col>
                                        <Col>{transactionStatus?.authorization_code}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Tipo de pago</Col>
                                        <Col>{tipoPagoState?.nombre}</Col>
                                    </Row>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Cantidad</th>
                                                <th className="resumen-col-precio">Precio</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carrito && Object.keys(carrito).map((item, key )=> {
                                                return <tr key={key}>
                                                            <td>{carrito[item].nombre}</td>
                                                            <td className="resumen-col-cantidad">{carrito[item].cantidad}</td>
                                                            <td className="resumen-col-precio">{carrito[item].str_precio}</td>
                                                        </tr>
                                            })}
                                            <tr>
                                                <td></td>
                                                <td className="resumen-cel-titulo">Impuestos</td>
                                                <td className="resumen-col-precio">
                                                    $ {formatearNumero(impuestos)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td className="resumen-cel-titulo">Despacho</td>
                                                <td className="resumen-col-precio">
                                                    $ {formatearNumero(0)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td className="resumen-cel-titulo">Total</td>
                                                <td className="resumen-col-precio">
                                                    $ {formatearNumero(transactionStatus?.amount ? transactionStatus.amount : 0)}
                                                </td>
                                            </tr>

                                        </tbody>
                                        
                                    </Table>
                                </Col>
                            </Row>
                            
                        </Col>
                    </Row>
                } 
                {tipoAlertaState === 'success' && 
                    <>
                        <Row className="row-bottom-buttons">
                            <Col md={5}>
                                {/*
                                    <ErrorHandler>
                                    {
                                    (dataPDF && carrito) && 
                                        <PDFDownloadLink 
                                            variant="primary" 
                                            document={<PDFComponent data={dataPDF} 
                                            carrito={carrito} 
                                            nombre_tienda={nombreTienda}/>} 
                                            fileName={"comprobante_venta-" + formatearFechaHora(transactionStatus?.transaction_date) + ".pdf"}
                                        >
                                        {
                                            ({loading}) => loading ? 'Cargando...' : <Button variant="primary" >Descargar comprobante</Button>
                                        }     
                                        </PDFDownloadLink>
                                    }
                                    </ErrorHandler>
                                */}
                                {carrito && <Button onClick={() => generarBoleta()}>Descarga tu boleta</Button>}
                            </Col>
                            <Col md={2}></Col>
                            <Col md={5} className="col-enviar-email">
                                <Button variant="primary" onClick={e => sendEmail(e)}>Enviar comprobante por email</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{span: 4, offset: 4}} className="col-button-OK">
                                <Button variant="primary" onClick={() => goToInicio()}>Volver a la pantalla de inicio</Button>
                            </Col>
                        </Row>
                    </>
                }
                
                {/*
                <ErrorHandler>
                    {(dataPDF && (Object.keys(dataPDF).length > 15) && carrito) &&
                        <PDFViewer>
                            <PDFComponent data={dataPDF} carrito={carrito}/>
                        </PDFViewer>
                    }
                </ErrorHandler>
                */}
                {tipoAlertaState !== 'success' &&  
                    <Row>
                        <Col md={{span: 4, offset: 4}} className="col-button-OK">
                            <Button variant="primary" onClick={() => goToInicio()}>Volver al carrito</Button>
                        </Col>
                    </Row>
                }
            </Container>
            <FooterComponent/>
        </>
    )
}