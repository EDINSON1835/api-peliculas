import CrudPage from '../components/CrudPage';
import { fecha } from '../utils/formato';

const columnas = [
  {
    key: 'imagenPortada', label: 'Portada',
    render: (i) => (i.imagenPortada
      ? <img className="portada-mini" src={i.imagenPortada} alt={i.titulo} onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
      : <div className="portada-mini" />),
  },
  { key: 'serial', label: 'Serial' },
  { key: 'titulo', label: 'Título' },
  { key: 'anioEstreno', label: 'Año' },
  { key: 'genero', label: 'Género', render: (i) => i.genero?.nombre },
  { key: 'director', label: 'Director', render: (i) => i.director?.nombres },
  { key: 'productora', label: 'Productora', render: (i) => i.productora?.nombre },
  { key: 'tipo', label: 'Tipo', render: (i) => i.tipo?.nombre },
  {
    key: 'url', label: 'URL',
    render: (i) => <a href={i.url} target="_blank" rel="noreferrer">Ver</a>,
  },
  { key: 'fechaActualizacion', label: 'Actualización', render: (i) => fecha(i.fechaActualizacion) },
];

// Los select de género, director y productora solo muestran registros ACTIVOS (regla del caso de estudio)
const campos = [
  { name: 'serial', label: 'Serial', type: 'text', required: true, ayuda: 'Debe ser único.' },
  { name: 'titulo', label: 'Título', type: 'text', required: true },
  { name: 'anioEstreno', label: 'Año de estreno', type: 'number', required: true, min: 1888, max: 2100 },
  { name: 'url', label: 'URL de la película', type: 'url', required: true, placeholder: 'https://...', ayuda: 'Debe ser única.' },
  { name: 'imagenPortada', label: 'Imagen de portada (URL)', type: 'url', placeholder: 'https://...' },
  { name: 'genero', label: 'Género', type: 'select', required: true, fuente: { recurso: 'generos', etiqueta: 'nombre', soloActivos: true } },
  { name: 'director', label: 'Director', type: 'select', required: true, fuente: { recurso: 'directores', etiqueta: 'nombres', soloActivos: true } },
  { name: 'productora', label: 'Productora', type: 'select', required: true, fuente: { recurso: 'productoras', etiqueta: 'nombre', soloActivos: true } },
  { name: 'tipo', label: 'Tipo', type: 'select', required: true, fuente: { recurso: 'tipos', etiqueta: 'nombre', soloActivos: false } },
  { name: 'sinopsis', label: 'Sinopsis', type: 'textarea' },
];

export default function Media() {
  return (
    <CrudPage
      titulo="Películas y series" singular="producción" recurso="media"
      columnas={columnas} campos={campos}
      valoresIniciales={{
        serial: '', titulo: '', anioEstreno: '', url: '', imagenPortada: '',
        genero: '', director: '', productora: '', tipo: '', sinopsis: '',
      }}
      nombreDe={(i) => i.titulo}
    />
  );
}
