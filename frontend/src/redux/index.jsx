import { combineReducers } from 'redux';
import LoginReducer from './Login/reducer';
import { MenusReducer } from './Menus/reducer';
import { PantallasReducer } from './Pantalla/reducer';
import { ModalDialogReducer } from './ModalDialog/reducer';
import { AlertaReducer } from './Alert/reducer';
import { RolesReducer } from './Roles/reducer';
import { UsersReducer } from './Users/reducer';
import { PermisosReducer } from './Permisos/reducer';
import { SpinnerReducer } from './Spinner/reducer';
import { PersonalizarReducer } from './Personalizar/reducer';
import { ImpuestosReducer } from './Impuestos/reducer';
import { CategoriasReducer } from './Categorias/reducer';
import { SubCategoriasReducer } from  './SubCategorias/reducer';
import { MarcasReducer } from  './Marcas/reducer';
import { UnidadesReducer } from  './Unidades/reducer';
import { ProductosReducer } from  './Productos/reducer';
import { InfoTiendaReducer } from  './InfoTienda/reducer';
import { MenusTiendaReducer } from  './MenusTienda/reducer';
import { ImagenesMarquesinaReducer } from  './ImagenesMarquesina/reducer';


export default combineReducers({
    LoginReducer,
    MenusReducer,
    PantallasReducer,
    ModalDialogReducer,
    AlertaReducer,
    RolesReducer,
    UsersReducer,
    PermisosReducer,
    SpinnerReducer,
    PersonalizarReducer,
    ImpuestosReducer,
    CategoriasReducer,
    SubCategoriasReducer,
    MarcasReducer,
    UnidadesReducer,
    ProductosReducer,
    InfoTiendaReducer,
    MenusTiendaReducer,
    ImagenesMarquesinaReducer,
})