import { useMemo, useState, useEffect } from "react";

// Tip: Este componente es "tipo Excel": tabla, filtros, ordenamiento, paginación y eliminación.
// - No requiere librerías externas (solo React + Tailwind)
// - Puedes copiar/pegar en Next.js (app o pages). Exporta por defecto <Catalogo/>
// - Reemplaza las rutas de imagen por las reales en tu proyecto

// -----------------------------
// Tipos y datos de ejemplo
// -----------------------------
export type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number; // Usar número para permitir comparaciones/rango
  imagen: string;
  categoria?: string; // Opcional para filtrar por categoría/variedad
};

const PRODUCTOS_INICIALES: Producto[] = [
  {
    id: 101,
    nombre: "Cereal de Maíz",
    descripcion: "Crujiente y delicioso, ideal para el desayuno.",
    precio: 45.0,
    imagen: "/cereal-maiz.jpg",
    categoria: "Cereal",
  },
  {
    id: 102,
    nombre: "Granola Natural",
    descripcion: "Mezcla de granos y frutos secos, sin azúcar añadida.",
    precio: 60.0,
    imagen: "/granola.jpg",
    categoria: "Granola",
  },
  {
    id: 103,
    nombre: "Avena Instantánea",
    descripcion: "Lista en minutos, perfecta para empezar el día.",
    precio: 35.0,
    imagen: "/avena.jpg",
    categoria: "Avena",
  },
];

// Utilidad para formatear moneda MXN sin depender de backend
const formatMXN = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(n);

