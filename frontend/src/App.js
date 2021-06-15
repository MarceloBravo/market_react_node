import thunk from 'redux-thunk';
import { Login } from './pages/backOffice/login';
import { Home } from './pages/backOffice/home';
import { MenusGrid } from './pages/backOffice/menus/grid';
import { FormMenus } from './pages/backOffice/menus/form';
import { PantallasForm } from './pages/backOffice/pantallas/form/pantallas';
import { PantallasGrid } from './pages/backOffice/pantallas/grid/pantallas';
import { RolesGrid } from './pages/backOffice/roles/grid/roles';
import { FormRoles } from './pages/backOffice/roles/form/roles';
import { UsuariosGrid } from './pages/backOffice/usuarios/grid/usuarios';
import { UsuariosForm } from './pages/backOffice/usuarios/form/usuarios';
import { PermisosGrid } from './pages/backOffice/permisos/grid/permisos';
import { PersonalizarForm } from './pages/backOffice/personalizar/personalizar';
import { Perfil } from './pages/backOffice/perfil/perfil';
import { ImpuestosGrid } from './pages/backOffice/impuestos/grid/grid';
import { ImpuestosForm } from './pages/backOffice/impuestos/form/form';
import { CategoriasGrid } from './pages/backOffice/categorias/grid/grid';
import { CategoriasForm } from './pages/backOffice/categorias/form/form';


import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import combineReducer from './redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';


const store = createStore(combineReducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/menus" component={MenusGrid} />
            <Route exact path="/menus/nuevo" component={FormMenus} />
            <Route exact path="/menus/edit/:id" component={FormMenus} />
            <Route exact path="/pantallas" component={PantallasGrid} />
            <Route exact path="/pantallas/nuevo" component={PantallasForm} />
            <Route exact path="/pantallas/edit/:id" component={PantallasForm} />
            <Route exact path="/roles" component={RolesGrid} />
            <Route exact path="/roles/nuevo" component={FormRoles} />
            <Route exact path="/roles/edit/:id" component={FormRoles} />
            <Route exact path="/usuarios" component={UsuariosGrid} />
            <Route exact path="/usuarios/nuevo" component={UsuariosForm} />
            <Route exact path="/usuarios/edit/:id" component={UsuariosForm} />
            <Route exact path="/permisos" component={PermisosGrid} />
            <Route exact path="/personalizar" component={PersonalizarForm} />
            <Route exact path="/perfil" component={Perfil} />
            <Route exact path="/impuestos" component={ImpuestosGrid} />
            <Route exact path="/impuestos/nuevo" component={ImpuestosForm} />
            <Route exact path="/impuestos/edit/:id" component={ImpuestosForm} />
            <Route exact path="/categorias" component={CategoriasGrid} />
            <Route exact path="/categorias/nuevo" component={CategoriasForm} />
            <Route exact path="/categorias/edit/:id" component={CategoriasForm} />
            <Route exact path=""/>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider> 
  );
}

export default App;
