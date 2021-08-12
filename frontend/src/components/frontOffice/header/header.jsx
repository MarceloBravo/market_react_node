import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../../actions/infoTienda'
import { HeaderContentComponent } from './content'
import { useHistory } from 'react-router-dom'
import { types as ProductosTypes } from '../../../redux/Productos/types'
import jwt_decode from 'jwt-decode'    //yarn add jwt-decode -> https://www.npmjs.com/package//jwt-decode
import './style.css'

export const HeaderMarketComponent = () => {
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)
    const textoFiltroState = useSelector(state => state.ProductosReducer.textoFiltro)
    const dispatch = useDispatch()
    const [ sowMenu, setShowMenu ] = useState(false)
    const [ textoFiltro, setTextoFiltro ] = useState('')
    const [ token, setToken ] = useState(null)
    const [ datosCliente, setDatosCliente ] = useState(null)
    const history = useHistory()


    useEffect(()=>{
        dispatch(getData())
        setTextoFiltro(textoFiltroState)
    },[dispatch, textoFiltroState])


    useEffect(()=>{
        if(infoTiendaState){
            if(localStorage.getItem(infoTiendaState.nombre_tienda + '-cliente')){
                setToken(localStorage.getItem(infoTiendaState.nombre_tienda + '-cliente'))
            }else if(sessionStorage.getItem(infoTiendaState.nombre_tienda + '-cliente')){
                setToken(sessionStorage.getItem(infoTiendaState.nombre_tienda + '-cliente'))
            }
        }
        // eslint-disable-next-line
    },[infoTiendaState])


    useEffect(()=>{
        if(token){
            setDatosCliente((jwt_decode(token)).user ? (jwt_decode(token)).user : null)
        }
    },[token])


    const toggleMenu = () => {
        setShowMenu((prevState) => !prevState)
    }


    const goToCart = () => {
        history.push('/carrito')
    }


    const goToCatalogue = () => {
        history.push('/catalogo')
    }


    const goToHome = () => {
        history.push('/')
    }


    const goToLogin = () => {
        history.push('/loginCliente')
    }


    const cerrarSession = () => {
        localStorage.removeItem(infoTiendaState.nombre_tienda + '-cliente')
        sessionStorage.removeItem(infoTiendaState.nombre_tienda + '-cliente')
        setDatosCliente(null)
        history.push('/')
    }


    const handlerTextFiltro = (e) => {
        setTextoFiltro(e.target.value)
    }


    const aplicarFiltro = () => {
        dispatch({type: ProductosTypes.TEXTO_FILTRO_PRODUCTO, payload: textoFiltro})
        history.push('/catalogo')
    }


    return (
        <HeaderContentComponent 
            infoTiendaState={infoTiendaState} 
            toggleMenu={toggleMenu} 
            sowMenu={sowMenu}
            goToCart={goToCart}
            goToCatalogue={goToCatalogue}
            goToHome={goToHome}
            goToLogin={goToLogin}
            handlerTextFiltro={handlerTextFiltro}
            aplicarFiltro={aplicarFiltro}
            textoFiltro={textoFiltro}
            datosCliente={datosCliente}
            cerrarSession={cerrarSession}
        />
    )
}