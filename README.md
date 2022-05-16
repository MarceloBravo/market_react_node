# Tienda REACT - Node
Aplicación que simula una tienda online en la cual se pueden efectuar compras, llenar un carrito de compras, realizar búsqueda de productos, simular pagos con WebPay (La implementación de WebPay se encuentra en modo developer por lo cual no efectúa facturación), etc.  
La aplicación posee un módulo de administración en el cual se pueden administrar productos, ingresando, actualizando y eliminado productos, configurar ofertas por fecha de inicio y fecha de término de éstas, cambiar la configuración de la página home de la tienda, modificando imágenes, agregando, modificando o eliminado secciones de la página home, crear usuarios adminitradores, crear roles, permisos´, configurar menús, etc.

# market_react_node  
1.  Clonar la aplicación:  
  git clone https://github.com/MarceloBravo/market_react_node.git    
2.  Ingresar a la carpeta frontend de la aplicación:  
    cd market_react_node\frontend    
3.  Instalar dependencias del frontend con yarn:  
     yarn 
4.  Ingresar a la carpeta backend2:  
    cd..  
    cd backend2    
5.  Instalar dependencias del backend con npm:  
    npm install    
6. Abrir un programa gestor de bases de datos y crear una base de datos de MySQL, luego correr el archivo script de nombre "market.sql" ubicado en la raíz del proyecto (idealmente utilizar Navicat ya que dicho script fue creado con esa aplicación).    
7. Configurar las credenciales de la base de datos en el archivo:  
    backend2/db/connection.js

Una vez corrido el script y configurada la conección de la base de datos en el archivo connection.js:    
 
8. Ingresar a la carpeta backend2 a través de una terminal de comandos y correr el backend con el comando:   
    node src/app.js    
    
 9. Modificar el archivo frontend/src/shared/constantes.js y configurar la constante endPoint con el host y puerto al cual apunta el API levantado en el punto 8  
 
 10.  Ingresar a la carpeta frontend a través de una terminal de comandos y correr la aplicación con el comando:  
    yarn start
    
    
 Obs.:   
 - La aplicación corre bajo node versión 14.15.1    
 
 - Las credenciales para acceder al módulo de "administración de la tienda" y probarlo son:  
  usuario: prueba3@ejemplo3.cl  
  password: 123321    
 - El acceso al módulo de administración se realiza a través del menú "Aministrar tienda", ubicado en la parte superior de la tienda
 - Para probar la implementación de webpay, simulando una compra y el pago de ésta, la aplicación deberá estar corriendo en un puerto público
