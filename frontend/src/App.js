import thunk from 'redux-thunk';

//Componentes del BackOffice
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
import { SubCategoriasGrid } from './pages/backOffice/subCategorias/grid/grid';
import { SubCategoriasForm } from './pages/backOffice/subCategorias/form/form';
import { MarcasGridReducer } from './pages/backOffice/marcas/grid/grid';
import { MarcasForm } from './pages/backOffice/marcas/form/form';
import { UnidadesGrid } from './pages/backOffice/unidades/grid/grid';
import { UnidadesForm } from './pages/backOffice/unidades/form/form';
import { ProductosGrid } from './pages/backOffice/productos/grid/grid';
import { ProductosForm } from './pages/backOffice/productos/form/form';
import { InfoTiendaFormComponent } from './pages/backOffice/infoTienda/infoTienda.jsx';
import { MenusTiendaGrid } from './pages/backOffice/menusTienda/grid/grid';
import { FormMenusTiendaComponent } from './pages/backOffice/menusTienda/form';
import { SeccionesHomeGrid } from './pages/backOffice/seccionesHome/grid/grid';
import { SeccionesHomeForm } from './pages/backOffice/seccionesHome/form/form';
import { DetalleProducto } from './pages/frontOffice/detalleProducto/detalleProducto'
import { Catalogo } from './pages/frontOffice/catalogo/catalogo'


//Componentes del FrontOffice
import { HomeMarketComponent } from './pages/frontOffice/home/home';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import combineReducer from './redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { CarroCompras } from './pages/frontOffice/carroCompras/carroCompras'
import { LoginCliente } from './pages/frontOffice/loginCliente/loginCliente'
import { RegistroClientes } from './pages/frontOffice/registroCliente/registroCliente'
import { PageMessage } from './pages/frontOffice/pageMessage/pageMessage'


const store = createStore(combineReducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* Rutas FrontOffice */}
            <Route exact path="/" component={HomeMarketComponent}/>
            <Route exact path="/detalleProducto/:id" component={DetalleProducto}/>
            <Route exact path="/carrito" component={CarroCompras}/>
            <Route exact path="/catalogo" component={Catalogo}/>
            <Route exact path="/catalogo/:nombreCategoria/:idCat" component={Catalogo}/>
            <Route exact path="/catalogo/:nombreCategoria/:idCat/:idSubCat" component={Catalogo}/>
            <Route exact path="/loginCliente" component={LoginCliente}/>
            <Route exact path="/registroCliente" component={RegistroClientes}/>
            <Route exact path="/registroCliente/:id" component={RegistroClientes}/>
            <Route exact path="/info" component={PageMessage}/>


            {/* Rutas BackOffice */}
            <Route exact path="/login" component={Login} />
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
            <Route exact path="/sub_categorias" component={SubCategoriasGrid} />
            <Route exact path="/sub_categorias/nuevo" component={SubCategoriasForm} />
            <Route exact path="/sub_categorias/edit/:id" component={SubCategoriasForm} />
            <Route exact path="/marcas" component={MarcasGridReducer} />
            <Route exact path="/marcas/nuevo" component={MarcasForm} />
            <Route exact path="/marcas/edit/:id" component={MarcasForm} />
            <Route exact path="/unidades" component={UnidadesGrid} />
            <Route exact path="/unidades/nuevo" component={UnidadesForm} />
            <Route exact path="/unidades/edit/:id" component={UnidadesForm} />
            <Route exact path="/productos" component={ProductosGrid} />
            <Route exact path="/productos/nuevo" component={ProductosForm} />
            <Route exact path="/productos/edit/:id" component={ProductosForm} />
            <Route exact path="/tienda" component={InfoTiendaFormComponent} />
            <Route exact path="/menus_tienda" component={MenusTiendaGrid} />
            <Route exact path="/menus_tienda/nuevo" component={FormMenusTiendaComponent} />
            <Route exact path="/menus_tienda/edit/:id" component={FormMenusTiendaComponent} />
            <Route exact path="/secciones_home" component={SeccionesHomeGrid} />
            <Route exact path="/secciones_home/nuevo" component={SeccionesHomeForm} />
            <Route exact path="/secciones_home/edit/:id" component={SeccionesHomeForm} />
            <Route exact path=""/>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider> 
  );
}

export default App;
