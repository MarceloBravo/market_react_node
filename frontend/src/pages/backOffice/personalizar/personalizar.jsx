import { useState, useEffect } from  'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { find, save } from '../../../actions/personalizar' 
import { types } from '../../../redux/ModalDialog/types'
import { ContentPersonalizar } from './content'

export const PersonalizarForm = (props) => {
    const [ config, setConfig ] = useState({nombre_app: ''})
    const state = useSelector(state => state.PersonalizarReducer.config)
    const isOk = useSelector(state => state.PersonalizarReducer.isOk)
    const togleMenu = useSelector(state => state.MenusReducer.togle)
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    useEffect(()=>{
        dispatch(find())
    },[dispatch])


    useEffect(()=> {
        setConfig(state)
    },[state])


    useEffect(()=>{
        if(isOk){
            document.title = config.nombre_app            
        }
    },[isOk, config])

    const handlerChangeValue = (e) => {
        setConfig({
            ...config,
            [e.target.name]: e.target.value
        })
    }


    const grabar = (e) => {
        dispatch({type: types.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea grabar los datos?',  titulo: 'Grabar'}})
    }


    const handlerBtnCancelar = (e) => {
        history.push("/home")
    }


    const response = (e) => {
        if(e){
            dispatch(save(config))
        }
        
    }


    return (
        <ContentPersonalizar 
            response={response}
            config={config} 
            handlerChangeValue={handlerChangeValue} 
            grabar={grabar} 
            handlerBtnCancelar={handlerBtnCancelar}
            id={id}
            togleMenu={togleMenu}
        />
    )
}