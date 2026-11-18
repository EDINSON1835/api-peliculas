export const fecha = (f) =>
  f ? new Date(f).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

export const EstadoBadge = ({ estado }) => (
  <span className={`badge ${estado === 'Activo' ? 'text-bg-success' : 'text-bg-secondary'}`}>{estado}</span>
);

export const OPCIONES_ESTADO = [
  { value: 'Activo', label: 'Activo' },
  { value: 'Inactivo', label: 'Inactivo' },
];
