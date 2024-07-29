# MarvelAppFullStack

## Requisitos Previos

- **NodeJS**: Versión 20.7.0 o superior (`node -v`)
- **NPM**: Versión 10.8.2 o superior (`npm -v`)
- **SQL Server**: Versión 2022
- **Docker**

## Instalación

1. Descarga el proyecto desde el siguiente [enlace](https://github.com/Bushogun/MarvelAppFullStack/archive/refs/heads/main.zip).
2. Extrae el contenido del archivo zip (Click derecho -> "Extract here").
3. Abre la carpeta en Visual Studio Code.
4. Abre un nuevo terminal (Ctrl + Shift + Ñ).
5. Navega al directorio del backend:
    ```sh
    cd backend
    ```
6. Instala las dependencias del backend:
    ```sh
    npm i
    ```
7. Inicia Docker.
8. Ejecuta el siguiente comando para iniciar SQL Server en Docker:
    ```sh
    docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=yourStrong#Password" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
    ```
9. Corre el script SQL llamado `db.sql` ubicado en `backend/database/db.sql` creando una conexión a esa base de datos. Puedes usar el usuario `sa` con la clave `yourStrong#Password` usando SQL Server Management Studio o con la extensión de Visual Studio Code llamada SQL Server (mssql).
10. Inicia el servidor del backend:
    ```sh
    npm run dev
    ```
11. Abre una nueva terminal (Ctrl + Shift + Ñ).
12. Navega al directorio del frontend:
    ```sh
    cd frontend
    ```
13. Instala las dependencias del frontend:
    ```sh
    npm i
    ```
14. Inicia el servidor del frontend:
    ```sh
    npm run dev
    ```

**¡RECUERDA SIEMPRE CERRAR SESIÓN PARA NO TENER ERRORES EN FUTURAS EJECUCIONES!**

## Funcionalidades

Esta prueba fue realizada en tiempo récord con una arquitectura Hexagonal en el backend orientado al desarrollo con DDD y programación funcional en el front. Cuenta con las siguientes funcionalidades:

- **Base de datos**: Persiste el usuario, cómics favoritos y cómics.
- **Registro de cómics**: Los cómics se registran por ID y Título.
- **Pantalla de LogIn**:
  - Hace login y almacena un token que permite la interacción con el backend, el cual controla las peticiones al API de Marvel y las funcionalidades de la aplicación.
  - Sin un login no se puede acceder a rutas protegidas como el "Dashboard" y los cómics específicos cuyos detalles se quieren ver.
  - LogIn con token JWT, el cual es persistido en el estado de Redux y almacenado en localStorage.
- **Pantalla de Registro**:
  - Comprueba si existe el usuario que se va a registrar por medio de su identificación y su correo.
  - Maneja el formulario de registro con validación de campos con la librería de React Hook Form.
- **Sistema de verificación**: Tanto el front como el backend poseen un sistema de verificación de formularios y datos enviados.
- **Favoritos**: Sistema para añadir y obtener cómics favoritos de usuarios específicos.
- **Seguridad**:
  - En el backend se encripta la llave con la que se hacen las solicitudes al API de Marvel.
  - En el front no se usaron librerías de diseño predefinido; cada línea de CSS fue escrita como parte de un reto personal.
- **Interfaz de usuario**: Una vez iniciada sesión, se obtiene el usuario y se despliega su nombre en un componente que también permite cerrar sesión.

<p align="right">
  <img src="https://media.giphy.com/media/SvFocn0wNMx0iv2rYz/giphy.gif" alt="GIF Animado">
</p>
