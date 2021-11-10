import { useState, useEffect } from 'react'
import { leerPermisos, grabarPermisos } from '../../../../actions/permisos'
import { listar } from '../../../../actions/roles'
import { useDispatch, useSelector } from 'react-redux'
import { getMainMenu } from '../../../../actions/menus'
import { types as AlertasTypes } from '../../../../redux/Alert/types'
import { types as typesModal } from '../../../../redux/ModalDialog/types'
import { useHistory } from 'react-router'
import { PermisosContent } from './content'
import './style.css'


export const PermisosGrid = () => {
    const [ rolId, setRolId ] = useState('-1')
    // eslint-disable-next-line
    const [ errors, setErrors ] = useState({roles: ''})
    const [ roles, setRoles ] = useState([])
    const [ permisos, setPermisos ] = useState([])
    const listaRoles = useSelector(state => state.RolesReducer.list)
    const stPermisos = useSelector(state => state.PermisosReducer.permisos)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const [ refreshMenu, setRefreshMenu ] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    

    useEffect(()=>{
        dispatch(listar())    //Solicita el listado de Roles
        dispatch({type: AlertasTypes.OCULTAR_ALERTA})
    },[dispatch])


    useEffect(()=>{
        if(listaRoles.length > 0){
            setRoles(listaRoles)
        }
    },[listaRoles, dispatch])

    
    useEffect(()=>{
        if(stPermisos.length > 0  && rolId > 0){
            let getPermisos = [...stPermisos]
            getPermisos.map(p =>  convertirNulosAFalso(p))
            setPermisos(stPermisos)
        }else{
            setPermisos([])
        }

        function convertirNulosAFalso(p){
            Object.keys(p).forEach(k => (p[k] === null && ['acceder','crear','modificar','eliminar'].indexOf(k) > -1) ? p[k] = false : p[k] )
            return p
        }
    },[stPermisos, rolId])


    useEffect(()=>{
        if(refreshMenu){
            dispatch(getMainMenu(rolId))
            setRefreshMenu(false)
        }
    },[refreshMenu, rolId, dispatch])


    //Recibe la selección del usuario en el cuadro de dialogo modal grabar o eliminar
    const response = (res) => {
        if(res){
            dispatch(grabarPermisos(rolId, permisos))
            setRefreshMenu(true)
            dispatch(leerPermisos(rolId))
        }
    }

    //Oculta el cuadro de dialogo modal grabar/eliminar
    const mostrarOcultarModal = (res) => {
        dispatch({type: typesModal.HIDE_MODAL_DIALOG })
    }
    

    const grabar = () => {
        if(rolId === '-1'){
            setErrors(prevState => ({...prevState, roles: 'Debes seleccionar un rol'}))
        }else{
            dispatch({type: typesModal.SHOW_MODAL_DIALOG, payload: {titulo: 'Grabar', mensaje:'¿Deseas grabar los permisos?'}})
        }
    }

    const cancelar = () => {
        history.push('/Home');
    }


    const handlerChangeRoles = e => {
        setRolId(e.target.value)
        if(e.target.value !== '-1'){
            dispatch(leerPermisos(e.target.value))
            setErrors({...errors, roles: ''})
        }else{
            setErrors({...errors, roles: 'Debes seleccionar un rol'})
        }
    }

    const handlerChanges = e => {
        let ids = e.target.id.split("-")    //Obteniendo los ids (id del objeto a actualizar - campo a actualizar)
        let updatedPermiso = [...permisos]  //Clonando el array permisos
        updatedPermiso = sicronizeCheckboxes(ids, e.target.checked, updatedPermiso)
        updatedPermiso[ids[0]][ids[1]] = e.target.checked   //Actualizando el perisos en el array clon
        updatedPermiso[ids[0]].rol_id = rolId   //Actualizando el rol
        setPermisos(updatedPermiso)     //Asignando el array clone al nuevo estado
    }
    
    const sicronizeCheckboxes = (ids, checked, updatedPermiso) => {
        if(ids[1] === 'acceder'){
            if(!checked){
                updatedPermiso[ids[0]].crear = false;
                updatedPermiso[ids[0]].modificar = false;
                updatedPermiso[ids[0]].eliminar = false;
            }
        }else{
            if(checked){
                updatedPermiso[ids[0]].acceder = true;
            }
        }
        return updatedPermiso;
    }

    return (
        <PermisosContent 
            response={response} 
            mostrarOcultarModal={mostrarOcultarModal}
            roles={roles}
            handlerChangeRoles={handlerChangeRoles}
            handlerChanges={handlerChanges}
            errors={errors}
            permisos={permisos}
            grabar={grabar}
            cancelar={cancelar}
            togleMenu={togleMenu}
        />
    );
}