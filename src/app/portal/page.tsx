'use client';
import Image from 'next/image';
import { useState } from 'react';
import Catalogo from '../catalogo/catalogo';
import PaymentSection from '../pagos/page';
export default function Home() {
  const [selected, setSelected] = useState('Catálogo');

  const renderContent = () => {
    switch (selected) {
      case 'Catálogo':
        return <Catalogo />;
      case 'Pagos':
        return <PaymentSection />;
      case 'Ventas':
        return <div className="p-8">Contenido de Ventas</div>;
      case 'Reportes':
        return <div className="p-8">Contenido de Reportes</div>;
      case 'Cancelaciones':
        return <div className="p-8">Contenido de Cancelaciones</div>;
      case 'Configuración':
        return <div className="p-8">Contenido de Configuración</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white-500">
      <header className="bg-yellow-200 w-full h-20 flex items-center justify-center">
        <div>
          <Image
            src="/logo-encabeza.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>
      </header>
      <main className="flex flex-row flex-1">
        <div className="h-screen w-56 bg-white shadow-lg flex flex-col">
          <div className="p-4 text-xl font-bold text-gray-800 border-b border-amber-300">
            Menú
          </div>
          <menu className="flex-1">
            <ul className="flex flex-col space-y-2 p-4">
              <li
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                  selected === 'Catálogo'
                    ? 'bg-amber-300 text-gray-900'
                    : 'text-gray-700 hover:bg-amber-300 hover:text-gray-900'
                }`}
                onClick={() => setSelected('Catálogo')}
              >
                📦 <span>Catálogo</span>
              </li>
              <li
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                  selected === 'Pagos'
                    ? 'bg-amber-300 text-gray-900'
                    : 'text-gray-700 hover:bg-amber-300 hover:text-gray-900'
                }`}
                onClick={() => setSelected('Pagos')}
              >
                💳 <span>Pagos</span>
              </li>
              <li
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                  selected === 'Ventas'
                    ? 'bg-amber-300 text-gray-900'
                    : 'text-gray-700 hover:bg-amber-300 hover:text-gray-900'
                }`}
                onClick={() => setSelected('Ventas')}
              >
                🛒 <span>Ventas</span>
              </li>
              <li
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                  selected === 'Reportes'
                    ? 'bg-amber-300 text-gray-900'
                    : 'text-gray-700 hover:bg-amber-300 hover:text-gray-900'
                }`}
                onClick={() => setSelected('Reportes')}
              >
                📊 <span>Reportes</span>
              </li>
              <li
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                  selected === 'Cancelaciones'
                    ? 'bg-amber-300 text-gray-900'
                    : 'text-gray-700 hover:bg-amber-300 hover:text-gray-900'
                }`}
                onClick={() => setSelected('Cancelaciones')}
              >
                🚫 <span>Cancelaciones</span>
              </li>
              <li
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                  selected === 'Configuración'
                    ? 'bg-amber-300 text-gray-900'
                    : 'text-gray-700 hover:bg-amber-300 hover:text-gray-900'
                }`}
                onClick={() => setSelected('Configuración')}
              >
                ⚙️ <span>Configuración</span>
              </li>
            </ul>
          </menu>
        </div>
        <div className="flex-1">{renderContent()}</div>
      </main>
      <footer className="bg-yellow-200 w-full h-20 flex items-center justify-center">
        <p className="text-gray-700 text-sm">© 2024 Mi Empresa. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}