// -----------------------------
// Componente principal
// -----------------------------
export default function Catalogo() {
  const [productos, setProductos] = useState<Producto[]>(PRODUCTOS_INICIALES);

  // --- Estado de filtros/tabla ---
  const [buscarId, setBuscarId] = useState<string>("");
  const [buscarTexto, setBuscarTexto] = useState<string>(""); // nombre/descripcion
  const [categoria, setCategoria] = useState<string>("todos");
  const [minPrecio, setMinPrecio] = useState<string>("");
  const [maxPrecio, setMaxPrecio] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [sortKey, setSortKey] = useState<keyof Producto>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  // categorías dinámicas desde los datos
  const categorias = useMemo(() => {
    const set = new Set<string>();
    productos.forEach((p) => p.categoria && set.add(p.categoria));
    return ["todos", ...Array.from(set)];
  }, [productos]);

  // Reset de página al cambiar filtros
  useEffect(() => {
    setPage(1);
  }, [buscarId, buscarTexto, categoria, minPrecio, maxPrecio]);

  // Filtrado + ordenamiento memoizado
  const filtrados = useMemo(() => {
    let data = [...productos];

    // Buscar por ID exacto
    if (buscarId.trim() !== "") {
      const idN = Number(buscarId);
      if (!Number.isNaN(idN)) {
        data = data.filter((p) => p.id === idN);
      } else {
        // Si no es número, no muestra nada (o podrías ignorar)
        data = [];
      }
    }

    // Texto en nombre o descripción (case-insensitive)
    if (buscarTexto.trim() !== "") {
      const q = buscarTexto.toLowerCase();
      data = data.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q)
      );
    }

    // Categoría
    if (categoria !== "todos") {
      data = data.filter((p) => p.categoria === categoria);
    }

    // Rango de precios
    const min = Number(minPrecio);
    const max = Number(maxPrecio);
    if (!Number.isNaN(min)) {
      data = data.filter((p) => p.precio >= min);
    }
    if (!Number.isNaN(max)) {
      data = data.filter((p) => p.precio <= max);
    }

    // Ordenamiento
    data.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      let cmp = 0;
      if (typeof va === "number" && typeof vb === "number") {
        cmp = va - vb;
      } else {
        cmp = String(va).localeCompare(String(vb), "es");
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return data;
  }, [productos, buscarId, buscarTexto, categoria, minPrecio, maxPrecio, sortKey, sortDir]);

  // Paginación
  const total = filtrados.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageSafe = Math.min(page, totalPages);
  const start = (pageSafe - 1) * pageSize;
  const end = start + pageSize;
  const pageRows = filtrados.slice(start, end);

  // Acciones
  const toggleSort = (key: keyof Producto) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const clearFilters = () => {
    setBuscarId("");
    setBuscarTexto("");
    setCategoria("todos");
    setMinPrecio("");
    setMaxPrecio("");
  };

  const toggleSelected = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllPage = () => {
    const allSelected = pageRows.every((p) => selected.has(p.id));
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        pageRows.forEach((p) => next.delete(p.id));
      } else {
        pageRows.forEach((p) => next.add(p.id));
      }
      return next;
    });
  };

  const eliminarSeleccionados = () => {
    if (selected.size === 0) return;
    setProductos((prev) => prev.filter((p) => !selected.has(p.id)));
    setSelected(new Set());
  };

  const eliminarUno = (id: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // (Opcional) Cargar datos desde props/backend
  // useEffect(() => setProductos(props.data), [props.data])

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Catálogo de productos</h2>

      {/* Panel de filtros */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 bg-white rounded-2xl shadow p-4 mb-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Buscar por ID</label>
          <input
            type="number"
            value={buscarId}
            onChange={(e) => setBuscarId(e.target.value)}
            placeholder="Ej. 101"
            className="border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium mb-1">Texto (nombre o descripción)</label>
          <input
            type="text"
            value={buscarTexto}
            onChange={(e) => setBuscarTexto(e.target.value)}
            placeholder="Ej. granola, avena..."
            className="border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Variedad/Categoría</label>
          <select
            className="border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Precio mín.</label>
          <input
            type="number"
            inputMode="decimal"
            value={minPrecio}
            onChange={(e) => setMinPrecio(e.target.value)}
            placeholder="0"
            className="border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Precio máx.</label>
          <input
            type="number"
            inputMode="decimal"
            value={maxPrecio}
            onChange={(e) => setMaxPrecio(e.target.value)}
            placeholder="1000"
            className="border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="md:col-span-6 flex flex-wrap items-center gap-3 mt-1">
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition shadow"
            title="Limpiar filtros"
          >
            Limpiar filtros
          </button>
          <div className="ml-auto flex items-center gap-3">
            <label className="text-sm">Filas por página</label>
            <select
              className="border rounded-xl px-2 py-2 focus:outline-none"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <button
              onClick={eliminarSeleccionados}
              className="px-4 py-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition shadow disabled:opacity-50"
              disabled={selected.size === 0}
              title="Eliminar seleccionados"
            >
              Eliminar seleccionados ({selected.size})
            </button>
          </div>
        </div>
      </div>

      {/* Info resumen */}
      <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-gray-600">
        <span>Total: <strong>{total}</strong> productos</span>
        <span className="hidden md:inline">•</span>
        <span>
          Mostrando {start + 1}-{Math.min(end, total)} de {total}
        </span>
      </div>

      {/* Tabla tipo Excel */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-amber-50 text-left">
              <th className="p-3 w-10">
                <input
                  type="checkbox"
                  aria-label="Seleccionar página"
                  checked={pageRows.length > 0 && pageRows.every((p) => selected.has(p.id))}
                  onChange={toggleSelectAllPage}
                />
              </th>
              <Th label="ID" onClick={() => toggleSort("id")} active={sortKey === "id"} dir={sortDir} />
              <Th label="Nombre" onClick={() => toggleSort("nombre")} active={sortKey === "nombre"} dir={sortDir} />
              <Th label="Categoría" onClick={() => toggleSort("categoria")} active={sortKey === "categoria"} dir={sortDir} />
              <Th label="Precio" onClick={() => toggleSort("precio")} active={sortKey === "precio"} dir={sortDir} />
              <th className="p-3">Imagen</th>
              <th className="p-3">Descripción</th>
              <th className="p-3 w-24">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((p) => (
              <tr key={p.id} className="border-t hover:bg-amber-50/50">
                <td className="p-3 align-middle">
                  <input
                    type="checkbox"
                    checked={selected.has(p.id)}
                    onChange={() => toggleSelected(p.id)}
                    aria-label={`Seleccionar ${p.nombre}`}
                  />
                </td>
                <td className="p-3 align-middle font-mono text-gray-800">{p.id}</td>
                <td className="p-3 align-middle font-medium">{p.nombre}</td>
                <td className="p-3 align-middle">{p.categoria ?? "—"}</td>
                <td className="p-3 align-middle font-semibold text-amber-700">{formatMXN(p.precio)}</td>
                <td className="p-3 align-middle">
                  <img
                    src={p.imagen}
                    alt={p.nombre}
                    className="w-12 h-12 object-cover rounded border"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://via.placeholder.com/48";
                    }}
                  />
                </td>
                <td className="p-3 align-middle max-w-[28ch] truncate" title={p.descripcion}>
                  {p.descripcion}
                </td>
                <td className="p-3 align-middle">
                  <button
                    onClick={() => eliminarUno(p.id)}
                    className="px-3 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition"
                    title="Eliminar"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {pageRows.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500">
                  No hay resultados con los filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          disabled={pageSafe === 1}
        >
          ◀ Anterior
        </button>
        <span className="px-2 py-1 text-sm">Página {pageSafe} / {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          disabled={pageSafe === totalPages}
        >
          Siguiente ▶
        </button>
      </div>
    </div>
  );
}

// -----------------------------
// Subcomponente: Encabezado con ordenamiento
// -----------------------------
function Th({
  label,
  onClick,
  active,
  dir,
}: {
  label: string;
  onClick: () => void;
  active: boolean;
  dir: "asc" | "desc";
}) {
  return (
    <th
      className="p-3 select-none cursor-pointer hover:bg-amber-100"
      onClick={onClick}
      title={`Ordenar por ${label}`}
    >
      <div className="flex items-center gap-1">
        <span className={active ? "font-semibold" : undefined}>{label}</span>
        <span className="text-xs opacity-70">{active ? (dir === "asc" ? "▲" : "▼") : ""}</span>
      </div>
    </th>
  );
}
