const cors = require('cors');   //Evitar el error de CORS: https://www.techiediaries.com/fix-cors-with-angular-cli-proxy-configuration/
const express = require('express');
var publicDir = require('path').join(__dirname,'/public');  //Configurando la carpeta public que contiene las imágenes

const app = express();
app.use(express.static(publicDir)); 
app.use(cors());    

const morgan = require('morgan');   //
const bodyParser = require('body-parser');  //Nevesario para atender las peticiones post


app.set('port', process.env.PORT || 3000);

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

app.listen(app.get('port'), () => {
    console.log('Servidor activo en el puerto 3000')
})