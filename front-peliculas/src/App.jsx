import { Link, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Genero from './pages/Genero';
import Director from './pages/Director';
import Productora from './pages/Productora';
import Tipo from './pages/Tipo';
import Media from './pages/Media';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generos" element={<Genero />} />
        <Route path="/directores" element={<Director />} />
        <Route path="/productoras" element={<Productora />} />
        <Route path="/tipos" element={<Tipo />} />
        <Route path="/media" element={<Media />} />
        <Route
          path="*"
          element={
            <div className="container py-5 text-center">
              <h2>Página no encontrada</h2>
              <Link to="/">Volver al inicio</Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}
