import { useCallback, useEffect, useMemo, useState } from 'react';
import { crudService } from '../api/crud';
import { confirmar, errorApi, exito } from '../utils/alertas';

/**
 * Pantalla CRUD reutilizable (listar, crear, editar, eliminar).
 *
 * props:
 *  - titulo / singular : textos de la pantalla
 *  - recurso           : recurso de la API ('generos', 'media', ...)
 *  - columnas          : [{ key, label, render?(item) }]
 *  - campos            : [{ name, label, type, required?, opciones?, fuente?, ... }]
 *  - valoresIniciales  : objeto con el formulario vacío
 *  - nombreDe(item)    : texto que identifica al registro (para el mensaje de eliminar)
 */
export default function CrudPage({ titulo, singular, recurso, columnas, campos, valoresIniciales, nombreDe }) {
  const servicio = useMemo(() => crudService(recurso), [recurso]);

  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [opciones, setOpciones] = useState({});
  const [busqueda, setBusqueda] = useState('');
  const [abierto, setAbierto] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(valoresIniciales);
  const [guardando, setGuardando] = useState(false);

  const cargar = useCallback(async () => {
    try {
      setCargando(true);
      setItems(await servicio.listar());
    } catch (e) {
      errorApi(e);
    } finally {
      setCargando(false);
    }
  }, [servicio]);

  // Carga las listas para los <select> que dependen de otros módulos (solo activos si se indica)
  const cargarOpciones = useCallback(async () => {
    const conFuente = campos.filter((c) => c.fuente);
    if (!conFuente.length) return;
    const resultados = await Promise.all(
      conFuente.map((c) => crudService(c.fuente.recurso).listar().catch(() => []))
    );
    const nuevas = {};
    conFuente.forEach((c, i) => {
      nuevas[c.name] = resultados[i]
        .filter((o) => !c.fuente.soloActivos || o.estado === 'Activo')
        .map((o) => ({ value: o._id, label: o[c.fuente.etiqueta] }));
    });
    setOpciones(nuevas);
  }, [campos]);

  useEffect(() => {
    cargar();
    cargarOpciones();
  }, [cargar, cargarOpciones]);

  const abrirCrear = () => {
    setEditandoId(null);
    setForm(valoresIniciales);
    cargarOpciones();
    setAbierto(true);
  };

  const abrirEditar = (item) => {
    const valores = {};
    campos.forEach((c) => {
      const v = item[c.name];
      valores[c.name] = v && typeof v === 'object' ? v._id : v ?? '';
    });
    setEditandoId(item._id);
    setForm(valores);
    cargarOpciones();
    setAbierto(true);
  };

  const cerrar = () => setAbierto(false);

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const guardar = async (e) => {
    e.preventDefault();
    const datos = {};
    campos.forEach((c) => {
      let v = form[c.name];
      if (typeof v === 'string') v = v.trim();
      datos[c.name] = c.type === 'number' && v !== '' ? Number(v) : v;
    });
    try {
      setGuardando(true);
      const resp = editandoId ? await servicio.actualizar(editandoId, datos) : await servicio.crear(datos);
      cerrar();
      await cargar();
      exito(resp.mensaje);
    } catch (err) {
      errorApi(err);
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = async (item) => {
    if (!(await confirmar(`Se eliminará "${nombreDe(item)}". Esta acción no se puede deshacer.`))) return;
    try {
      const resp = await servicio.eliminar(item._id);
      await cargar();
      exito(resp.mensaje);
    } catch (err) {
      errorApi(err);
    }
  };

  const visibles = items.filter((i) => JSON.stringify(i).toLowerCase().includes(busqueda.toLowerCase()));

  const renderCampo = (c) => {
    const comunes = {
      id: `campo-${c.name}`,
      name: c.name,
      value: form[c.name] ?? '',
      onChange: cambiar,
      required: c.required,
    };
    if (c.type === 'select') {
      const lista = c.opciones || opciones[c.name] || [];
      return (
        <select className="form-select" {...comunes}>
          <option value="">Seleccione...</option>
          {lista.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      );
    }
    if (c.type === 'textarea') {
      return <textarea className="form-control" rows={3} placeholder={c.placeholder} {...comunes} />;
    }
    return (
      <input
        className="form-control"
        type={c.type || 'text'}
        placeholder={c.placeholder}
        min={c.min}
        max={c.max}
        {...comunes}
      />
    );
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <h2 className="mb-0">{titulo}</h2>
        <div className="d-flex gap-2">
          <input
            className="form-control"
            style={{ minWidth: 220 }}
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="btn btn-primary text-nowrap" onClick={abrirCrear}>
            + Nuevo {singular}
          </button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                {columnas.map((c) => (<th key={c.key}>{c.label}</th>))}
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando && (
                <tr><td colSpan={columnas.length + 1} className="text-center py-4">Cargando...</td></tr>
              )}
              {!cargando && visibles.length === 0 && (
                <tr><td colSpan={columnas.length + 1} className="text-center text-muted py-4">No hay registros.</td></tr>
              )}
              {visibles.map((item) => (
                <tr key={item._id}>
                  {columnas.map((c) => (
                    <td key={c.key}>{c.render ? c.render(item) : item[c.key]}</td>
                  ))}
                  <td className="text-end text-nowrap">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => abrirEditar(item)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(item)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer text-muted small">{visibles.length} registro(s)</div>
      </div>

      {abierto && (
        <>
          <div className="modal-backdrop-custom" onClick={cerrar} />
          <div className="modal-custom" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <form className="modal-content" onSubmit={guardar}>
                <div className="modal-header">
                  <h5 className="modal-title">{editandoId ? `Editar ${singular}` : `Nuevo ${singular}`}</h5>
                  <button type="button" className="btn-close" onClick={cerrar} aria-label="Cerrar" />
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    {campos.map((c) => (
                      <div key={c.name} className={c.type === 'textarea' ? 'col-12' : 'col-md-6'}>
                        <label className="form-label fw-semibold" htmlFor={`campo-${c.name}`}>
                          {c.label}{c.required && <span className="text-danger"> *</span>}
                        </label>
                        {renderCampo(c)}
                        {c.ayuda && <div className="form-text">{c.ayuda}</div>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={cerrar}>Cancelar</button>
                  <button type="submit" className="btn btn-primary" disabled={guardando}>
                    {guardando ? 'Guardando...' : editandoId ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
