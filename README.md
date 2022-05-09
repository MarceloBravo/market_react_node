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
9.  Ingresar a la carpeta frontend a través de una terminal de comandos y correr la aplicación con el comando:  
    yarn start
    
    
 Obs.:   
 - La aplicación corre bajo node versión 14.15.1    
 
 - Las credenciales para acceder al módulo de "administración de la tienda" y probarlo son:  
  usuario: prueba3@ejemplo3.cl  
  password: 123321    
 - El acceso al módulo de administración se realiza a través del menú "Aministrar tienda", ubicado en la parte superior de la tienda
