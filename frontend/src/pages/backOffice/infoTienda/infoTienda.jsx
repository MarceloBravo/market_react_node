import { useState, useEffect } from 'react'
import { types as modalDialogTypes } from '../../../redux/ModalDialog/types'
import { useSelector, useDispatch } from 'react-redux'
import { isEmail } from '../../../shared/funciones'
import { getData, save } from '../../../actions/infoTienda'
import { useHistory } from 'react-router-dom'
import { types as spinnerTypes } from '../../../redux/Spinner/types'
import { InfoTiendaContent } from './content'

export const InfoTiendaFormComponent = () => {
    const id = 1
    const [ infoTienda, setInfoTienda ] = useState({nombre_tienda: '', fono_venta: '', email: '', direccion:'', comuna:'', ciudad: ''})
    const [ errors, setErrors ] = useState({nombre_tienda: '', fono_venta: '', email: '', direccion:'', comuna:'', ciudad: ''})
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)
    const dispatch = useDispatch()
    const history = useHistory()


    useEffect(() => {
        dispatch(getData())
    },[dispatch])


    useEffect(()=>{
        if(infoTiendaState){
            setInfoTienda(infoTiendaState)
        }
    },[infoTiendaState])


    const response = (res) => {
        if(res){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(save(infoTienda))
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
        dispatch({type: modalDialogTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Deseas actualizar los datos?', titulo: 'Actualizar datos tienda'}})
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


    return (
        <InfoTiendaContent
            response={response} 
            infoTienda={infoTienda} 
            handlerChangeValue={handlerChangeValue} 
            errors={errors} 
            grabar={grabar} 
            handlerBtnCancelar={handlerBtnCancelar} 
            id={id}
        />
    )
}