# Front End Películas – IU Digital de Antioquia

Ingeniería Web II · Evidencia de Aprendizaje 2: Front End con ReactJs

Aplicación web (React + Vite) que consume la API REST de la EA1 (`api-peliculas`) para administrar **Géneros, Directores, Productoras, Tipos y Películas/Series**.

**Integrantes:** JUAN DAVID CALLE CORREA_EDINSON MENA ARROYO

## Tecnologías

React 18 · Vite · React Router · Axios · SweetAlert2 · Bootstrap 5

## Requisitos

- Node.js 18+
- La API de la EA1 corriendo en `http://localhost:3000` (`npm run dev` en `api-peliculas`) y MongoDB activo

## Cómo ejecutarlo

```bash
npm install
cp .env.example .env    # (Windows CMD: copy .env.example .env) opcional si la API usa el puerto 3000
npm run dev
```

Abrir `http://localhost:5173`.

## Pantallas

| Ruta             | Módulo             | Operaciones                     |
| ---------------- | ------------------- | ------------------------------- |
| `/generos`     | Género             | listar, crear, editar, eliminar |
| `/directores`  | Director            | listar, crear, editar, eliminar |
| `/productoras` | Productora          | listar, crear, editar, eliminar |
| `/tipos`       | Tipo                | listar, crear, editar, eliminar |
| `/media`       | Películas y series | listar, crear, editar, eliminar |

## Reglas del caso de estudio aplicadas

- En Media, los selectores de **género, director y productora solo muestran registros Activos**; el tipo muestra todos.
- Serial y URL de Media son únicos (la API responde con error y la pantalla lo muestra).
- No se puede eliminar un registro que esté en uso por una media (la API lo impide y se muestra el mensaje).
- Sin registro ni seguridad, como pide el caso.

## Estructura

```
src/
  api/          axios + servicio CRUD genérico
  components/   Navbar y CrudPage (pantalla CRUD reutilizable)
  pages/        una pantalla por módulo + Home
  utils/        alertas (SweetAlert2) y formato
```


## Estructura del repositorio

- `/` (raíz): API REST con Node.js, Express y MongoDB (EA1)
- `/front-peliculas`: Front End en React (EA2) que consume la API

### Cómo ejecutar todo

1. API: `npm install` y `npm run dev` (puerto 3000)
2. Front End: `cd front-peliculas`, `npm install` y `npm run dev` (puerto 5173)
