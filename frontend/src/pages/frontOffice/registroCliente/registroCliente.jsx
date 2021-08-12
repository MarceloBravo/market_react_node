import { useState, useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listar as listarRegiones } from '../../../actions/regiones'
import { listaProvinciasRegion } from '../../../actions/provincias'
import { listaComunasProvincia } from '../../../actions/comunas'
import { validaRut, validaPassword, isEmail } from '../../../shared/funciones'
import { types as clientesTypes } from '../../../redux/Clientes/types'
import { types as spinnerTypes }  from '../../../redux/Spinner/types'
import { types as modalTypes }  from '../../../redux/ModalDialog/types'
import { insert, findByRut, emailIsInUse, update, find } from '../../../actions/clientes'
import { RegistroClienteContent } from './content'
import './style.css'


export const RegistroClientes = (props) => {
    const id = useParams()
    const [ regiones, setRegiones ] = useState([])
    const [ provincias, setProvincias ] = useState([])
    const [ comunas, setComunas ] = useState([])
    const [ cliente, setCliente ] = useState({rut: '', nombres: '', apellido1: '', apellido2: '', fono: '', email: '', password: '', confirm_password: '', direccion: '', cod_region: '', cod_provincia: '', cod_comuna: '', ciudad: '', casa_num: '', block_num: '', referencia: '', objImagen: null})
    const listaRegionesState = useSelector(state => state.RegionesReducer.list)
    const listaProvinciasState = useSelector(state => state.ProvinciasReducer.list)
    const listaComunasState = useSelector(state => state.ComunasReducer.list)
    const tipoRespuestaState = useSelector(state => state.AlertaReducer.tipo)
    const clienteState = useSelector(state => state.ClientesReducer.cliente)
    const [ errors, setErrors ] = useState({rut: '', nombres: '', apellido1: '', apellido2: '', fono: '', email: '', password: '', confirm_password: '', direccion: '', cod_region: '', ciudad: '', cod_comuna: '', casa_num: '', block_num: '', referencia: ''})
    const [ buscarRut, setBuscarRut ] = useState(false)
    const [ buscarEmail, setBuscarEmail ] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const fileReference = useRef(null)


    useEffect(()=>{
        dispatch(listarRegiones())
    },[dispatch])


    useEffect(()=>{
        if(id){
            dispatch(find(id.id))
        }
    },[id, dispatch])


    useEffect(()=>{
        setRegiones(listaRegionesState.sort((a,b) => a.codigo - b.codigo))
    },[listaRegionesState])


    useEffect(()=>{
        setProvincias(listaProvinciasState.sort((a,b) => a.codigo - b.codigo))
    },[listaProvinciasState])


    useEffect(()=>{
        setComunas(listaComunasState.sort((a,b) => a.codigo - b.codigo))
    },[listaComunasState])

    
    useEffect(()=>{
        if(tipoRespuestaState === 'success'){
            history.push('/info')
        }
    },[history, tipoRespuestaState])


    useEffect(()=>{
        console.log('xxxxxxxxxxxx',clienteState)
        if(clienteState?.id){
            if(buscarRut){
                setBuscarRut(false)
                let cliObj = JSON.parse(JSON.stringify(clienteState))
                cliObj.password = ''
                cliObj.confirm_password = ''
                setCliente(cliObj)
                dispatch(listaProvinciasRegion(cliObj.cod_region))
                dispatch(listaComunasProvincia(cliObj.cod_provincia))
            }else if(buscarEmail){
                setBuscarEmail(false)
                setErrors({...errors, email: 'El email ya se encuentra en uso'})
            }else{
                console.log('clienteState',clienteState)
                setCliente(clienteState)
            }
        }

        // eslint-disable-next-line
    },[clienteState, dispatch])


    const cargarProvincias = (e) => {
        dispatch(listaProvinciasRegion(e.target.value))
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }


    const cargarComunas = (e) => {
        dispatch(listaComunasProvincia(e.target.value))
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }



    const handlerChangeValue = (e) => {
        if(e.target.name === 'rut'){
            setBuscarRut(true)
            setBuscarEmail(false)
            dispatch(findByRut(e.target.value))
        }
        if(e.target.name === 'email' && cliente.rut !== ''){
            setBuscarEmail(true)
            setBuscarRut(false)
            dispatch(emailIsInUse(e.target.value, cliente.rut))
        }
        
        validaDatos(e.target.name, e.target.value)
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }


    const registrar = () => {
        dispatch({type: modalTypes.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Deseas grabar los datos?', titulo: 'Grabar'}})
        dispatch({type: clientesTypes.INSERTAR_CLIENTES})
    }


    const response = (e) => {
        if(e){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            if(cliente.id){
                dispatch(update(cliente.id, cliente))
            }else{
                dispatch(insert(cliente))
            }
        }
    }


    const goToLogin = () => {
        history.push('/loginCliente')
    }
    

    const fnRefgreshImage = (e) => {
        //La arrow function actualiza el estado del useState sin necesidad de utilizar el useEffect
        //Al no utilizar la arrow function el objeto usuario recibe el nuevo estado, pero no se ve 
        //reflejado a menos que se utilize un useEffect o una función de flecha como la utilizada
        //esto permite que la nueva imágen seleccionada se vea reflejada en el control image
        if(e.target.files.length > 0){
            setCliente(cliente => ({...cliente, foto: e.target.value.split('\\')[2], objImagen: URL.createObjectURL(e.target.files[0])})) 
        }
    }


    const fnLoadImage = (e) => {
        fileReference.current.click()
    }


    const validaDatos = (field, value) => {
        switch(field){
            case 'rut':
                if(value.length > 14 || !validaRut(value.split('.').join(''))){
                    setErrors({...errors, [field]:'El rut ingresado no es válido'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'nombres':
                if(value.length === 0){
                    setErrors({...errors, [field]:'El nombre es obligatorio.'})
                }else if(value.length < 3){
                    setErrors({...errors, [field]:'Ingrese un nombre más largo.'})
                }else if(value.length > 50 ){
                    setErrors({...errors, [field]:'Ingrese un nombre más corto.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'apellido1':
            case 'apellido2':
                if(value.length === 0 && field === 'apellido1'){
                    setErrors({...errors, [field]:'El apellido es obligatorio.'})
                }else if(value.length < 3){
                    setErrors({...errors, [field]:'Ingrese un apellido más largo.'})
                }else if(value.length > 50 ){
                    setErrors({...errors, [field]:'Ingrese un apellido más corto.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'direccion':
                if(value.length === 0){
                    setErrors({...errors, [field]:'La dirección es obligatoria.'})
                }else if(value.length < 7){
                    setErrors({...errors, [field]:'Ingrese una dirección más larga.'})
                }else if(value.length > 255 ){
                    setErrors({...errors, [field]:'Ingrese una dirección más corta.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'cod_region':
            case 'cod_provincia':
            case 'cod_comuna':
                if(value.length === 0){
                    setErrors({...errors, [field]:`Dbe seleccionar una ${field === 'cod_region' ? 'región' : (field === 'cod_provincia' ? 'provincia' : 'comuna')}.`})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'ciudad':
                if(value.length === 0){
                    setErrors({...errors, [field]:'La ciudad es obligatoria.'})
                }else if(value.length < 3){
                    setErrors({...errors, [field]:'Ingrese una ciudad más larga.'})
                }else if(value.length > 20 ){
                    setErrors({...errors, [field]:'Ingrese una ciudad más corta.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'fono':
                if(value.length === 0){
                    setErrors({...errors, [field]:'Debe ingresar un número celular.'})
                }else if(value.length < 7){
                    setErrors({...errors, [field]:'Ingrese un número más largo.'})
                }else if(value.length > 20 ){
                    setErrors({...errors, [field]:'Ingrese un número más corto.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'email':
                if(!isEmail(value)){
                    setErrors({...errors, [field]:'El email ingresado no es válido.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'case_num':
                if(value.length === 0){
                    setErrors({...errors, [field]:'El número de casa es obligatorio.'})
                }else if(value.length > 10 ){
                    setErrors({...errors, [field]:'Ingrese un número más corto.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'block_num':
                if(value.length > 10 ){
                    setErrors({...errors, [field]:'Ingrese un número más corto.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'referencia':
                if(value.length > 255 ){
                    setErrors({...errors, [field]:'Ingrese una referencia más corta.'})
                }else{
                    setErrors({...errors, [field]: ''})
                }
                break
            case 'password':
                validaPassword(field, 'password',value, 'confirm_password', cliente.confirm_password, errors, setErrors)
                break
            case 'confirm_password':
                validaPassword(field, 'password', cliente.password, 'confirm_password', value, errors, setErrors)
                break
            default:
                setErrors({...errors, [field]: ''})
        }
    }

    
    return (
        <RegistroClienteContent 
            response={response} 
            cliente={cliente} 
            fnLoadImage={fnLoadImage} 
            fileReference={fileReference} 
            fnRefgreshImage={fnRefgreshImage} 
            errors={errors} 
            handlerChangeValue={handlerChangeValue} 
            regiones={regiones}
            provincias={provincias}
            comunas={comunas}
            cargarProvincias={cargarProvincias}
            cargarComunas={cargarComunas}
            registrar={registrar}
            goToLogin={goToLogin}
        />
    )
    
}