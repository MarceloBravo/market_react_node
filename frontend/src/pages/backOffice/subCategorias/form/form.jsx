import React, { useState, useEffect } from 'react'
import { ModalDialog } from '../../../../components/backOffice/modalDialog'
import { Header } from '../../../../components/backOffice/header'
import { SpinnerComponent } from '../../../../components/shared/spinner'
import { Menu } from '../../../../components/backOffice/menu'
import { FormButtons } from '../../../../components/backOffice/form_buttons'
import { Form, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { find } from '../../../../actions/subCategorias' 
import { useHistory } from 'react-router-dom'
import { types } from '../../../../redux/ModalDialog/types'
import { types as spinnerTypes } from '../../../../redux/Spinner/types'
import { types as subCategoriasTypes } from '../../../../redux/SubCategorias/types'
import { insert, update, deleteReg } from '../../../../actions/subCategorias'
import { getAll } from '../../../../actions/categorias'
import { Alerta } from '../../../../components/shared/alerts'


export const SubCategoriasForm = () => {
    const currentPath = window.location.pathname.split('/')[1]
    const { id } = useParams()
    const [ accion , setAccion ] = useState(null)
    const [ errors, setErrors ] = useState({nombre: '', categoria_id: ''})
    const [ sub_categoria, setSub_Categoria ] = useState({id: '', nombre: '', categoria_id: '', created_at: '', updated_at: '', deleted_at:''})
    const subCategoria = useSelector(state => state.SubCategoriasReducer.subCategoria)
    const categorias = useSelector(state => state.CategoriasReducer.list)
    const pantalla = useSelector(state => state.PantallasReducer.pantalla)
    const tipo = useSelector(state => state.AlertaReducer.tipo)
    const dispatch = useDispatch()
    const history = useHistory()

    
    useEffect(()=>{
        dispatch(getAll())
    },[dispatch])


    useEffect(()=>{
        if(id){
            dispatch(find(id))
        }else{
            dispatch({type: subCategoriasTypes.NUEVA_SUB_CATEGORIA})
        }
    },[id, dispatch])

    
    useEffect(()=>{
        if(subCategoria){
            setSub_Categoria(subCategoria)
        }    
    },[subCategoria, dispatch])


    useEffect(()=>{
        if(tipo === 'success'){
            history.push('/'+currentPath)
        }
    },[currentPath, history, tipo])


    const handlerChangeValue = (e) => {
        validaDatos(e.target.name, e.target.value)
        setSub_Categoria({
            ...sub_categoria,
            [e.target.name]: e.target.value
        })
    }

    const response = (e) => {
        if(e){
            dispatch({type: spinnerTypes.SHOW_SPINNER})
            if(accion === 'grabar'){
                if(id){
                    dispatch(update(id, sub_categoria))
                }else{
                    dispatch(insert(sub_categoria))
                }
            }else{
                dispatch(deleteReg(id))
            }
        }
    }


    const grabar = (e) => {
        let errValidacion = Object.keys(sub_categoria).map(e => validaDatos(e,sub_categoria[e])).filter(e => !e).length
        if(errValidacion ===  0){
            setAccion('grabar')
            dispatch({type: types.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea grabar el registro?', tipo: 'Grabar'}})
        }
    }

    const eliminar = (e) => {
        setAccion('eliminar')
        dispatch({type: types.SHOW_MODAL_DIALOG, payload: {mensaje: '¿Desea eliminar el registro?', tipo: 'Eliminar'}})
    }
    

    const cancelar = (e) => {
        history.push('/'+currentPath)
    }

    const validaDatos = (field, value) => {
        let res = false
        switch(field){
            case 'nombre':
                if(value.length === 0){
                    setErrors({...errors, [field]:'Debe ingresar un nombre para la sub-categoría.'})
                }else if(value.length < 3){
                    setErrors({...errors, [field]:'El nombre debe tener almenos 3 carácteres. Ingresa un nombre más largo.'})
                }else if(value.length > 50){
                    setErrors({...errors, [field]:'El nombre debe tener hasta 50 carácteres. Ingresa un nombre más corto'})
                }else{
                    setErrors({...errors, [field]:''})
                    res = true
                }
                break;
            case 'categoria_id':
                if(!value || value === 0){
                    setErrors({...errors, [field]:'Debe seleccionar una categoría.'})
                }else{
                    setErrors({...errors, [field]:''})
                    res = true
                }
                break;
            default:
                setErrors({...errors,[field]:''})
                res = true
        }
        return res
    }

    return (
        <>
            <ModalDialog response={response}/>
            <Header />
            <SpinnerComponent />
            <div className="main-section">
                <div className="menu-section">
                    <Menu activeKeyMenu="1"/>
                </div>
                <div className="content-section"> 
                    <Alerta />                   
                    <Form>
                        <div className="div-title">Mantenedor de {pantalla.nombre}</div>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Nombre</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre de la sub-categoría"
                                    value={sub_categoria.nombre}
                                    onChange={e => handlerChangeValue(e)}
                                />
                            </Col>
                            
                        </Form.Group>
                        {errors.nombre &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.nombre}</Form.Text>
                            </Form.Group>
                        }

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Categoría</Form.Label>
                            <Col md="8">
                                <Form.Control
                                    as="select"
                                    name="categoria_id"
                                    value={sub_categoria.categoria_id}
                                    onChange={e => handlerChangeValue(e)}
                                >
                                    {categorias.length > 0 && <option>-- Seleccione --</option>}
                                    {categorias.length === 0 && <option>-- No se han encontrado categorías --</option>}
                                    { categorias.map((c, key) => {
                                        return <option key={key} value={c.id}>{c.nombre}</option>
                                        })
                                    }
                                </Form.Control>
                            </Col>
                            
                        </Form.Group>
                        {errors.categoria_id &&
                            <Form.Group as={Row}>
                                <Form.Text  className="field-error offset-2">{ errors.categoria_id}</Form.Text>
                            </Form.Group>
                        }

                        <FormButtons 
                            grabar={grabar} 
                            eliminar={eliminar} 
                            handlerBtnCancelar={cancelar} 
                            errors={errors} 
                            id={id}
                        />
                    </Form>
                </div>
            </div>
        </>
    )
}