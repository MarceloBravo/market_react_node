import { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { find, insert, update, deleteReg } from '../../../../actions/clientes'
import { listar as listarRegiones } from '../../../../actions/regiones'
import { listaProvinciasRegion } from '../../../../actions/provincias'
import { listaComunasProvincia, listarComunasProvinciaRegion } from '../../../../actions/comunas'
import { validaRut, isEmail } from '../../../../shared/funciones'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { types as modalTypes } from '../../../../redux/ModalDialog/types'
import { types as alertaTypes } from '../../../../redux/Alert/types'
import { ClientesContent } from './content'

export const MntClientesContent = (props) => {
    const params = useParams('id')
    const clienteState = useSelector(state => state.ClientesReducer.cliente)
    const regionesState = useSelector(state => state.RegionesReducer.list)
    const provinciasState = useSelector(state => state.ProvinciasReducer.list)
    const comunasState = useSelector(state => state.ComunasReducer.list)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const resultadoOperacionState = useSelector(state => state.AlertaReducer.tipo)
    const [ errors, setErrors ] = useState({rut: '', nombres: '', apellido1: '', apellido2: '', direccion: '', cod_region: '', cod_provincia: '', cod_comuna: '', ciudad: '', password: '', confirm_password: '', email: '', fono: '', foto: '', casa_num: '', block_num: '', referencia: ''})
    const [ cliente, setCliente ] = useState({rut: '', nombres: '', apellido1: '', apellido2: '', direccion: '', cod_region: '', cod_provincia: '', cod_comuna: '', ciudad: '', password: '', confirm_password: '', email: '', fono: '', foto: '', objImagen: null, casa_num: '', block_num: '', referencia: ''})
    const [ accion, setAccion ] = useState('grabar')
    const [ id ] = useState(params.id)
    const dispatch = useDispatch()
    const history = useHistory()
    const fileReference = useRef()


    useEffect(()=>{
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(listarRegiones())
    },[dispatch])


    useEffect(()=>{
        if(id){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            dispatch(find(id))
        }else{
            dispatch(listaProvinciasRegion('0'))
            dispatch(listaComunasProvincia('0'))
        }
    },[dispatch, id])


    useEffect(()=>{
        if(clienteState && id){
            setCliente(clienteState)
            if(clienteState.cod_region && clienteState.cod_region && clienteState.cod_provincia){
                //Cargando provincias
                dispatch(listaProvinciasRegion(clienteState.cod_region))
                //Cargando comunas
                dispatch(listarComunasProvinciaRegion(clienteState.cod_region, clienteState.cod_provincia))
            }
        }
    },[clienteState, dispatch, id])

    
    useEffect(()=>{
        if(resultadoOperacionState === 'success'){
            history.push('/clientes')
        }
    // eslint-disable-next-line
    },[resultadoOperacionState])


    const handlerChangeValue = (e) => {
        dispatch({type: alertaTypes.OCULTAR_ALERTA})
        validaDatos(e.target.name, e.target.value)

        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })

        switch(e.target.name){
            case 'cod_region':
                dispatch({type: spinnerTypes.SHOW_SPINNER})
                dispatch(listaProvinciasRegion(e.target.value))
                break;
            case 'cod_provincia':
                dispatch({type: spinnerTypes.SHOW_SPINNER})
                dispatch(listaComunasProvincia(e.target.value))
                break;
            default:
        }
    }


    const grabar = () => {
        Object.keys(cliente).forEach(f => validaDatos(f, cliente[f]))
        if(
            Object.keys(errors).filter(e => errors[e] !== '').length === 0 || 
            Object.keys(cliente).filter(e => cliente[e] !== '' && e !== 'objImagen').length !== 0
        ){
            dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: `¿Desea ${id ? 'actualizar los datos del ' : 'registrar el'} cliente?` , titulo: `${id ? 'Actualizar' : 'Ingresar'} cliente`}})
            setAccion('grabar')
        }else{
            dispatch({type: alertaTypes.MOSTRAR_ALERTA, payload: {mensaje: 'Existen datos incompletos o no válidos.', tipo: 'danger'}})
        }
    }

    const eliminar = () => {
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el cliente?' , titulo: 'Eliminar cliente'}})
        setAccion('eliminar')
    }


    const response = (resp) => {
        if(resp && accion){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            if(accion === 'grabar'){
                if(id){
                    dispatch(update(id, cliente))
                }else{
                    dispatch(insert(cliente))
                }
            }else{
                dispatch(deleteReg(id))
            }
        }
    }

    
    const cancelar = () => {
        history.push('/clientes')
    }


    const fnLoadImage = () => {
        fileReference.current.click()
    }


    const fnRefgreshImage = (e) => {        
        //La arrow function actualiza el estado del useState sin necesidad de utilizar el useEffect
        //Al no utilizar la arrow function el objeto usuario recibe el nuevo estado, pero no se ve 
        //reflejado a menos que se utilize un useEffect o una función de flecha como la utilizada
        //esto permite que la nueva imágen seleccionada se vea reflejada en el control image
        if(e.target.files.length > 0){
            setCliente(cliente => ({
                ...cliente, foto: e.target.value.split('\\')[2], 
                objImagen: URL.createObjectURL(e.target.files[0])
            })) 
        }
    }


    const validaDatos = (field, value) => {
        console.log('field', field, 'value', value)
        switch(field){
            case 'rut':
                console.log(validaRut(value) ? 'valido' : 'no valido', value)
               setErrors(prevState => ({...prevState,  rut: (!validaRut(value.split('.').join(''))) ? 'El rut ingresado no es válido.' : ''}))
                break;
            case 'nombres':
                if(value.length === 0){
                   setErrors(prevState => ({...prevState,  [field]: 'El nombre es obligatorio.'}))
                }else if(value.length > 50){
                   setErrors(prevState => ({...prevState,  [field]: 'El nombre ingresado es demasiado largo. Ingresa un nombre más corto.'}))
                }else if(value.length > 0 && value.length < 3){
                   setErrors(prevState => ({...prevState,  [field]: 'El nombre ingresado es demasiado corto. Ingresa un nombre más largo.'}))
                }else{
                   setErrors(prevState => ({...prevState,  [field]:  ''}))
                }
                break;
            case 'apellido1':
            case 'apellido2':
                if(field === 'apellido1' && value.length === 0){
                   setErrors(prevState => ({...prevState,  [field]: 'El primer apellido es obligatorio.'}))
                }else if(value.length > 50){
                   setErrors(prevState => ({...prevState,  [field]: 'El apellido ingresado es demasiado largo. Ingresa un apellido más corto.'}))
                }else if(value.length > 0 && value.length < 3){
                   setErrors(prevState => ({...prevState,  [field]: 'El apellido ingresado es demasiado corto. Ingresa un apellido más largo.'}))
                }else{
                   setErrors(prevState => ({...prevState,  [field]:  ''}))
                }
                break;
            case 'direccion':
                if(value.length === 0){
                   setErrors(prevState => ({...prevState,  [field]: 'La dirección es obligatoria.'}))
                }else if(value.length > 255){
                   setErrors(prevState => ({...prevState,  [field]: 'La dirección ingresada es demasiado larga. Ingresa una dirección más corta.'}))
                }else if(value.length > 0 && value.length < 5){
                   setErrors(prevState => ({...prevState,  [field]: 'La dirección ingresada es demasiado corta. Ingresa una dirección más larga.'}))
                }else{
                   setErrors(prevState => ({...prevState,  [field]:  ''}))
                }
                break;
            case 'cod_region':
            case 'cod_provincia':
            case 'cod_comuna':
                if(value.length === 0){
                   setErrors(prevState => ({...prevState,  [field]: `Debes seleccionar una ${field === 'cod_region' ? 'región' : (field === 'cod_provincia' ? 'provincia' : 'comuna')}.`}))
                }else{
                   setErrors(prevState => ({...prevState,  [field]:  ''}))
                }
                break;
            case 'ciudad':
                if(value.length === 0){
                   setErrors(prevState => ({...prevState,  [field]: 'Debes ingresar el nombre de la ciudad del cliente.'}))
                }else if(value.length > 20){
                   setErrors(prevState => ({...prevState,  [field]: 'La ciudad ingresada es demasiado larga. Ingresa una ciudad más corta.'}))
                }else if(value.length > 0 && value.length < 3){
                   setErrors(prevState => ({...prevState,  [field]: 'La ciudad ingresada es demasiado corta. Ingresa una ciudad más larga.'}))
                }else{
                   setErrors(prevState => ({...prevState,  [field]:  ''}))
                }
                break;
            case 'email':
                if(value.length === 0){
                   setErrors(prevState => ({...prevState,  [field]: 'Debes ingresar un correo electrónico.'}))
                }else if(!isEmail(value)){
                   setErrors(prevState => ({...prevState,  [field]: 'El correo electrónico ingresado no es válido.'}))
                }else{
                   setErrors(prevState => ({...prevState,  [field]:  ''}))
                }
                break;
            case 'fono':
                if(value.length === 0){
                   setErrors(prevState => ({...prevState,  [field]: 'Debes ingresar un número de teléfono de contacto del cliente.'}))
                }else if(value.length > 20){
                   setErrors(prevState => ({...prevState,  [field]: 'El número ingresado es demasiado largo. Ingresa un número más corto.'}))
                }else if(value.length > 0 && value.length < 6){
                   setErrors(prevState => ({...prevState,  [field]: 'El número ingresado es demasiado corta. Ingresa un número más largo.'}))
                }else{
                   setErrors(prevState => ({...prevState,  [field]:  ''}))
                }
                break;
            case 'casa_num':
            case 'block_num':
                if(field === 'casa_num' && value.length === 0){
                   setErrors(prevState => ({...prevState,  [field]: 'Debes ingresar el número de casa del cliente.'}))
                }else if(value.length > 10){
                   setErrors(prevState => ({...prevState,  [field]: 'El número ingresado es demasiado largo. Ingresa un número más corto.'}))
                }else if(!isNaN(value) && parseInt(value) <= 0){
                   setErrors(prevState => ({...prevState,  [field]: 'El número ingresado  debe ser un número positivo.'}))
                }else{
                   setErrors(prevState => ({...prevState,  [field]:  ''}))
                }
                break;
            case 'referencia':
                if(value.length > 255){
                   setErrors(prevState => ({...prevState,  [field]: 'Las referencia ingresada es demasiado larga. Ingresa una referencia más corta.'}))
                }else if(value.length > 0 && value.length < 6){
                   setErrors(prevState => ({...prevState,  [field]: 'La referencia ingresada es demasiado corta. Ingresa una referencia más largo.'}))
                }else{
                   setErrors(prevState => ({...prevState,  [field]:  ''}))
                }
                break;
            case 'password':                
                validaPassword(field, value, cliente.confirm_password)
                break;
            case 'confirm_password':
                validaPassword(field, cliente.password, value)
                break;
            default:
               setErrors(prevState => ({...prevState,  [field]:  ''}))
        }
    }

    const validaPassword = (campo, pwd, confirmPwd) =>{
        let valor = campo === 'password' ? pwd : confirmPwd;
        let fieldStr = campo === 'password' ? 'contraseña' : 'confirmación de contraseña';

        if(valor.length < 6){
            setErrors(prevState => ({...prevState, [campo]: `La ${fieldStr} debe tener almenos 6 caráctreres. Ingresa una ${fieldStr} más larga.`}))
        }else if(valor.length > 20){
            setErrors(prevState => ({...prevState, [campo]: `La ${fieldStr} debe tener un máximo de 20 caráctreres. Ingresa una ${fieldStr} más corta.`}))
        }else if(pwd !== confirmPwd){
            setErrors(prevState => ({...prevState, [campo]: 'La contraseña y la confirmación de contraseña no coinciden.'}))
        }else {
            if(
                (campo === 'confirm_password' && valor === cliente.password) || 
                (campo === 'password' && valor === cliente.confirm_password)
            ){
                setErrors(prevState => ({...prevState, password: '', confirm_password: ''}))
            }else{
                setErrors(prevState => ({...prevState, [campo]: ''}))
            }  
        }
    }

    return (
        <ClientesContent 
            response={response} 
            cliente={cliente} 
            errors={errors} 
            handlerChangeValue={handlerChangeValue} 
            fnLoadImage={fnLoadImage} 
            fileReference={fileReference} 
            fnRefgreshImage={fnRefgreshImage} 
            regionesState={regionesState} 
            provinciasState={provinciasState} 
            comunasState={comunasState} 
            grabar={grabar} 
            eliminar={eliminar} 
            cancelar={cancelar} 
            id={id} 
            togleMenu={togleMenu}
        />
    )
}