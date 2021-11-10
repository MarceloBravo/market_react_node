import { useState, useEffect, useRef } from 'react'
import { types as modalDialogTypes } from '../../../redux/ModalDialog/types'
import { useSelector, useDispatch } from 'react-redux'
import { isEmail } from '../../../shared/funciones'
import { getData, save } from '../../../actions/infoTienda'
import { getData as getDataMarquesina, save as saveMarquesina } from '../../../actions/imagenesMarquesina'
import { useHistory } from 'react-router-dom'
import { types as spinnerTypes } from '../../../redux/Spinner/types'
import { InfoTiendaContent } from './content'
import { defaultImagesTienda } from '../../../shared/constantes'
import { types as modalTypes } from '../../../redux/ModalDialog/types'
import { findByUrl as infoPantalla } from '../../../actions/pantallas'
import { types as alertasTypes }  from '../../../redux/Alert/types'

export const InfoTiendaFormComponent = () => {    
    const id = 1
    const currentUrl = window.location.pathname.split('/')[1]
    //const [ activeKey, setActiveKey ] = useState(0)
    const [ seccion, setSeccion ] = useState('info_tienda') //Indica la seccion a la cual se actualizarán los datos (info_tienda, marquesina)
    const [ infoTienda, setInfoTienda ] = useState({nombre_tienda: '', fono_venta: '', email: '', direccion:'', comuna:'', ciudad: ''})
    const [ errors, setErrors ] = useState({nombre_tienda: '', fono_venta: '', email: '', direccion:'', comuna:'', ciudad: ''})
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)
    const imagenesMarquesinaState = useSelector(state => state.ImagenesMarquesinaReducer)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    //const currentPantalla = useSelector(state => state.PantallasReducer.pantalla);    
    const [ imagenesMarquesina, setImagenesMarquesina ] = useState({
        imagenes: [],
        objImage: []
    })
    const dispatch = useDispatch()
    const history = useHistory()
    const [ imageCtrl, setimageCtrl ] = useState(null)
    const inputFileRef = useRef()
    const imgRef = useRef([])


    useEffect(() => {
        dispatch(getData())
        dispatch(getDataMarquesina())
        dispatch(infoPantalla(currentUrl))
    },[currentUrl, dispatch])


    useEffect(()=>{
        if(infoTiendaState){
            setInfoTienda(infoTiendaState)
        }
    },[infoTiendaState])


    useEffect(()=>{
        if(imagenesMarquesinaState){
            setImagenesMarquesina(imagenesMarquesinaState)
        }
    },[imagenesMarquesinaState])


    const response = (res) => {
        if(res){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            if(seccion === 'info_tienda'){
                dispatch(save(infoTienda))
            }else{
                dispatch(saveMarquesina(imagenesMarquesina))
            }
        }
    }


    const handlerChangeValue = (e) => {
        validaDatos(e.target.name, e.target.value)
        setInfoTienda({
            ...infoTiendaState,
            [e.target.name]: e.target.value
        })
    }


    const grabar = () => {
        setSeccion('info_tienda')
        dispatch({type: modalDialogTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Deseas actualizar la información de la tienda?', titulo: 'Actualizar datos tienda'}})
    }


    const handlerBtnCancelar = () => {
        history.push('/home')
    }


    const validaDatos = (field, value) => {
        let res = false;
        switch(field){
            case 'nombre_tienda':
                if(value.length === 0){
                    setErrors({...errors, [field]: 'Debe ingresar el nombre de la tienda.'})
                }else if(value.length < 3){
                    setErrors({...errors, [field]: 'El nombre de la tienda debe tener almenos 3 carácteres. Ingresa un nombre más largo.'})
                }else if(value.length > 100){
                    setErrors({...errors, [field]: 'El nombre de la tienda debe tener hasta 100 carácteres. Ingresa un nombre más corto.'})
                }else{
                    setErrors({...errors, [field]:''})
                    res = true
                }
                break;
            case 'fono_venta':
                if(value.length === 0){
                    setErrors({...errors, [field]: 'Debe ingresar el teléfono de venta de la tienda.'})
                }else if(value.length < 6){
                    setErrors({...errors, [field]: 'El teléfono debe tener almenos 6 carácteres. Ingresa un fono más largo.'})
                }else if(value.length > 30){
                    setErrors({...errors, [field]: 'El teléfono debe tener hasta 30 carácteres. Ingresa un fono más corto.'})
                }else{
                    setErrors({...errors, [field]:''})
                    res = true
                }
                break;
            case 'email':
                if(value.length === 0){
                    setErrors({...errors, [field]: 'Debe ingresar el email de contacto.'})
                }else if(!isEmail(value)){
                    setErrors({...errors, [field]: 'El email ingresado no es válido.'})
                }else if(value.length > 150){
                    setErrors({...errors, [field]: 'El email debe tener hasta 150 carácteres. Ingresa un email más corto.'})
                }else{
                    setErrors({...errors, [field]:''})
                    res = true
                }
                break;
            case 'direccion':
                if(value.length === 0){
                    setErrors({...errors, [field]: 'Debe ingresar una dirección para la tienda.'})
                }else if(value.length < 6){
                    setErrors({...errors, [field]: 'La dirección debe tener almenos 10 carácteres. Ingresa una dirección más larga.'})
                }else if(value.length > 150){
                    setErrors({...errors, [field]: 'La dirección debe tener hasta 255 carácteres. Ingresa una dirección más corta.'})
                }else{
                    setErrors({...errors, [field]:''})
                    res = true
                }
                break;
            default:
                setErrors({...errors, [field]: ''})
                res = true
        }
        return res
    } 

    

    // FUNCIONES PARA EL MANEJO DE LAS IMÁGENES DE LA MARQUESINA DESLIZANTE DE LA PÁGINA HOME 
    const handleFieldsImages = (id, e) => {
        validaDatosMarquesina(id, e.target.name, e.target.value)
        let imgs = imagenesMarquesina.imagenes 
        if(imgs.length > 0){
            imgs.forEach(i => {
                    if(i.id === id){
                        i[e.target.name]= e.target.value 
                    }
                }
            )
        }else{
            let newState = {...imgs, [e.target.name]: e.target.value}
            imgs.push(newState)
        }
        
        setImagenesMarquesina({
            ...imagenesMarquesina,
            imagenes: imgs
        })
    }
    
    const grabarMarquesina = () => {
        setSeccion('marquesina')
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Deseas actualizar las imágenes de la marquesina?', titulo: 'Actualizar marquesina'}})
    }

    const loadImage = () => {
        setimageCtrl(null)
        inputFileRef.current.click()
    }


    const refreshImage = (e) => {
        if(imageCtrl !== null){
            if(e.target.files.length > 0){
                setImagenesMarquesina({
                    ...imagenesMarquesina, 

                    imagenes: [...imagenesMarquesina.imagenes.map(i => {
                            if(i.id === imageCtrl){
                                i.src_imagen = e.target.value.split('\\')[2]
                                i.obj = URL.createObjectURL(e.target.files[0])
                                i.file = e.target.files[0]
                                i.errors = []
                            }
                            return i
                        })],
                    objImage: [...imagenesMarquesina.imagenes.map(i => i.obj)]
                })
            }
            setimageCtrl(null)
         
        }else{
            uploadSingleFile(e.target.value.split('\\')[2], e.target.files[0])
        }
    }


    const uploadSingleFile = (src_imagen, obj) => {
        let imgs = imagenesMarquesina.imagenes
        let id = Math.random()*-1
        imgs.push({
            id,
            src_imagen, 
            file: obj, 
            texto: '', 
            posicion: 0, 
            link: '',
            obj: URL.createObjectURL(obj),
            errors: {id, texto: '', posicion: '', link: ''}
        })
        setImagenesMarquesina({
            ...imagenesMarquesina, 
            imagenes: [...imgs],
            objImage: [...imgs.map(i => i.obj)]
        })
    }


    const getImage = (i) => {
        if(i.obj === null || i.obj === undefined){
            let src = defaultImagesTienda + i.src_imagen
            return src
        }else{
            return i.obj
        }
    }


    const changeImage = (key) => {
        setimageCtrl(key)
        inputFileRef.current.click()
    }


    const removeImage = (idRemove) => {
        setImagenesMarquesina({
            ...imagenesMarquesina, 
            imagenes: [...imagenesMarquesina.imagenes.filter(i => i.id !== idRemove)]
        })
    }


    const hideAlert = () => {
        dispatch({type: alertasTypes.OCULTAR_ALERTA})
    }
    
    const validaDatosMarquesina = (id, field, value) => {
        let imgs = imagenesMarquesina.imagenes
        if(imgs.length > 0){
            imgs.forEach(e => {
                    if(e.id === id){
                        //console.log(e.id, id, e.id === id)
                        if(!e.errors){e.errors = []}
                        e.errors[field]= validaCampoMarquesina(field, value)
                    }
                }
            )
        }
        setImagenesMarquesina({...imagenesMarquesina, imagenes: imgs})
    }


    const validaCampoMarquesina = (field, value) => {
        let res
        switch(field){
            case 'texto':
                if(value.length > 200){ res = 'El texto de la imágen es muy largo. Ingresa un texto más breve.' }
                break;
            case 'link':
                if(value.length > 200){ res = 'El link ingresado es muy largo. Ingresa un link más breve.' }
                break;
            case 'posicion':
                if(value < 0){ res = 'La posición debe ser un número positivo.' }
                break;
            default: 
                res = ''
        }
        return res;
    }
    // FIN FUNCIONES PARA EL MANEJO DE LAS IMÁGENES DE LA MARQUESINA DESLIZANTE DE LA PÁGINA HOME 


    return (
        <InfoTiendaContent
            response={response} 
            infoTienda={infoTienda} 
            handlerChangeValue={handlerChangeValue} 
            errors={errors} 
            grabar={grabar} 
            grabarMarquesina={grabarMarquesina}
            handlerBtnCancelar={handlerBtnCancelar} 
            id={id}
            imagenesMarquesina={imagenesMarquesina} 
            loadImage={loadImage} 
            inputFileRef={inputFileRef} 
            refreshImage={refreshImage}
            getImage={getImage} 
            imgRef={imgRef} 
            changeImage={changeImage} 
            removeImage={removeImage}
            handleFieldsImages={handleFieldsImages}
            hideAlert={hideAlert}
            togleMenu={togleMenu}
            //activeKey={activeKey}
        />
    )
}