import CrudPage from '../components/CrudPage';
import { fecha } from '../utils/formato';

const columnas = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'descripcion', label: 'Descripción' },
  { key: 'fechaCreacion', label: 'Creación', render: (i) => fecha(i.fechaCreacion) },
  { key: 'fechaActualizacion', label: 'Actualización', render: (i) => fecha(i.fechaActualizacion) },
];

// El módulo Tipo no maneja estado (según el caso de estudio)
const campos = [
  { name: 'nombre', label: 'Nombre', type: 'text', required: true },
  { name: 'descripcion', label: 'Descripción', type: 'textarea' },
];

export default function Tipo() {
  return (
    <CrudPage
      titulo="Tipos" singular="tipo" recurso="tipos"
      columnas={columnas} campos={campos}
      valoresIniciales={{ nombre: '', descripcion: '' }}
      nombreDe={(i) => i.nombre}
    />
  );
}
