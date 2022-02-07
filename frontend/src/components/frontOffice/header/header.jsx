import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../../actions/infoTienda'
import { HeaderContentComponent } from './content'
import { useHistory } from 'react-router-dom'
import { types as ProductosTypes } from '../../../redux/Productos/types'
import { types as clientesTypes } from '../../../redux/Clientes/types'
import jwt_decode from 'jwt-decode'    //yarn add jwt-decode -> https://www.npmjs.com/package//jwt-decode
import './style.css'

export const HeaderMarketComponent = (props) => {
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)
    const textoFiltroState = useSelector(state => state.ProductosReducer.textoFiltro)
    const dispatch = useDispatch()
    const [ sowMenu, setShowMenu ] = useState(false)
    const [ textoFiltro, setTextoFiltro ] = useState('')
    const [ token, setToken ] = useState(null)
    const [ datosCliente, setDatosCliente ] = useState(null)
    const history = useHistory()
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };


    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
        dispatch({type: clientesTypes.CERRAR_SESSION_CLIENTE})
        history.push('/')
    }


    const handlerTextFiltro = (e) => {
        setTextoFiltro(e.target.value)
    }


    const aplicarFiltro = () => {
        dispatch({type: ProductosTypes.TEXTO_FILTRO_PRODUCTO, payload: textoFiltro})
        history.push('/catalogo')
    }

    
    const goToUpdateUserData = () => {
        history.push(`/registroCliente/${datosCliente.id}`)
    }

    const gotToAdmin = () => {
        history.push('/login')
    }

    const gotToAcercaDe = () => {
        history.push('/acerca_de')
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
            goToUpdateUserData={goToUpdateUserData}
            gotToAdmin={gotToAdmin}
            gotToAcercaDe={gotToAcercaDe}
            shadow={scrollPosition > 0}
        />
    )
}