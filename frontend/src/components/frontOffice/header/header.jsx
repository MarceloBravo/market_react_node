import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../../actions/infoTienda'
import { HeaderContentComponent } from './content'
import { useHistory } from 'react-router-dom'
import './style.css'

export const HeaderMarketComponent = () => {
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)
    const dispatch = useDispatch()
    const [ sowMenu, setShowMenu ] = useState(false)
    const history = useHistory()

    const toggleMenu = () => {
        setShowMenu((prevState) => !prevState)
    }

    useEffect(()=>{
        dispatch(getData())
    },[dispatch])

    /*
    useEffect(()=>{
        let prod = localStorage.getItem('cart-'+appState.nombre_app)
        setCantProductos(JSON.parse(prod).length)
    },[localStorage.getItem('cart-'+appState.nombre_app)])
    */

    const goToCart = () => {
        history.push('/carrito')
    }


    return (
        <HeaderContentComponent 
            infoTiendaState={infoTiendaState} 
            toggleMenu={toggleMenu} 
            sowMenu={sowMenu}
            goToCart={goToCart}
        />
    )
}