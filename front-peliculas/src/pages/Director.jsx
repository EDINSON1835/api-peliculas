import CrudPage from '../components/CrudPage';
import { EstadoBadge, OPCIONES_ESTADO, fecha } from '../utils/formato';

const columnas = [
  { key: 'nombres', label: 'Nombres' },
  { key: 'estado', label: 'Estado', render: (i) => <EstadoBadge estado={i.estado} /> },
  { key: 'fechaCreacion', label: 'Creación', render: (i) => fecha(i.fechaCreacion) },
  { key: 'fechaActualizacion', label: 'Actualización', render: (i) => fecha(i.fechaActualizacion) },
];

const campos = [
  { name: 'nombres', label: 'Nombres', type: 'text', required: true },
  { name: 'estado', label: 'Estado', type: 'select', required: true, opciones: OPCIONES_ESTADO },
];

export default function Director() {
  return (
    <CrudPage
      titulo="Directores" singular="director" recurso="directores"
      columnas={columnas} campos={campos}
      valoresIniciales={{ nombres: '', estado: 'Activo' }}
      nombreDe={(i) => i.nombres}
    />
  );
}
