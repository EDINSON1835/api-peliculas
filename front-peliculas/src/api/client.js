import axios from 'axios';

// URL de la API (EA1). Se puede cambiar con la variable VITE_API_URL en el archivo .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export default api;
