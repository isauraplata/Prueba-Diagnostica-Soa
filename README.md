# API RESTful para Gestión de Catalogo y Órdenes en un Vivero


## Descripción

Este proyecto proporciona una API RESTful diseñada para gestionar eficientemente el inventario y las órdenes en un vivero. La API facilita operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para productos y órdenes, permite consultar órdenes filtradas por status  por ejemplo, "pendientes", "completadas", o "canceladas" para una mejor eficiencia y control. La implementación de la **arquitectura hexagonal** es para mejorar la escalabilidad y mantenibilidad del sistema.

## Configuración y Ejecución

**Pasos para Clonar el Repositorio:**

1. **Clonar el Repositorio:**
    - Ejecuta `git clone https://github.com/isauraplata/Prueba-Diagnostica-Soa.git` para clonar el repositorio en tu máquina local.

2. **Descargar Dependencias:**
    - Accede al directorio del proyecto con `cd tu_repositorio`.
    - Ejecuta `npm install` para instalar todas las dependencias necesarias.

3. **Configurar el Entorno:**
    - El archivo `.env` almacena información sensible como credenciales de la base de datos y claves secretas.

    **Estructura del archivo `.env`:**
    
    ```env
    DB_HOST=
    DB_USER=
    DB_DATABASE=
    DB_PASSWORD=
    PORT_SERVER=
    ```

    **Instrucciones para usar `.env`:**
    
    1. Crea un archivo de texto llamado `.env` en el directorio raíz de tu proyecto.
    2. Copia y pega el contenido anterior en el archivo `.env`.
    3. Reemplaza los valores de los marcadores de posición con tus credenciales de base de datos y claves secretas específicas.

4. **Importar la Base de Datos:**
    - En este proyecto no se utiliza un ORM para gestionar la interacción entre la base de datos y las entidades, esto se debe a que el enfoque actual prioriza un control más directo sobre 
    las consultas SQL y las operaciones en la base de datos.
    - La estructura de la base de datos se encuentra en el archivo `database.sql`.
    - Utiliza el gestor de base de datos de tu preferencia (como MySQL Workbench, phpMyAdmin, o la línea de comandos de MySQL) para importar el archivo SQL.

    #### Instrucciones de importación en MySQL Workbench:
    
    1. Abre MySQL Workbench y conecta a tu instancia de base de datos.
    2. Selecciona la opción "Data Import/Restore" en el menú.
    3. Elige el archivo `database.sql`.
    4. Selecciona la base de datos donde deseas importar los datos (o crea una nueva base de datos si es necesario).
    5. Haz clic en "Start Import" para completar la importación de la base de datos.

    #### Instrucciones de importación en phpMyAdmin:
    
    1. Abre phpMyAdmin y selecciona tu base de datos.
    2. Ve a la pestaña "Importar".
    3. Haz clic en "Elegir archivo" y selecciona el archivo `database.sql`.
    4. Haz clic en "Ejecutar" para importar la estructura y los datos.

5. **Ejecutar el Proyecto:**
    - Para iniciar el proyecto en modo de desarrollo, ejecuta `npm run dev`.

## Base de Datos Relacional

La API utiliza una base de datos relacional MySQL para almacenar y gestionar la información. Las relaciones entre órdenes y productos se manejan mediante una tabla pivote (`order_products`), lo que optimiza el rendimiento de las consultas y facilita la administración de los datos. Además, se utilizan transacciones para asegurar la integridad de las operaciones que involucran múltiples pasos. Por ejemplo, al crear una orden, se inicia una transacción que incluye la inserción de la orden y la adición de los productos asociados. Si ocurre un error en cualquier paso, la transacción se revierte para evitar datos inconsistentes en la base de datos.

 Para optimizar el rendimiento, se emplea el paquete `mysql2` con un pool de conexiones, que reutiliza conexiones existentes en lugar de abrir nuevas para cada consulta. Esto no solo mejora la eficiencia al reducir la sobrecarga de apertura y cierre de conexiones, sino que también ayuda a gestionar los límites de conexiones simultáneas del servidor MySQL, evitando alcanzar el número máximo permitido.

## Validación de Datos

Para garantizar la integridad y validez de los datos, se utiliza la biblioteca `Joi` en la API. Joi permite definir esquemas de validación que aseguran que los datos de entrada cumplan con los requisitos específicos, como longitudes mínimas y máximas, formatos y valores permitidos. Esto es crucial para prevenir errores  en la aplicación, garantizando que solo se procesen datos correctos y bien formateados.

## Autores

- [@isauraplata](https://github.com/isauraplata)
