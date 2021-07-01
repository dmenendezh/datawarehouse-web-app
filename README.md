# datawarehouse-web-app
Project | Data WareHouse web app


1. Clonar el proyecto en su entorno de trabajo Visual Studio.

```bash
git clone https://github.com/dmenendezh/datawarehouse-web-app.git
```

2. Instalar NodeJS y XAMPP.

3. Instalar paquetes npm requeridos por el proyecto.

```bash
npm install
```

4. Abrir XAMPP y iniciar el servicio de MySQL (chequear el puerto donde levanta el servicio).

5. Abrir el cliente 'MySQL Workbench' y ejecute el archivo creation-db.sql, el cual creara la base de datos con cada uno de los objetos correspondientes.

6. Dentro del proyecto bajado en Visual Studio, configurar el archivo con nombre .env, con la información que corresponda y fue configurada en su PC:

APP_PORT=3000 <br>
DB_HOST=localhost <br>
DB_PORT=3306 <br>
DB_NAME=dw_webapp <br>
DB_USER=root<br>


7. Iniciar el servidor mediante la consola "Terminal" ejecutar el comando: 

```bash
npm run start:server
```

8. Levantar el servidor de aplicación mediante la extensión 'Go Live' en el puerto 5500

9. Acceder a la aplicación mediante la URL:

<a href="http://127.0.0.1:5500/frontend">http://127.0.0.1:5500/frontend</a>

10. Usuario administrador para acceder a la aplicación:

mail: admin@datawarehouse.com <br>
password: admin <br>
