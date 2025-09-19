'use client';
import Image from 'next/image';
import { useState } from 'react';
import Catalogo from '../catalogo/catalogo';
import PaymentSection from '../pagos/page';
import Cancelaciones from '../cancelaciones/cancelaciones';
import Configuracion from '../configuracion/config';

export default function Home() {
  const [selected, setSelected] = useState('Catálogo');

  const renderContent = () => {
    switch (selected) {
      case 'Catálogo':
        return <Catalogo />;
      case 'Pagos':
        return <PaymentSection />;
      case 'Ventas':
        return <div className="p-8">Ventas</div>;
      case 'Reportes':
        return <div className="p-8">Reportes</div>;
      case 'Cancelaciones':
        return <Cancelaciones />;
      case 'Configuración':
        return <Configuracion />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* HEADER */}
      <header className="bg-yellow-200 w-full h-20 flex items-center justify-center shadow-md">
        <Image src="/logo-encabeza.png" alt="Logo" width={100} height={100} />
      </header>

      {/* MAIN */}
      <main className="flex flex-row flex-1">
        {/* MENU LATERAL */}
        <aside className="h-screen w-56 bg-white shadow-lg flex flex-col">
          <div className="p-4 text-xl font-bold text-gray-800 border-b border-amber-300">
            Menú
          </div>
          <menu className="flex-1">
            <ul className="flex flex-col space-y-2 p-4">
              {[
                { label: 'Catálogo', icon: '📦' },
                { label: 'Pagos', icon: '💳' },
                { label: 'Ventas', icon: '🛒' },
                { label: 'Reportes', icon: '📊' },
                { label: 'Cancelaciones', icon: '🚫' },
                { label: 'Configuración', icon: '⚙️' },
              ].map((item) => (
                <li
                  key={item.label}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                    selected === item.label
                      ? 'bg-amber-300 text-gray-900'
                      : 'text-gray-700 hover:bg-amber-300 hover:text-gray-900'
                  }`}
                  onClick={() => setSelected(item.label)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </menu>
        </aside>

        {/* CONTENIDO */}
        <section className="flex-1">{renderContent()}</section>
      </main>

      {/* FOOTER */}
      <footer className="bg-yellow-200 w-full h-20 flex items-center justify-center shadow-inner">
        <p className="text-gray-700 text-sm">
          © 2024 Mi Empresa. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
  