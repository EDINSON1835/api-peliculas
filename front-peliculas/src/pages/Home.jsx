export default function Home() {
  return (
    <div className="container py-5">
      <div className="card shadow-sm text-center mx-auto" style={{ maxWidth: 640 }}>
        <div className="card-body p-4 p-md-5">
          <h1 className="titulo-home h2 mb-3">Sistema de Gestión de Películas y Series</h1>
          <p className="text-muted fs-5">
            Aplicación web con API REST (Node.js, Express, MongoDB) y cliente en React, desplegada en la nube.
          </p>
          <p className="mb-0">Seleccione un módulo en el menú superior para comenzar.</p>
        </div>
      </div>
    </div>
  );
}
