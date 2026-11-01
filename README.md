# API REST Películas – IU Digital de Antioquia
Ingeniería Web II · Evidencia de Aprendizaje: API REST con Node.js

API REST (Node.js + Express + MongoDB/Mongoose) para gestionar **Género, Director, Productora, Tipo y Media (películas y series)**.

**Integrantes:** _(escribir nombres del equipo, mínimo 2 y máximo 4)_

## Requisitos
- Node.js 18+ 
- MongoDB local o una cuenta gratuita en MongoDB Atlas

## Instalación
```bash
npm install
cp .env.example .env     # editar MONGO_URI si es necesario
npm run seed             # (opcional) carga géneros y tipos iniciales
npm run dev              # o: npm start
```
La API queda en `http://localhost:3000`.

## Endpoints
Cada módulo expone el mismo CRUD:

| Método | Ruta | Acción |
|--------|------|--------|
| GET | `/api/{modulo}` | Listar |
| GET | `/api/{modulo}/:id` | Consultar uno |
| POST | `/api/{modulo}` | Crear |
| PUT | `/api/{modulo}/:id` | Actualizar |
| DELETE | `/api/{modulo}/:id` | Eliminar |

`{modulo}` = `generos` · `directores` · `productoras` · `tipos` · `media`

Filtros: `?estado=Activo` (generos, directores, productoras) y en media `?titulo=`, `?genero=`, `?director=`, `?productora=`, `?tipo=`, `?anioEstreno=`.

## Cuerpos JSON (ejemplos)
**Género** `{ "nombre": "Acción", "estado": "Activo", "descripcion": "Películas de acción" }`

**Director** `{ "nombres": "Christopher Nolan", "estado": "Activo" }`

**Productora** `{ "nombre": "Warner", "estado": "Activo", "slogan": "...", "descripcion": "..." }`

**Tipo** `{ "nombre": "Película", "descripcion": "Producción de larga duración" }`

**Media**
```json
{
  "serial": "MED-0001",
  "titulo": "Oppenheimer",
  "sinopsis": "...",
  "url": "https://ejemplo.com/oppenheimer",
  "imagenPortada": "https://ejemplo.com/portada.jpg",
  "anioEstreno": 2023,
  "genero": "<id>", "director": "<id>", "productora": "<id>", "tipo": "<id>"
}
```
`fechaCreacion` y `fechaActualizacion` las genera el servidor automáticamente.

## Reglas de negocio implementadas
- Una media pertenece a **un único** género, director, productora y tipo.
- Al crear/editar una media solo se aceptan **géneros, directores y productoras Activos**; el tipo debe existir.
- `serial` y `url` de Media son **únicos** (409 si se repiten).
- No se puede eliminar un género/director/productora/tipo que esté usado por una media (409).
- Sin autenticación (según el caso de estudio).

## Códigos de respuesta
`200` OK · `201` creado · `400` validación/ID inválido · `404` no encontrado · `409` duplicado o en uso · `500` error interno

## Estructura
```
src/
  config/db.js          conexión MongoDB
  models/               esquemas Mongoose (5 módulos)
  controllers/          lógica (crudFactory + media)
  routes/               rutas Express
  middlewares/          manejo de errores
  seed.js               datos iniciales
```
## Prueba con Postman
Importar `postman_collection.json`. Orden sugerido: Género → Director → Productora → Tipo → Media (copiar los `_id` devueltos).
