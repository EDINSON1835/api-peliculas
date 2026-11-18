import CrudPage from '../components/CrudPage';
import { EstadoBadge, OPCIONES_ESTADO, fecha } from '../utils/formato';

const columnas = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'estado', label: 'Estado', render: (i) => <EstadoBadge estado={i.estado} /> },
  { key: 'descripcion', label: 'Descripción' },
  { key: 'fechaCreacion', label: 'Creación', render: (i) => fecha(i.fechaCreacion) },
  { key: 'fechaActualizacion', label: 'Actualización', render: (i) => fecha(i.fechaActualizacion) },
];

const campos = [
  { name: 'nombre', label: 'Nombre', type: 'text', required: true },
  { name: 'estado', label: 'Estado', type: 'select', required: true, opciones: OPCIONES_ESTADO },
  { name: 'descripcion', label: 'Descripción', type: 'textarea' },
];

export default function Genero() {
  return (
    <CrudPage
      titulo="Géneros" singular="género" recurso="generos"
      columnas={columnas} campos={campos}
      valoresIniciales={{ nombre: '', estado: 'Activo', descripcion: '' }}
      nombreDe={(i) => i.nombre}
    />
  );
}
