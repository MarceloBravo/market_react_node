import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../../actions/infoTienda'
import { HeaderContentComponent } from './content'
import './style.css'

export const HeaderMarketComponent = () => {
    const infoTiendaState = useSelector(state => state.InfoTiendaReducer.infoTienda)
    const dispatch = useDispatch()
    const [ sowMenu, setShowMenu ] = useState(false)

    const toggleMenu = () => {
        setShowMenu((prevState) => !prevState)
    }

    useEffect(()=>{
        dispatch(getData())
    },[dispatch])


    return (
        <HeaderContentComponent infoTiendaState={infoTiendaState} toggleMenu={toggleMenu} sowMenu={sowMenu}/>
    )
}