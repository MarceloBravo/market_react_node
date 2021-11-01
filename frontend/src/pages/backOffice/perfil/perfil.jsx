import { useState, useEffect, useRef } from  'react'
import { useSelector, useDispatch } from 'react-redux'
import { types } from '../../../redux/ModalDialog/types'
import { validaDatos } from '../../../shared/funcionesMntUsuarios'
import { actualizar } from '../../../actions/usuarios'
import { useHistory } from 'react-router'
import { PerfilContent } from './content'

export const Perfil = () => {
    const logedUser = useSelector(state => state.LoginReducer.logedUser)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const [ usuario, setUsuario ] = useState({id: '', name: '', a_paterno: '', a_materno: '', direccion: '', email: '', fono: '', foto: '', objFile:'', password: '', confirm_password: '', roles:[]})
    const [ errors, setErrors ] = useState({name: '', a_paterno: '', a_materno: '', direccion: '', email: '', fono: '', foto:'', password: '', confirm_password: ''})
    const dispatch = useDispatch()
    const history = useHistory()
    const fileAvatar = useRef(null)

    
    useEffect(()=>{
        if(logedUser?.user){
            logedUser.user.objFile = ''
            setUsuario(logedUser.user)
        }
    },[logedUser])


    const response = (e) => {
        if(e){
            dispatch(actualizar(usuario.id, usuario))
        }
    }


    const handlerChangeValue = (e) => {
        if(validaDatos(e.target.name, e.target.value, usuario, setErrors, errors)){
            setUsuario({
                ...usuario,
                [e.target.name]: e.target.value
            })
        }else{
            console.log(e.target.name, e.target.value)
            console.log('Datos NO válidos')
        }
    }

    const grabar = e => {
        let fails = Object.keys(usuario).map(u => validaDatos(u, usuario[u], usuario, setErrors, errors)).filter(v => v === false)
        if(fails.length === 0){
            setUsuario({...usuario, "roles": logedUser.roles})
            dispatch({type: types.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea gregar los cambios?', titulo: 'Grabar'}})
        }
    }

    const cancelar = e => {
        history.push('/home')
    }

    const fnLoadImage = e => {
        fileAvatar.current.click()
    }

    const fnRefreshAvatar = e => {
        if(e.target.files.length > 0){
            setUsuario(usuario => ({...usuario, foto:e.target.value.split('\\')[2], objFile: URL.createObjectURL(e.target.files[0])}))
        }
    }

    return (
        <PerfilContent 
            response={response} 
            usuario={usuario} 
            handlerChangeValue={handlerChangeValue} 
            errors={errors} 
            grabar={grabar} 
            cancelar={cancelar}
            fnLoadImage={fnLoadImage}
            fileAvatar={fileAvatar}
            fnRefreshAvatar={fnRefreshAvatar}
            togleMenu={togleMenu}
        />
    )
}