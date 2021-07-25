import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { find, insert, update, deleteReg } from '../../../../actions/productos'
import { findByUrl } from '../../../../actions/pantallas'
import { types as modalTypes } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { types as productosTypes } from '../../../../redux/Productos/types'
import { getAll as getAllUnidades } from '../../../../actions/unidades'
import { getAll as marcasGetAll } from '../../../../actions/marcas'
import { getAll as categoriasGetAll } from '../../../../actions/categorias'
import { getAllByCategory as subCategoriasGetAll } from '../../../../actions/subCategorias'
import { types as subCategoriasTypes } from '../../../../redux/SubCategorias/types'
import { getAll as impuestosGetAll } from '../../../../actions/impuestos'
import { defaultImagesProducts } from '../../../../shared/constantes'
import { ProductosFormContent } from './content'
import './style.css'


export const ProductosForm = (props) => {
    const { id } = useParams()
    const currentUrl = window.location.pathname.split('/')[1]
    const unidades = useSelector(state => state.UnidadesReducer.list)
    const marcas = useSelector(state => state.MarcasReducer.list)
    const categorias = useSelector(state => state.CategoriasReducer.list)
    const subCategorias = useSelector(state => state.SubCategoriasReducer.list)
    const impuestos = useSelector(state => state.ImpuestosReducer.list)
    const tipoAlerta = useSelector(state => state.AlertaReducer.tipo)
    const productoState = useSelector(state => state.ProductosReducer.producto)
    const [ producto, setProducto ] = useState({
        id: 0,
        nombre: '',
        descripcion: '',
        precio_venta_normal: '',
        precio_actual: 0,
        precio_fecha_desde: '',
        precio_fecha_hasta: '',
        stock: 0,
        unidad_id: 0,
        marca_id: 0,
        categoria_id: 0,
        sub_categoria_id: 0,
        impuestos_id: [],
        impuestos: [],
        imagenes: [],  
        objImages: [],      
        created_at: '',
        updated_at: '',
        deleted_at: ''})
    const [ errors, setErrors ] = useState({
        nombre: '',
        descripcion: '',
        precio_venta_normal: '',
        stock: '',
        unidad_id: '',
        marca_id: '',
        categoria_id: '',
        sub_categoria_id: '',
        impuesto_id: ''})
    const [ accion, setAccion ] = useState(null)
    const [ imageCtrl, setimageCtrl ] = useState(null)    
    const pantalla = useSelector(state => state.PantallasReducer.pantalla)
    const dispatch = useDispatch()
    const history = useHistory()
    const inputFileRef = useRef()   //Referencia al control inputFile (para la busqueda y carga de imágenes)
    const imgRef = useRef([])   //Referencia a loscontroles images  (para mostrar las imágenes cargadas)


    useEffect(()=> {
        dispatch({type: subCategoriasTypes.VACIAR_LISTADO_TODAS_LAS_SUBCATEGORIAS})
        dispatch(getAllUnidades())
        dispatch(marcasGetAll())
        dispatch(categoriasGetAll())
        dispatch(impuestosGetAll())
    },[dispatch])


    useEffect(()=>{
        if(id){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(find(id))
        }else{
            dispatch({type: productosTypes.NUEVO_PRODUCTO})
            dispatch({type: subCategoriasTypes.VACIAR_LISTADO_TODAS_LAS_SUBCATEGORIAS})
        }
    },[id, dispatch])


    useEffect(()=>{
        dispatch(findByUrl(currentUrl))
    },[currentUrl, dispatch])


    useEffect(()=> {
        if(productoState){
            setProducto(productoState)
            dispatch(subCategoriasGetAll(productoState.categoria_id))
        }
    },[dispatch, productoState])

    
    useEffect(()=> {
        if(tipoAlerta === 'success'){
            history.push('/'+currentUrl)
        }
    },[tipoAlerta, history, currentUrl])

    
    const response = (e) => {
        if(e){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            if(accion === 'grabar'){
                if(id){
                    dispatch(update(id, producto))
                }else{
                    dispatch(insert(producto))
                }
            }else{
                dispatch(deleteReg(id))
            }
        }
    }


    const handlerChangeValue = (e) => {
        if(e.target.name === 'impuestos_id'){
            let value = Array.from(e.target.selectedOptions, option => option.value)
            setProducto({...producto, [e.target.name]: value})
        }else{
            validaDatos(e.target.name, e.target.value)
            setProducto({
                ...producto,
                [e.target.name]: e.target.value 
            })
        }

        //Cargando las sub-categorías
        if(e.target.name === 'categoria_id'){
            if(e.target.selectedIndex > 0){
                dispatch(subCategoriasGetAll(e.target.value))
            }else{
                dispatch({type: subCategoriasTypes.VACIAR_LISTADO_TODAS_LAS_SUBCATEGORIAS})
            }
        }
    }


    const grabar = (e) => {
        setAccion('grabar')
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea grabar el registro?', tipo: 'Grabar'}})
    }


    const eliminar = (e) => {
        setAccion('eliminar')
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', tipo: 'Eliminar'}})
    }


    const handlerBtnCancelar = (e) => {
        history.push('/'+currentUrl)
    }


    const validaDatos = (field, value) => {
        switch(field){
            case 'nombre':
                return validarTexto(field, value, true, 3, 255, 
                    {
                        msgObligatorio: 'El nombre es obligatorio',
                        msgMin: 'El nombre debe tener como máximo 255 carácteres. Ingresa un nombre más corto.', 
                        msgMax: 'El nombre debe tener como mínimo 3 carácteres. Ingresa un nombre más largo.'  
                    }
                )
            case 'descripcion':
                return validarTexto(field, value, true, 10, 500, 
                    {
                        msgObligatorio: 'La descripción es obligatoria',
                        msgMin: 'La descripción debe tener como máximo 500 carácteres. Ingresa una descripción más corta.', 
                        msgMax: 'La descripción debe tener como mínimo 10 carácteres. Ingresa una descripción más larga.'}
                )
            case 'precio_venta_normal':
                return validarNumero(field, value, true, 0, null, 
                    {
                        msgObligatorio: 'Debe ingresar el precio normal del producto.',
                        msgMin: 'El precio normal debe ser igual o mayor a cero (0).', 
                    }
                )
            case 'stock':
                return validarNumero(field, value, true, 0, null, 
                    {
                        msgObligatorio: 'Debe ingresar el stock actual del producto.',
                        msgMin: 'El stock debe ser un número positivo.',
                    }
                )
            case 'unidad_id':
                return validaSelect(field, value, true, {msgObligatorio: 'Debe seleccionar un tipo de unidad.'})
            case 'marca_id':
                return validaSelect(field, value, true, {msgObligatorio: 'Debe seleccionar la marca.'})
            case 'categoria_id':
                return validaSelect(field, value, true, {msgObligatorio: 'Debe seleccionar una categoría.'})
            case 'sub_categoria_id':
                return validaSelect(field, value, true, {msgObligatorio: 'Debe seleccionar una sub-categoría.'})
            default:
                setErrors({...errors, [field]: ''})
                return true
        }
    }


    const validarTexto = (field, value, obligatorio, min, max, mensajes) => {
        let res = false
        if(obligatorio && value.length === 0){
            setErrors({...errors, [field]: mensajes.msgObligatorio ? mensajes.msgObligatorio : 'El campo es obligatorio.'})
        }else if(value.length < min){
            setErrors({...errors, [field]: mensajes.msgMin ? mensajes.msgMin : 'El valor ingresado es demasiado corto.'})
        }else if(max !== null && value.length > max){
            setErrors({...errors, [field]: mensajes.msgMax ? mensajes.msgMax : 'El valor ingresado es demasiado largo.'})
        }else{
            setErrors({...errors, [field]: ''})
            res = true
        }
        return res
    }


    const validarNumero = (field, value, obligatorio, min, max, mensajes) => {
        let res = false
        if(obligatorio && value === ''){
            setErrors({...errors, [field]: mensajes.msgObligatorio ? mensajes.msgObligatorio : 'Debe ingresar un número.'})
        }else if(isNaN(value) && value !== ''){
            setErrors({...errors, [field]: 'Debe ingresar sólo números.'})
        }else if(min !== null&& value < min){
            setErrors({...errors, [field]: mensajes.msgMin ? mensajes.msgMin : `El número no puede ser menor a ${min}`})
        }else if(max !== null && value > max){
            setErrors({...errors, [field]: mensajes.msgMax ? mensajes.msgMax : `El número no puede ser mayor a ${max}`})
        }else{
            setErrors({...errors, [field]: ''})
            res = true
        }
        return res
    }


    const validaSelect = (field, value, obligatorio, mensajes) => {
        let res = false
        if(obligatorio && !value){
            setErrors({...errors, [field]: mensajes.msgObligatorio ? mensajes.msgObligatorio : 'Debe seleccionar una opción'})
        }else{
            setErrors({...errors, [field]: ''})
            res = true
        }
        return res
    }


    const formatDate = (fecha) => {
        return fecha.substr(0,10).split('-').reverse().join('-')
    }


    const loadImage = () => {
        setimageCtrl(null)
        inputFileRef.current.click()
    }


    const changeImage = (key) => {
        setimageCtrl(key)
        inputFileRef.current.click()
    }


    const removeImage = (idRemove) => {
        setProducto({
            ...producto, 
            imagenes: [...producto.imagenes.filter(i => i.id !== idRemove)],
            //objImages: [producto.imagenes.filter(i => i.id !== idRemove).map(i => i.obj)]
        })   
    }


    const selectDefaultImage = (id) => {
        let images = producto.imagenes.map(element => {
            element.imagen_principal = element.id === id ? 1 : 0
            return element
            }
        );
        setProducto({...producto, imagenes:[...images]})
    }


    const refreshImage = (e) => {
        if(imageCtrl !== null){
            if(e.target.files.length > 0){
                setProducto({
                    ...producto, 

                    imagenes: [...producto.imagenes.map(i => {
                            if(i.id === imageCtrl){
                                i.source_image = e.target.value.split('\\')[2]
                                i.obj = URL.createObjectURL(e.target.files[0])
                                i.file = e.target.files[0]
                            }
                            return i
                        })],
                })
            }
            setimageCtrl(null)
         
        }else{
            if(e.target.files.length > 1){
                uploadMultipleFiles(e.target.files)
            }else if(e.target.files.length === 1){
                uploadSingleFile(e.target.value.split('\\')[2], e.target.files[0])
            }
        }
    }


    const uploadSingleFile = (source_image, obj) => {
        let imgs = producto.imagenes
        imgs.push({id: Math.random()*-1,source_image, file: obj, imagen_principal: 0, obj: URL.createObjectURL(obj)})
        setProducto({
            ...producto, 
            imagenes: [...imgs]
        })
    }


    const uploadMultipleFiles = (e) => {
        let imgs = producto.imagenes
        for(var x = 0; x < e.length; x++){
            imgs.push({id: Math.random()*-1,source_image: e[x].name, file: e[x], obj: URL.createObjectURL(e[x]), imagen_principal: 0})
        };
        setProducto({
            ...producto, 
            imagenes: [...imgs]
        })
    }


    const getImage = (i) => {
        if(i.obj === null || i.obj === undefined){
            let src = defaultImagesProducts + i.source_image
            return src
        }else{
            return i.obj
        } 
    }

    
    return (
        <ProductosFormContent 
            response={response} 
            pantalla={pantalla} 
            producto={producto} 
            handlerChangeValue={handlerChangeValue} 
            errors={errors} 
            formatDate={formatDate} 
            unidades={unidades}
            marcas={marcas}
            categorias={categorias}
            subCategorias={subCategorias} 
            impuestos={impuestos} 
            loadImage={loadImage} 
            inputFileRef={inputFileRef} 
            refreshImage={refreshImage} 
            getImage={getImage} 
            imgRef={imgRef} 
            changeImage={changeImage} 
            selectDefaultImage={selectDefaultImage}
            removeImage={removeImage} 
            grabar={grabar} 
            eliminar={eliminar} 
            handlerBtnCancelar={handlerBtnCancelar} 
            id={id}
        />       
    )
}