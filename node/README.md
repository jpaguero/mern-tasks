# MERNTasks API

Una API REST simple para gestionar tareas y devolver estadísticas básicas.

## Requisitos:

### Endpoints:

- `POST /login`: Autentica un usuario usando nickname y contraseña, y devuelve un token JWT.
- `POST /users`: Crea un nuevo usuario usando nickname y contraseña.
- `GET /tasks`: Devuelve la lista de tareas.
- `POST /tasks`: Crea una nueva tarea.
- `PUT /tasks/:id`: Marca una tarea como completada.
- `GET /tasks/stats`: Devuelve estadísticas básicas (por ejemplo, número de tareas completadas vs. pendientes).
- `GET /docs`: Documentación de la API con Swagger.

### Base de datos:

- Almacenar los datos de los usuarios y las tareas en MongoDB.

### Autenticación:

- Implementar autenticación básica usando JWT para proteger los endpoints.

## Puntos a evaluar:

- Flujo de autenticación.
- Manipulación de datos en MongoDB.
- Uso de JWT para proteger los endpoints.
- Diseño de la API y organización del código.
- Manejo de rutas y middleware en Express.
- Validación de datos de entrada.
- Manejo de errores.
- Documentación de la API con Swagger.

## Recursos proporcionados:

- Esqueleto del proyecto con Express y bibliotecas de utilidad agregadas. Chequear el archivo `package.json` para más detalles.
