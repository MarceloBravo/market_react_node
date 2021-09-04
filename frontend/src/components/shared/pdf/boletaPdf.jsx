import React from 'react';
import { Page, Document } from '@react-pdf/renderer';
import { Html } from 'react-pdf-html'; // not yet available as an NPM package, so just download the files
//import { formatearNumero, formatearFechaHora, generateHtmlPDF }  from '../../../shared/funciones'
import { generateHtmlPDF }  from '../../../shared/funciones'

export const PDFComponent = (props) => {
    const { data, carrito, nombre_tienda } = props
    const element = generateHtmlPDF(nombre_tienda, data, carrito) 

    //const htmlContent = ReactDOMServer.renderToStaticMarkup(element);

    return (
        <Document>
            <Page>
                <Html>{element}</Html>
            </Page>
        </Document>
    );
}