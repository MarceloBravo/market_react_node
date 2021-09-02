import React from 'react';
import { Page, Text, View, Document } from '@react-pdf/renderer';
import { formatearNumero, formatearFechaHora }  from '../../../shared/funciones'

export const BoletaPDFComponent = (props) => {
    const { data, carrito } = props

    const styles = {
        table: { 
            display: "table", 
            width: "auto", 
            borderStyle: "solid", 
            borderWidth: 1, 
            borderRightWidth: 0, 
            borderBottomWidth: 0 
          }, 
          tableRow: { 
            margin: "auto", 
            flexDirection: "row" 
          }, 
          tableCol: { 
            width: "25%", 
            borderStyle: "solid", 
            borderWidth: 1, 
            borderLeftWidth: 0, 
            borderTopWidth: 0 ,
          },
          tableColDescripcion: { 
            width: "50%", 
            borderStyle: "solid", 
            borderWidth: 1, 
            borderLeftWidth: 0, 
            borderTopWidth: 0
          }, 
          tableCell: { 
            margin: "auto", 
            marginTop: 5, 
            fontSize: 10,
          }
        };
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text>Boleta de venta</Text>
                    
                            <View>
                                
                                <View>
                                    <Text style={{'font-size': '14px'}}>Estado de la transacción: {data.status}</Text>
                                </View>
                                <View>
                                    <Text>Fecha de compra: { formatearFechaHora(data.transaction_date) }</Text>
                                </View>
                                <View>
                                    <Text>Orden de compra: {data.buy_order}</Text>
                                </View>
                                <View>
                                    <Text>N° de tarjeta: ...{data.card_detail?.card_number}</Text>
                                </View>
                                <View>
                                    <Text>Código autorización: {data.authorization_code}</Text>
                                </View>
                                <View>
                                    <Text>Tipo de pago: {data.nombre}</Text>
                                </View>
                            </View>
                            <View>
                                <View style={styles.tableContainer}>
                                <View style={styles.table}>
                                    
                                    <View style={styles.tableRow}> 
                                        <View style={styles.tableColDescripcion}> 
                                            <Text style={styles.tableCell}>Producto</Text> 
                                        </View> 
                                        <View style={styles.tableCol}> 
                                            <Text style={styles.tableCell}>Cantidad</Text> 
                                        </View> 
                                        <View style={styles.tableCol}> 
                                            <Text style={styles.tableCell}>Precio</Text> 
                                        </View> 
                                    </View>
                                
                                    {carrito && Object.keys(carrito).map((item, key )=> {
                                        return <View style={styles.tableRow} key={key}>
                                                    <View style={styles.tableColDescripcion}>
                                                        <Text style={styles.tableCell}>{carrito[item].nombre}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{carrito[item].cantidad}</Text>
                                                    </View>
                                                    <View style={styles.tableCol}>
                                                        <Text style={styles.tableCell}>{carrito[item].str_precio}</Text>
                                                    </View>
                                                </View>
                                    })}
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableColDescripcion}>
                                            <Text style={styles.tableCell}></Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>Impuestos</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>$ {formatearNumero(data?.impuestos)}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableColDescripcion}>
                                            <Text style={styles.tableCell}></Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>Despacho</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>$ {formatearNumero(0)}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableColDescripcion}>
                                            <Text style={styles.tableCell}></Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>Total</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>$ {formatearNumero(data?.amount ? data.amount : 0)}</Text>
                                        </View>
                                    </View>
                                </View>
                                </View>
                                
                            
                            </View>
                            
                </View>
            </Page>
            
        </Document>
    );
}