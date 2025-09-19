import { useState } from 'react';

type Cancelacion = {
  id: number;
  motivo: string;
  responsable: string;
  fecha: string;
};

export default function Cancelaciones() {
  const [cancelaciones] = useState<Cancelacion[]>([
    {
      id: 1,
      motivo: 'Error en el pedido',
      responsable: 'Juan Pérez',
      fecha: '2025-09-18',
    },
    {
      id: 2,
      motivo: 'Cliente solicitó cancelación',
      responsable: 'María López',
      fecha: '2025-09-17',
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white py-10">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-rose-700">
          Cancelaciones Registradas
        </h2>

        <div className="overflow-x-auto rounded-lg shadow-md border border-rose-200">
          <table className="min-w-full bg-white">
            <thead className="bg-rose-100 text-rose-800">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">ID</th>
                <th className="py-3 px-4 text-left font-semibold">Motivo</th>
                <th className="py-3 px-4 text-left font-semibold">Responsable</th>
                <th className="py-3 px-4 text-left font-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {cancelaciones.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No hay cancelaciones registradas.
                  </td>
                </tr>
              ) : (
                cancelaciones.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-rose-50 transition-colors"
                  >
                    <td className="py-3 px-4 border-t text-gray-700">{c.id}</td>
                    <td className="py-3 px-4 border-t text-gray-700">{c.motivo}</td>
                    <td className="py-3 px-4 border-t text-gray-700">{c.responsable}</td>
                    <td className="py-3 px-4 border-t text-gray-700 text-center">
                      {c.fecha}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
