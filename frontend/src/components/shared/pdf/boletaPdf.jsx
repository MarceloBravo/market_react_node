import React from 'react';
import { Page, Document } from '@react-pdf/renderer';
import { Html } from 'react-pdf-html'; // not yet available as an NPM package, so just download the files
import { formatearNumero, formatearFechaHora }  from '../../../shared/funciones'
//import ReactDOMServer from 'react-dom/server';

//import { parse } from 'node-html-parser';

export const PDFComponent = (props) => {
    const { data, carrito, nombre_tienda } = props
    
    const element = `
        <html>
            <style>
            body{
                font-size: 12px;
            }
            .table{
                display: table;
                width: 100%;
            }
            .datos-tienda{
                display: table-cell;
                width: 65%;
            }
            .nombre-tienda{
                font-size: 30;
            }
            .box-doc-number{
                display: table-cell;
                border-style: solid;
                border-color: red;
                border-width: 5px;
                height: 100px;
                text-align: center;
                width: 34%;
                right: 0px;
                top: 0px;
                position: absolute;
            }
            .label-order-number{
                top: 10%;
                width: 100%;
                position: relative;
                color: red;
                font-size: 20;
                display: flow-root;
            }
            .orderNumber{
                top: 42%;
                width: 100%;
                color: red;
                font-size: 20;
                line-height: 3em;
            }
            .divider{
                height: 20px;
            }
            .grid{
                width: 100%;
                border-style: solid;
                border-width: .5px;
                border-color: black;
            }
            .resumen-col-precio,
            .resumen-col-cantidad,
            .resumen-cel-titulo{
                width: 70;
                text-align: right;
            }
            .double-col{
                text-align: right;
            }
            th, td{
                border-style: solid;
                border-color: black;
            }
            .empty-cell{
                border-left: none;
                border-bottom: none;
            }
            </style>
            <body>
                <div class="table">
                    <div class="datos-tienda">
                        <div class="nombre-tienda">${nombre_tienda}</div>
                        <div>Descripción del giro</div>
                        <div>Fecha ${formatearFechaHora(data.transaction_date)}</div>
                        <div>N° Trajeta ${data.card_detail.card_number}</div>
                        <div>Cód de autorización ${data.authorization_code}</div>
                        <div>Forma de pago ${data.nombre}</div>
                    </div>
                    <div class="box-doc-number">
				        <div class="doc-number">
                            <div class="label-order-number">Orden de Compra</div>
                            <div class="orderNumber">N°000000${data.buy_order}</div>
                        </div>
                    </div>
                </div>
                <div class="divider">
                </div>
                    
                    <table class="grid">
                        <thead>
                            <tr>
                                <th >Producto</th>
                                <th class="resumen-col-cantidad">Cantidad</th>
                                <th class="resumen-col-precio">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.keys(carrito).map((item, key) => {
                                return  `<tr key={key}>
                                            <td>${carrito[item].nombre}</td>
                                            <td class="resumen-col-cantidad">${carrito[item].cantidad}</td>
                                            <td class="resumen-col-precio">${carrito[item].str_precio}</td>
                                        </tr>`
                            })}
                            <tr>
                                <td></td>
                                <td class="double-col" colspan="2">Impuestos</td>
                                <td class="resumen-col-precio">
                                    $ ${formatearNumero(data.impuestos)}
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="double-col" colspan="2">Despacho</td>
                                <td class="resumen-col-precio">
                                    $ ${formatearNumero(0)}
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="double-col" colspan="2">Total</td>
                                <td class="resumen-col-precio">
                                    $  ${formatearNumero(data?.amount ? data.amount : 0)}
                                </td>
                            </tr>
        
                        </tbody>
                        
                    </table>
                
            </body>
        </html>`

    //const htmlContent = ReactDOMServer.renderToStaticMarkup(element);

    return (
        <Document>
            <Page>
                <Html>{element}</Html>
            </Page>
        </Document>
    );
}