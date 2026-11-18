import CrudPage from '../components/CrudPage';
import { EstadoBadge, OPCIONES_ESTADO, fecha } from '../utils/formato';

const columnas = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'estado', label: 'Estado', render: (i) => <EstadoBadge estado={i.estado} /> },
  { key: 'slogan', label: 'Slogan' },
  { key: 'descripcion', label: 'Descripción' },
  { key: 'fechaCreacion', label: 'Creación', render: (i) => fecha(i.fechaCreacion) },
  { key: 'fechaActualizacion', label: 'Actualización', render: (i) => fecha(i.fechaActualizacion) },
];

const campos = [
  { name: 'nombre', label: 'Nombre de la productora', type: 'text', required: true },
  { name: 'estado', label: 'Estado', type: 'select', required: true, opciones: OPCIONES_ESTADO },
  { name: 'slogan', label: 'Slogan', type: 'text' },
  { name: 'descripcion', label: 'Descripción', type: 'textarea' },
];

export default function Productora() {
  return (
    <CrudPage
      titulo="Productoras" singular="productora" recurso="productoras"
      columnas={columnas} campos={campos}
      valoresIniciales={{ nombre: '', estado: 'Activo', slogan: '', descripcion: '' }}
      nombreDe={(i) => i.nombre}
    />
  );
}
