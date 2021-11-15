import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router'
import { useHistory } from "react-router-dom";
import { getAll } from '../../../../actions/menus'
import { find, insert, update, deleteRec } from '../../../../actions/pantallas'
import { types } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { ContentPantallas } from './content'

export const PantallasForm = () => {
    const currentPantalla = useSelector(state => state.PantallasReducer.pantalla);    
    const [ pantalla, setPantalla ] = useState({nombre: '', menus_id: '', permite_crear: false, permite_modificar: false, permite_eliminar: false, created_at: null, updated_at: null, deleted_at: null});
    const dispatch = useDispatch();
    const [ errors, setErrors ] = useState({nombre: '', menus_id: '', permite_crear: '', permite_modificar: '', permite_eliminar: ''});
    const ok = useSelector(state => state.AlertaReducer.tipo)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const [ accion, setAccion ] = useState('');
    const { id } = useParams();
    const history = useHistory();


    useEffect(()=>{
        dispatch(getAll());
    },[dispatch]);


    useEffect(()=>{
        dispatch({type: spinnerTypes.SHOW_SPINNER})
        dispatch(find(id));
    },[dispatch, id]);


    useEffect(()=> {
        if(id && currentPantalla){
            setPantalla(currentPantalla);
        }else{
            setPantalla({nombre: '', menus_id: '', permite_crear: false, permite_modificar: false, permite_eliminar: false, created_at: null, updated_at: null, deleted_at: null})
        }
    },[currentPantalla, id])
    

    useEffect(() => {
        if (ok === 'success') {
            history.push('/pantallas')
        }
    },[ok, history])


    const handlerChangeValue = (e) => {
        validaDatos(e.target.name, e.target.type === 'checkbox' ? e.target.checked :  e.target.value);
        setPantalla({
            ...pantalla, 
            [e.target.name]:  e.target.type === 'checkbox' ? e.target.checked :  e.target.value
        });
    }


    const validaDatos = (field, value) => {
        switch(field){
            case 'nombre':
                if(value.length === 0){
                    setErrors(prevState => ({...prevState, [field]: 'Debe ingresar el nombre de la pantalla.'}))
                }else if(value.length > 50){
                    setErrors(prevState => ({...prevState, [field]: 'El nombre de la pantalla es demasiado largo.'}))
                }else{
                    setErrors(prevState => ({...prevState, [field]: null}))
                }
                break;
            case 'menus_id':
                if(value.length === 0){
                    setErrors(prevState => ({...prevState, [field]: 'Debe seleccionar el menú asociado a la pantalla.'}))
                }else{
                    setErrors(prevState => ({...prevState, [field]: null}))
                }
                break;
            case 'created_at':
            case 'updated_at':
            case 'deleted_at':
                break
            default:
                setErrors(prevState => ({...prevState, [field]: null}))
        }
    }


    const response = (res) => {        
        if (res) {
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            if (accion === 'grabar') {
                if (id) {
                    dispatch(update(id, pantalla))
                } else {
                    dispatch(insert(pantalla))
                }
            } else {
                dispatch(deleteRec(id))
            }
        }
    }

    
    const mostrarOcultarModal = () => {
        dispatch({ type: types.SHOW_MODAL_DIALOG, action: false})
    }


    const grabar = () => {
        Object.keys(pantalla).map(p => validaDatos(p, pantalla[p]))
        if(Object.keys(errors).filter(p => pantalla[p] === '' || pantalla[p] === null).length === 0){
            setAccion('grabar')
            dispatch({ type: types.SHOW_MODAL_DIALOG, payload: {titulo: 'Grabar',mensaje: '¿Desea grabar el registro?'} })
        }
    }

    
    const eliminar = () => {
        setAccion('eliminar')
        dispatch({ type: types.SHOW_MODAL_DIALOG, payload: {titulo: 'Eliminar',mensaje: '¿Desea eliminar el registro?'} })
    }

    const handlerBtnCancelar = () => {
        history.push('/pantallas');
    }

    return (
        <ContentPantallas 
            id={id} 
            response={response} 
            mostrarOcultarModal={mostrarOcultarModal} 
            pantalla={pantalla} 
            errors={errors} 
            handlerChangeValue={handlerChangeValue} 
            grabar={grabar} 
            eliminar={eliminar} 
            handlerBtnCancelar={handlerBtnCancelar}
            togleMenu={togleMenu}
        />
            
    );
}