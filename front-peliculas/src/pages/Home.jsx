import { Link } from 'react-router-dom';

const modulos = [
  { to: '/generos', titulo: 'Géneros', texto: 'Acción, aventura, ciencia ficción, drama, terror y los que se necesiten.' },
  { to: '/directores', titulo: 'Directores', texto: 'Director principal de cada producción.' },
  { to: '/productoras', titulo: 'Productoras', texto: 'Disney, Warner, Paramount, MGM...' },
  { to: '/tipos', titulo: 'Tipos', texto: 'Película, serie y otros tipos de multimedia.' },
  { to: '/media', titulo: 'Películas y series', texto: 'Catálogo de producciones con sus relaciones.' },
];

export default function Home() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Panel de administración</h1>
        <p className="lead text-muted mb-0">
          Institución Universitaria Digital de Antioquia · Gestión de películas y series
        </p>
      </div>
      <div className="row g-4">
        {modulos.map((m) => (
          <div className="col-md-6 col-lg-4" key={m.to}>
            <Link to={m.to} className="text-decoration-none">
              <div className="card h-100 shadow-sm tarjeta-modulo">
                <div className="card-body">
                  <h5 className="card-title text-dark">{m.titulo}</h5>
                  <p className="card-text text-muted">{m.texto}</p>
                  <span className="text-primary fw-semibold">Administrar →</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
