import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMainMenu } from '../../../actions/menus'
import { ContentMenuComponent } from './content'
import { types } from '../../../redux/Alert/types'
import './style.css'

export const Menu = (props) => {
    const { activeKeyMenu } = props
    const menus = useSelector(state => state.MenusReducer.displayedMenus)
    const roles = useSelector(state => state.LoginReducer.logedUser.roles)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(roles){
            let idRoles = roles.map(r => r.id)
            if(idRoles.length > 0){
                dispatch(getMainMenu(idRoles))
            }
        }
    },[roles, dispatch])


    const clearMessages = () => {
        dispatch({type: types.OCULTAR_ALERTA})
    }

    return (
        <ContentMenuComponent menus={menus} activeKeyMenu={activeKeyMenu} clearMessages={clearMessages}/>
    )
}