import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const enlaces = [
  { to: '/generos', texto: 'Géneros' },
  { to: '/directores', texto: 'Directores' },
  { to: '/productoras', texto: 'Productoras' },
  { to: '/tipos', texto: 'Tipos' },
  { to: '/media', texto: 'Películas y series' },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/" onClick={() => setAbierto(false)}>
          IU Digital <span>Películas</span>
        </NavLink>
        <button className="navbar-toggler" type="button" onClick={() => setAbierto(!abierto)} aria-label="Menú">
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${abierto ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            {enlaces.map((e) => (
              <li className="nav-item" key={e.to}>
                <NavLink
                  to={e.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`}
                  onClick={() => setAbierto(false)}
                >
                  {e.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
