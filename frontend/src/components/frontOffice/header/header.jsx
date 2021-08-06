import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../../actions/infoTienda'
import { HeaderContentComponent } from './content'
import { useHistory } from 'react-router-dom'
import { types as ProductosTypes } from '../../../redux/Productos/types'
import './style.css'

export const HeaderMarketComponent = () => {
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)
    const textoFiltroState = useSelector(state => state.ProductosReducer.textoFiltro)
    const dispatch = useDispatch()
    const [ sowMenu, setShowMenu ] = useState(false)
    const [ textoFiltro, setTextoFiltro ] = useState('')
    const history = useHistory()

    const toggleMenu = () => {
        setShowMenu((prevState) => !prevState)
    }

    useEffect(()=>{
        dispatch(getData())
        setTextoFiltro(textoFiltroState)
    },[dispatch, textoFiltroState])


    const goToCart = () => {
        history.push('/carrito')
    }


    const goToCatalogue = () => {
        history.push('/catalogo')
    }


    const goToHome = () => {
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
            handlerTextFiltro={handlerTextFiltro}
            aplicarFiltro={aplicarFiltro}
            textoFiltro={textoFiltro}
        />
    )
}