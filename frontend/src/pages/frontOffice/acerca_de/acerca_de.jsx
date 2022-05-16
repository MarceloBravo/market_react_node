import React from 'react'
import { HeaderMarketComponent } from '../../../components/frontOffice/header/header'
import { FooterComponent } from '../../../components/frontOffice/footer/footer'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { serverEndPoint as endPoint } from '../../../shared/constantes'
import { useHistory } from 'react-router-dom'
import './acerca_de.css'

export const AcercaDe = () => {
    const imgSource = endPoint + '/images/app/'
    const history = useHistory()
    
    
    const goToLogin  = () => {
        history.push('/login')
    }

    return (
        <>
            <HeaderMarketComponent/>
            <Container>
                <Row className="sub-title">
                    <Col><h3>Acerca de...</h3></Col>
                </Row>
                <Row className="acerca_de_container sub-title">
                    <Row>
                        <Form.Label className="createdFor">Desarrollado por Marcelo Bravo Castillo.</Form.Label>
                    </Row>
                    <Row className="sub-title">
                        <h4><b>Importante:</b> Esta aplicación no pertenece a alguna tienda real y su fin es sólo demostrativo.</h4>
                    </Row>
                    <br />
                    <Row className="sub-title">
                        <h4>Para el frontend de ésta aplicación se utilizaron las siguientes tecnologías:</h4>
                    </Row>
                    <Row>
                        <Col md="6">
                            <img src={ imgSource + 'react.png' } alt="React" />
                        </Col>
                        <Col md="6" className="tech-info">
                            <Row>
                                <h3>React</h3>
                                React es una biblioteca Javascript de código abierto diseñada para crear 
                                interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones 
                                en una sola página.
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="7" className="tech-info">
                            <Row>
                                <h3>React Hooks</h3>
                                Los ganchos son funciones que le permiten "enganchar" 
                                el estado de React y las características del ciclo de vida de los componentes 
                                de la función. Los ganchos no funcionan dentro de las clases, te permiten usar 
                                React sin clases
                            </Row>
                        </Col>
                        <Col md="5" className="img-content">
                            <img src={ `${imgSource}react-hooks.png` } alt="React Hooks" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="5">
                            <img src={ imgSource + 'reduxLogo.png' } alt="Redux" />
                        </Col>
                        <Col md="7" className="tech-info">
                            <Row>
                                <h3>Redux</h3>
                                Redux es una librería JavaScript de código abierto para el manejo del estado de 
                                las aplicaciones.
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="7" className="tech-info">
                            <Row>
                                <h3>Axios</h3>
                                Axios es una librería JavaScript que puede ejecutarse en el navegador y que nos 
                                permite hacer sencillas las operaciones como cliente HTTP, por lo que podremos 
                                configurar y realizar solicitudes a un servidor y recibiremos respuestas fáciles 
                                de procesar.
                            </Row>
                        </Col>
                        <Col md="5" className="img-content">
                            <img src={ imgSource + 'axios-logo.jpg' } alt="Axios" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="5">
                            <img src={ imgSource + 'react-bootstrap.png' } alt="React-bootstrap" />
                        </Col>
                        <Col md="7" className="tech-info">
                            <Row>
                                <h3>React-Bootstrap</h3>
                                React-Bootstrap es una biblioteca basada en componentes que proporciona 
                                componentes Bootstrap nativos como componentes React puros. En lugar de 
                                utilizar la fuente de JavaScript y los complementos de la CDN, convierte 
                                todo JavaScript a React y agrupa todos los componentes.
                            </Row>
                        </Col>
                    </Row>

                    <Row className="sub-title">
                        <h4>El desarrollo del API Rest de la aplicación, fue con:</h4>
                    </Row>
                    <Row>
                        <Col md="5">
                            <img src={ imgSource + 'node-js.jpg' } alt="Node js" />
                        </Col>
                        <Col md="7" className="tech-info">
                            <Row>
                                <h3>Node</h3>
                                Node.js es un entorno en tiempo de ejecución multiplataforma, de código 
                                abierto, para la capa del servidor basado en el lenguaje de programación 
                                JavaScript, asíncrono, con E/S de datos en una arquitectura orientada a 
                                eventos y basado en el motor V8 de Google.
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="7" className="tech-info">
                            <Row>
                                <h3>Express</h3>
                                Express es un marco de aplicación web de Node.js mínimo y flexible que 
                                proporciona un conjunto sólido de funciones para desarrollar aplicaciones 
                                web y móviles. Facilita el desarrollo rápido de aplicaciones web basadas 
                                en Node.
                            </Row>
                        </Col>
                        <Col md="5" className="img-content">
                            <img src={ imgSource + 'express.png' } alt="Express" />
                        </Col>
                    </Row>

                    <Row>
                        <h4>Finalmente, para la base de datos se utilizó:</h4>
                    </Row>
                    <Row>
                        <Col md="5">
                            <img src={ imgSource + 'mysql.png' } alt="MySql" />
                        </Col>
                        <Col md="7" className="tech-info">
                            <Row>
                                <h3>MySql</h3>
                                MySQL es un sistema de gestión de bases de datos relacionales (RDBMS) de 
                                código abierto respaldado por Oracle y basado en el lenguaje de consulta 
                                estructurado (SQL). MySQL funciona prácticamente en todas las plataformas, 
                                incluyendo Linux, UNIX y Windows.
                            </Row>
                        </Col>
                    </Row>
                
                    <Row className="sub-title">
                        <h3>
                            Como simular los pagos con webpay:
                        </h3>
                    </Row>
                    <Row>
                        Para simular pagos con webpay, al seleccionar el botón Pagar con Paypal, ubicado 
                        en la pantalla de Datos de envío, la aplicación redireccionará a WebPay, allí los 
                        pasos a seguir son los siguientes:
                    </Row>
                    <Row className="webpay-steps">
                        
                        <ol>
                            <li>
                                Primero se debe seleccionar la opción debito.
                            </li>
                            <li>
                                A la derecha de la pantalla seleccionar como banco <b>TEST COMMERCE BANK</b>.
                            </li>
                            <li>
                                Como número de tarjeta se puede utilizar el número <b>4051 8842 3993 7763</b> y seleccionar <b>Pagar $xx.xxx</b> (*).
                            </li>
                            <li>
                                En la pantalla que aparecerá, ingresar como usuario <b>11.111.111-1</b> y como contraseña <b>123</b>.
                            </li>
                            <li>
                                En la siguiente pantalla seleccionar <b>Aceptar</b> para simular un pago exitoso o <b>Cancelar</b> para simular un pago no autorizado.
                            </li>
                        </ol>
                    
                    </Row>

                    <Row>
                        Finalmente Webpay, redireccionará de regreso a la tienda, donde se mostrará una pantalla con el resumen del Pago.
                    </Row>
                    <Row>
                        <Form.Label className="form-label-info">
                            * Para probar otras tarjetas y medios de pago con Webpay, los puedes obtener en la página de 
                            <a href="https://www.transbankdevelopers.cl/documentacion/como_empezar#tarjetas-de-prueba" target="_blank" rel="noreferrer">Transbank developers</a> 
                            en la sección Tarjetas de Prueba
                        </Form.Label>
                    </Row>

                    <Row className="sub-title">
                        <h3>
                            Como acceder a la administración de la tienda:
                        </h3>
                    </Row>
                    <Row>
                        <Row>
                            Si se desea modificar la configuración de la tienda, como cambiar el nombre de la tienda, 
                            modificar imágenes de la página home, agregar o quitar productos y modificar sus precios o 
                            Stock, se puede hacer ingresando a la administración de la tienda.
                        </Row>
                        <Form.Label className="form-label-info">
                            Para acceder a la administración de la tienda se debe seleccionar el menú <span className="span-lnk" onClick={() => goToLogin()}>Administrar tienda</span> ubicado en la cabecera de ésta página
                        </Form.Label>
                    </Row>
                    <Row>
                        Las credenciales para ingresar son:
                    </Row>
                    <Row>
                        <Form.Label>
                            Usuario: <b>mabc@live.cl</b>
                        </Form.Label>
                    </Row>
                    <Row>
                        <Form.Label>
                            Contraseña: <b>123456</b>
                        </Form.Label>
                    </Row>
                
                </Row>
            </Container>
            <FooterComponent/>
        </>
    )   
}