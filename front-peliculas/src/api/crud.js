import api from './client';

// Servicio genérico: un recurso de la API (generos, directores, productoras, tipos, media)
export const crudService = (recurso) => ({
  listar: (params) => api.get(`/${recurso}`, { params }).then((r) => r.data.data),      // GET
  obtener: (id) => api.get(`/${recurso}/${id}`).then((r) => r.data.data),               // GET por id
  crear: (datos) => api.post(`/${recurso}`, datos).then((r) => r.data),                 // POST
  actualizar: (id, datos) => api.put(`/${recurso}/${id}`, datos).then((r) => r.data),   // PUT
  eliminar: (id) => api.delete(`/${recurso}/${id}`).then((r) => r.data),                // DELETE
});
