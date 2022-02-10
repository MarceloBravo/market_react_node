import React, { useEffect, useState } from 'react'
import { find as buscarProducto}  from '../../../actions/productos'
import { find as buscarCategoria }  from '../../../actions/categorias'
import { find as buscarSubCategoria }  from '../../../actions/subCategorias'
import { find as buscarUnidad }  from '../../../actions/unidades'
import { find as detalleApp } from '../../../actions/personalizar'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { defaultImagesProducts } from '../../../shared/constantes'
import { DetalleProductoContent } from './content'
import { useToasts } from 'react-toast-notifications';
import { getBySubCategory } from '../../../actions/tallas'
/*
  TOAST: 
  yarn add react-toast-notifications
  https://github.com/jossmac/react-toast-notifications
  Envolver la aplicación en el componente ToastProvider en el archivo index.js
*/
import './style.css'

export const DetalleProducto = () => {
    const id = useParams('id')
    const productoState = useSelector(state => state.ProductosReducer.producto)
    const unidadState = useSelector(state => state.UnidadesReducer.unidad)
    const categoriaState = useSelector(state => state.CategoriasReducer.categoria)
    const subCategoriaState = useSelector(state => state.SubCategoriasReducer.subCategoria)
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)
    const tallasState = useSelector(state => state.TallasReducer.list )
    const [ itemCantidad, setItemCantidad ] = useState(1)
    const [ itemTallaId , setItemTallaId ] = useState('')
    const [ itemTallaValor, setItemTallaValor ] = useState('')
    const [ activeImage, setActiveImage ] = useState(defaultImagesProducts + 'not-found-image.jpg')
    const [ keyTab, setKeyTab ] = useState('caracteristicas')
    const [ showPreView, setShowPreView ] = useState(false)
    const [ errors, setErrors ] = useState({cantidad: ''})
    const [ carrito, setCarrito ] = useState({})
    const [ pagar, setPagar ] = useState(false)
    const [ textoBotonCarrito, setTextoBotonCarrito ] = useState('Agregar al carrito')
    const dispatch = useDispatch()
    const history = useHistory()
    const { addToast } = useToasts();

    useEffect(()=>{
        if(id){
            dispatch(detalleApp())
            dispatch(buscarProducto(id.id))
        }else{
            history.push('/')
        }
    },[dispatch, history, id])


    useEffect(()=>{
        if(productoState.id){
            if(productoState.stock === 0){setItemCantidad(0)}
            dispatch(buscarCategoria(productoState.categoria_id))
            dispatch(buscarSubCategoria(productoState.sub_categoria_id))
            dispatch(buscarUnidad(productoState.unidad_id))
            let imgs = productoState.imagenes.filter(i => i.imagen_principal)
            setActiveImage(defaultImagesProducts + (imgs.length > 0 ? imgs[0].source_image : 'not-found-image.jpg'))
            let cart = localStorage.getItem('cart-'+infoTiendaState.nombre_tienda)
            if(cart){
                setCarrito(JSON.parse(cart))
            }
        }
        // eslint-disable-next-line
    },[dispatch, productoState])


    useEffect(()=>{
        if(carrito[id.id]){
            setTextoBotonCarrito('Actualizar carrito de compras')
        }
    },[carrito, id.id])


    useEffect(()=>{
        if(pagar){
            history.push('/carrito')
        }
    },[history, pagar])


    useEffect(()=>{
        if(infoTiendaState.nombre_tienda && JSON.stringify(carrito) !== "{}"){
            localStorage.setItem('cart-'+infoTiendaState.nombre_tienda,JSON.stringify(carrito))
        }
    },[infoTiendaState.nombre_tienda, carrito])


    useEffect(()=>{
        dispatch(getBySubCategory(subCategoriaState.id))
    },[subCategoriaState, dispatch])


    const handlerInput = (e) => {
        validaDatos(e.target.name, e.target.value)
        setItemCantidad(e.target.value)
    }


    const handlerChangeSelect = (e) => {
        //let selected = Array.from(e.target.selectedOptions, e => e.value)
        setItemTallaId(e.target.value)
        let selectedItem = tallasState.filter(t=> t.id == e.target.value)
        if(selectedItem.length > 0){
            setItemTallaValor(selectedItem[0].talla)
        }
    }

    const selectImage = (src) => {
        setActiveImage(defaultImagesProducts + src)
    }


    const pagarProducto = () => {
        setPagar(true)
    }

    const volverAlCatalogo = () => {
        history.push('/catalogo')
    }

    const agregarCarrito = () => {
        //console.log('SET PRECIO NETO TP STRING', (new Intl.NumberFormat("de-DE").format(parseInt(productoState.precio_actual))))
        //console.log('SET PRECIO VENTA',parseInt(new Intl.NumberFormat("de-DE").format(parseInt(productoState.precio_actual) * ((productoState.total_impuestos/100) + 1))))
        setCarrito({...carrito, [id.id]:{
                id: productoState.id,
                producto_id: productoState.id, 
                nombre: productoState.nombre, 
                precio: productoState.precio_actual, 
                monto_impuestos: (new Intl.NumberFormat("de-DE").format(parseInt(productoState.precio_actual) * (productoState.total_impuestos/100))),
                str_precio: "$  " + (new Intl.NumberFormat("de-DE").format(parseInt(productoState.precio_actual))),
                precio_venta: "$  " + (new Intl.NumberFormat("de-DE").format(parseInt(productoState.precio_actual) * ((productoState.total_impuestos/100) + 1))),
                unidad: productoState.nombre_unidad, 
                cantidad: itemCantidad,
                imagen: defaultImagesProducts + productoState.source_image,
                impuestos: productoState.total_impuestos,
                categoria: productoState.nombre_categoria,
                sub_categoria: productoState.subCategoria,
                marca: productoState.nombre_marca,
                stock: productoState.stock,
                talla: itemTallaId,
                tallaValor: itemTallaValor
            }
        })
        addToast('El producto ha sigo agregado al carrito', { appearance: 'success' })
    }


    const validaDatos = (field, value) => {
        switch(field){
            case 'cantidad':
                if(isNaN(value)){
                    setErrors({...errors, [field]: 'Debe ingresar una cantidad'})
                }else if(value <= 0){
                    setErrors({...errors, [field]: 'Debe ingresar un número mayor a 0'})
                }else if(value > productoState.stock || productoState.stock === 0){
                    setErrors({...errors, [field]: 'No hay suficiente stock, ingresa una cantidad menor'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            default:
                return setErrors({...errors, [field]: ''})
        }

    }


    return (
            <DetalleProductoContent
                categoriaState={categoriaState} 
                subCategoriaState={subCategoriaState} 
                productoState={productoState} 
                defaultImagesProducts={defaultImagesProducts} 
                selectImage={selectImage} 
                activeImage={activeImage} 
                setShowPreView={setShowPreView} 
                unidadState={unidadState}
                handlerInput={handlerInput} 
                errors={errors} 
                agregarCarrito={agregarCarrito} 
                itemCantidad={itemCantidad} 
                textoBotonCarrito={textoBotonCarrito} 
                pagarProducto={pagarProducto} 
                keyTab={keyTab} 
                setKeyTab={setKeyTab} 
                showPreView={showPreView}
                volverAlCatalogo={volverAlCatalogo}
                handlerChangeSelect={handlerChangeSelect}
                itemTalla={itemTallaId}
                tallasState={tallasState}
            />       
    )
}