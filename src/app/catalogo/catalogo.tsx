import { useState } from 'react';

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: string;
};

export default function Catalogo() {
  // === Estado y lógica ORIGINAL (no tocada) ===
  const [productos, setProductos] = useState<Producto[]>([
    {
      id: 1,
      nombre: 'Cereal de Maíz',
      descripcion: 'Crujiente y delicioso, ideal para el desayuno.',
      precio: '$45.00',
      imagen: '/cereal-maiz.jpg',
    },
    {
      id: 2,
      nombre: 'Granola Natural',
      descripcion: 'Mezcla de granos y frutos secos, sin azúcar añadida.',
      precio: '$60.00',
      imagen: '/granola.jpg',
    },
    {
      id: 3,
      nombre: 'Avena Instantánea',
      descripcion: 'Lista en minutos, perfecta para empezar el día.',
      precio: '$35.00',
      imagen: '/avena.jpg',
    },
  ]);

  const [filtro, setFiltro] = useState('');
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editProducto, setEditProducto] = useState<Partial<Producto>>({});

  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      String(p.id).includes(filtro)
  );

  const borrarProducto = (idx: number) => {
    if (confirm('¿Seguro que deseas borrar este producto?')) {
      setProductos(productos.filter((_, i) => i !== idx));
    }
  };

  const guardarEdicion = (idx: number) => {
    const nuevos = [...productos];
    nuevos[idx] = { ...nuevos[idx], ...editProducto };
    setProductos(nuevos);
    setEditIdx(null);
    setEditProducto({});
  };
  
  // === UI mejorada (Tailwind) ===
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Encabezado */}
        <header className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-900 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-200/70 shadow-inner">
              {/* ícono caja */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-amber-800"
              >
                <path d="M21 8.25v7.5a3 3 0 01-1.658 2.684l-5.25 2.625a3 3 0 01-2.684 0l-5.25-2.625A3 3 0 013 15.75v-7.5A3 3 0 014.658 5.566l5.25-2.625a3 3 0 012.184-.2c.168.051.333.114.5.2l5.25 2.625A3 3 0 0121 8.25z" />
              </svg>
            </span>
            Catálogo de productos
          </h2>
          <p className="mt-2 text-amber-900/70">
            Gestiona, filtra y edita tus productos de <span className="font-semibold">Granelia</span> en una interfaz limpia y moderna.
          </p>
        </header>

        {/* Barra de herramientas */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-80">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 text-amber-900/50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar por nombre o ID..."
              className="w-full rounded-xl border border-amber-200 bg-white/70 px-10 py-2.5 text-sm shadow-sm outline-none placeholder:text-amber-900/40 focus:border-amber-300 focus:ring-4 focus:ring-amber-200/50"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>

          {/* Chips de estado simples */}
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-900/80">
              Total: <strong>{productos.length}</strong>
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-900/80">
              Coincidencias: <strong>{productosFiltrados.length}</strong>
            </span>
          </div>
        </div>

        {/* Contenedor de tabla */}
        <div className="overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm">
          <div className="relative overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-amber-50/70 sticky top-0 backdrop-blur">
                <tr className="text-amber-900/90">
                  <th className="py-3.5 px-4 font-semibold">ID</th>
                  <th className="py-3.5 px-4 font-semibold">Imagen</th>
                  <th className="py-3.5 px-4 font-semibold">Nombre</th>
                  <th className="py-3.5 px-4 font-semibold">Descripción</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Precio</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {productosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-amber-900/60">
                      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-2">
                        <div className="text-5xl">🗃️</div>
                        <p className="font-semibold">No hay productos que coincidan</p>
                        <p className="text-sm text-amber-900/60">Prueba con otro término o limpia el filtro.</p>
                      </div>
                    </td>
                  </tr>
                )}

                {productosFiltrados.map((producto, idx) => {
                  const realIdx = productos.findIndex((p) => p.id === producto.id);
                  const enEdicion = editIdx === realIdx;

                  return (
                    <tr key={producto.id} className="transition-colors hover:bg-amber-50">
                      <td className="py-3 px-4 align-middle text-amber-900/90">{producto.id}</td>

                      <td className="py-3 px-4 align-middle">
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="mx-auto h-16 w-16 rounded-lg border border-amber-100 object-cover shadow-sm"
                          onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/64')}
                        />
                      </td>

                      <td className="py-3 px-4 align-middle text-amber-900">
                        {enEdicion ? (
                          <input
                            className="w-full rounded-lg border border-amber-200 bg-white/80 px-3 py-2 outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-200/50"
                            value={editProducto.nombre ?? producto.nombre}
                            onChange={(e) =>
                              setEditProducto({ ...editProducto, nombre: e.target.value })
                            }
                          />
                        ) : (
                          <span className="font-medium">{producto.nombre}</span>
                        )}
                      </td>

                      <td className="py-3 px-4 align-middle text-amber-900/90">
                        {enEdicion ? (
                          <input
                            className="w-full rounded-lg border border-amber-200 bg-white/80 px-3 py-2 outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-200/50"
                            value={editProducto.descripcion ?? producto.descripcion}
                            onChange={(e) =>
                              setEditProducto({ ...editProducto, descripcion: e.target.value })
                            }
                          />
                        ) : (
                          <span className="line-clamp-2 leading-snug">{producto.descripcion}</span>
                        )}
                      </td>

                      <td className="py-3 px-4 align-middle text-center text-amber-900">
                        {enEdicion ? (
                          <input
                            className="w-full rounded-lg border border-amber-200 bg-white/80 px-3 py-2 text-center outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-200/50"
                            value={editProducto.precio ?? producto.precio}
                            onChange={(e) =>
                              setEditProducto({ ...editProducto, precio: e.target.value })
                            }
                          />
                        ) : (
                          <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-2.5 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                            {producto.precio}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 align-middle">
                        {enEdicion ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300/40"
                              onClick={() => guardarEdicion(realIdx)}
                            >
                              {/* icon: check */}
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z"/></svg>
                              Guardar
                            </button>
                            <button
                              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-white shadow-sm transition hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
                              onClick={() => {
                                setEditIdx(null);
                                setEditProducto({});
                              }}
                            >
                              {/* icon: x */}
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M18.3 5.7L12 12m0 0L5.7 5.7M12 12l6.3 6.3M12 12L5.7 18.3"/></svg>
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-white shadow-sm transition hover:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
                              onClick={() => {
                                setEditIdx(realIdx);
                                setEditProducto(producto);
                              }}
                            >
                              {/* icon: pencil */}
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/></svg>
                              Editar
                            </button>
                            <button
                              className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-300/40"
                              onClick={() => borrarProducto(realIdx)}
                            >
                              {/* icon: trash */}
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M6 7h12v2H6V7zm2 3h2v9H8v-9zm6 0h2v9h-2v-9zM9 4h6v2H9V4zM5 6h14l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6z"/></svg>
                              Borrar
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Nota de ayuda */}
        <p className="mt-4 text-xs text-amber-900/60">
          Consejo: Usa el cuadro de búsqueda para localizar productos rápidamente por nombre o ID. Haz clic en <span className="font-semibold">Editar</span> para modificar en línea.
        </p>
      </div>
    </div>
  );
}
