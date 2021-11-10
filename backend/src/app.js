const cors = require('cors');   //Evitar el error de CORS: https://www.techiediaries.com/fix-cors-with-angular-cli-proxy-configuration/
const express = require('express');
var publicDir = require('path').join(__dirname,'/public');  //Configurando la carpeta public que contiene las imágenes

const app = express();
app.use(express.static(publicDir)); 
app.use(cors());

const morgan = require('morgan');   //
const bodyParser = require('body-parser');  //Nevesario para atender las peticiones post


app.set('port', process.env.PORT || 3001);

//middewares
app.use(morgan('dev')); //Utiliza morgan en modo de develop para mostrar los mensajes por consola
app.use(bodyParser.json()); //Permite recibir y entender los datos recibidos como objeto JSON

//Definiendo rutas
require('./routes/loginRoutes')(app, null);
require('./routes/userRoutes')(app, null);
require('./routes/menusRoutes')(app, null);
require('./routes/pantallasRoutes')(app, null);
require('./routes/rolesRoutes')(app, null);
require('./routes/permisosRoutes')(app, null);
require('./routes/configRoutes')(app, null);
require('./routes/impuestosRoutes')(app, null);
require('./routes/categoriasRoutes')(app, null);
require('./routes/SubCategoriasRoutes')(app, null);
require('./routes/marcasRoutes')(app, null);
require('./routes/unidadesRoutes')(app, null);
require('./routes/productosRoutes')(app, null);
require('./routes/tiendaRoutes')(app, null);
require('./routes/menusTiendaRoutes')(app, null);
require('./routes/imagenesMarquezinaRoutes')(app, null);
require('./routes/seccionesHomesRoutes')(app, null);
require('./routes/clientesRoutes')(app, null);
require('./routes/webpayRoutes')(app, null);
require('./routes/tipoPagosRoutes')(app, null);
require('./routes/ventasRoutes')(app, null);
require('./routes/despachosRoutes')(app, null);
require('./routes/ordenesCompraRoutes')(app, null);
require('./routes/dashboardRoutes')(app, null);
require('./routes/preciosRoutes')(app, null);
require('./routes/sendEmailRoutes')(app, null);


app.listen(app.get('port'), '192.168.43.118',() => {
    console.log('Servidor activo en el puerto ' + app.get('port'))
})