import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { useHistory } from "react-router-dom";
import { types } from '../../../../redux/ModalDialog/types'
import { insertRec, updateRec, deleteRec, find, getAll } from '../../../../actions/menus'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { ContentMenus } from './content'
import './style.css'

export const FormMenus = () => {
    const { id } = useParams()
    const history = useHistory()
    const [menu, setMenu] = useState({ id: null, nombre: '', url: '', posicion: '', menu_padre_id: '', created_at: null, updated_at: null, deleted_at: null })
    const [errors, setErrors] = useState({ nombre: '', url: '', posicion: '', menu_padre_id: '' })
    const [accion, setAccion ] = useState('grabar')
    const menus = useSelector(state => state.MenusReducer.list)
    const currentMenu = useSelector(state => state.MenusReducer.menu)
    const ok = useSelector(state => state.AlertaReducer.tipo)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAll())    
    }, [dispatch])
    

    useEffect(() => {
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(find(id))
    },[id,dispatch])

    useEffect(() => {
        if (id && currentMenu) {
            setMenu(currentMenu);
        }else{
            setMenu({ id: null, nombre: '', url: '', posicion: '', menu_padre_id: '', created_at: null, updated_at: null, deleted_at: null })
        }
    },[currentMenu,id])

    useEffect(() => {
        if (ok === 'success') {
            history.push('/menus')
        }
    },[ok, history])

    const mostrarOcultarModal = () => {
        dispatch({ type: types.SHOW_MODAL_DIALOG, action: false})
    }
    
    
    const handlerBtnCancelar = () => {
        history.push('/menus')
    }

    const handlerChangeValue = (e) => {
        validaDatos(e.target.name, e.target.value)
        setMenu({
            ...menu,
            [e.target.name]: e.target.value
        });
    }

    const grabar = () => {
        Object.keys(menu).forEach(f => validaDatos(f, menu[f]))
        if (Object.keys(menu).filter(e => menu[e] !== '' && menu[e] !== null && e.includes(['nombre','posicion','url','menu_padre_id'])).filter(r => !r).length === 0) {
            setAccion('grabar')
            dispatch({ type: types.SHOW_MODAL_DIALOG, payload: {titulo: 'Grabar',mensaje: '¿Desea grabar el registro?'} })
        }
    }

    //Recepciona la respuesta del cuadro de dialogo Modal grabar
    const response = (res) => {
        if (res) {
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            if (accion === 'grabar') {
                if (id) {
                    actualizar()
                } else {
                   insertar()
                }
            } else {
                dispatch(deleteRec(id))
            }
        }
    }

    const insertar = () => {
        dispatch(insertRec(menu))
    }

    const actualizar = () => {
        dispatch(updateRec(id, menu))
    }

    const eliminar = () => {
        setAccion('eliminar')
        dispatch({ type: types.SHOW_MODAL_DIALOG, payload: {titulo: 'Eliminar',mensaje: '¿Desea eliminar el registro?'} })
    }

    const validaDatos = (name, value) => {
        console.log(name, value)
        switch (name) {
            case 'nombre':
                if (value.length === 0) { 
                    setErrors(prevState => ({...prevState, nombre: 'El nombre del menú es obligatorio.' }))
                }else if (value.length < 3) {
                    setErrors(prevState => ({...prevState, nombre: 'El nombre del menú debe tener almenos 3 carácteres. Ingrese un nombre más largo.' }))
                }else if (value.length > 20) { 
                    setErrors(prevState => ({...prevState, nombre: 'El nombre del menú debe tener hasta 50 carácteres. Ingrese un nombre más corto.' })) 
                }else {
                    setErrors(prevState => ({...prevState, [name]: null }))    
                }
                break;
            case 'url':
                if (value && value.length > 0  && value.length < 3) {
                    setErrors(prevState => ({...prevState, url: 'El la URL debe tener almenos 3 carácteres. Ingrese una URL más larga.' }))
                }else if (value && value.length > 100) { 
                    setErrors(prevState => ({...prevState, url: 'El la URL debe tener hasta 50 carácteres. Ingrese una URL más corta.' })) 
                } else {
                    setErrors(prevState => ({...prevState, [name]: null }))
                }
                break;
            case 'posicion':
                if(isNaN(value) || value === ''){
                    setErrors(prevState=> ({...prevState, posicion: 'Debes ingresar un número para la posición del menú.'}))
                }else if(value < 0){
                    setErrors(prevState => ({...prevState, posicion: 'La posición del menú debe ser un número positivo.'}))
                }else{
                    setErrors(prevState => ({...prevState, [name]: null}))
                }
                break;
                
            default:
                setErrors(prevState => ({...prevState, [name]: null }))
        }
        
    }


    return (
        <ContentMenus 
            id={id} 
            response={response}  
            mostrarOcultarModal={mostrarOcultarModal} 
            menu={menu} 
            menus={menus} 
            errors={errors} 
            handlerChangeValue={handlerChangeValue} 
            grabar={grabar} 
            eliminar={eliminar}  
            handlerBtnCancelar={handlerBtnCancelar} 
            togleMenu={togleMenu}
        />       
    )
}