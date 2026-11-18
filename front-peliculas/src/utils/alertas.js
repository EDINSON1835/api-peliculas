import Swal from 'sweetalert2';

export const exito = (mensaje) =>
  Swal.fire({ icon: 'success', title: '¡Listo!', text: mensaje, timer: 1800, showConfirmButton: false });

// Muestra el mensaje que devuelve la API (validaciones, duplicados, etc.)
export const errorApi = (err) => {
  const data = err?.response?.data;
  if (!data) {
    return Swal.fire({
      icon: 'error',
      title: 'No se pudo conectar con la API',
      text: 'Verifica que el servidor del backend esté corriendo (npm run dev en api-peliculas).',
    });
  }
  const lista = data.errores?.length
    ? `<ul class="text-start mb-0">${data.errores.map((e) => `<li>${e}</li>`).join('')}</ul>`
    : undefined;
  return Swal.fire({ icon: 'error', title: data.mensaje || 'Ocurrió un error', html: lista });
};

export const confirmar = (texto) =>
  Swal.fire({
    icon: 'warning',
    title: '¿Estás seguro?',
    text: texto,
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc3545',
  }).then((r) => r.isConfirmed);
