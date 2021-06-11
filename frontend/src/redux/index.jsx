import { combineReducers } from 'redux';
import LoginReducer from './Login/reducer';
import { GridReducer } from './Grid/reducer';
import { MenusReducer } from './Menus/reducer';
import { PantallasReducer } from './Pantalla/reducer';
import { ModalDialogReducer } from './ModalDialog/reducer';
import { AlertaReducer } from './Alert/reducer';
import { RolesReducer } from './Roles/reducer';
import { UsersReducer } from './Users/reducer';
import { PermisosReducer } from './Permisos/reducer';
import { SpinnerReducer } from './Spinner/reducer';
import { PersonalizarReducer } from './Personalizar/reducer'

export default combineReducers({
    LoginReducer,
    GridReducer,
    MenusReducer,
    PantallasReducer,
    ModalDialogReducer,
    AlertaReducer,
    RolesReducer,
    UsersReducer,
    PermisosReducer,
    SpinnerReducer,
    PersonalizarReducer
})
