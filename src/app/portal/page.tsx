'use client';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Catalogo from '../catalogo/catalogo';
import PaymentSection from '../pagos/page';
import Cancelaciones from '../cancelaciones/cancelaciones';
import Configuracion from '../configuracion/config';
import Reportes from '../reportes/repo';
import Ventas from '../historial/page';

type MenuKey = 'Catálogo' | 'Pagos' | 'Ventas' | 'Reportes' | 'Cancelaciones' | 'Configuración';

const MENU_ITEMS: { label: MenuKey; icon: string }[] = [
  { label: 'Catálogo',       icon: '📦' },
  { label: 'Pagos',          icon: '💳' },
  { label: 'Ventas',         icon: '🛒' },
  { label: 'Reportes',       icon: '📊' },
  { label: 'Cancelaciones',  icon: '🚫' },
  { label: 'Configuración',  icon: '⚙️' },
];

export default function Home() {
  const [selected, setSelected] = useState<MenuKey>('Catálogo');
  const [menuOpen, setMenuOpen] = useState(false); // móvil

  // Persistencia en localStorage
  useEffect(() => {
    const saved = window.localStorage.getItem('ui:selected');
    if (saved && MENU_ITEMS.find(m => m.label === saved)) {
      setSelected(saved as MenuKey);
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem('ui:selected', selected);
  }, [selected]);

  const content = useMemo(() => {
    switch (selected) {
      case 'Catálogo':      return <Catalogo />;
      case 'Pagos':         return <PaymentSection />;
      case 'Ventas':        return <Ventas />;
      case 'Reportes':      return <Reportes />;
      case 'Cancelaciones': return <Cancelaciones />;
      case 'Configuración': return <Configuracion />;
      default:              return null;
    }
  }, [selected]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-white to-white">
      {/* Topbar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-amber-200">
        <div className="max-w-7xl mx-auto h-14 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-amber-200 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="sidebar"
            >
              {/* ícono hamburguesa simple */}
              <span className="block w-4 border-t border-gray-700"></span>
              <span className="block w-4 border-t border-gray-700 mt-1.5"></span>
              <span className="block w-4 border-t border-gray-700 mt-1.5"></span>
            </button>
            <div className="flex items-center gap-2">
              <Image src="/logo-encabeza.png" alt="Logo" width={28} height={28} />
              <span className="font-semibold text-gray-800">Panel</span>
            </div>
          </div>
          <div className="text-sm text-gray-500 hidden md:block">
            {selected}
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 max-w-7xl w-full mx-auto px-4 gap-4 py-4">
        {/* Sidebar */}
        <aside
          id="sidebar"
          className={[
            "md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:shrink-0",
            "bg-white border border-amber-200 rounded-xl shadow-sm",
            "w-64 p-3",
            // móvil: slide/ocultar
            "transition-all duration-200",
            menuOpen ? "block" : "hidden md:block",
          ].join(' ')}
          role="navigation"
          aria-label="Menú principal"
        >
          <div className="px-3 pb-2 pt-1 text-sm font-semibold text-gray-600">
            Menú
          </div>
          <ul className="space-y-1 overflow-auto pr-1" role="menubar">
            {MENU_ITEMS.map(item => {
              const active = selected === item.label;
              return (
                <li key={item.label}>
                  <button
                    role="menuitem"
                    onClick={() => { setSelected(item.label); setMenuOpen(false); }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelected(item.label);
                        setMenuOpen(false);
                      }
                    }}
                    className={[
                      "w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition outline-none",
                      active
                        ? "bg-amber-200/60 text-gray-900 border border-amber-300"
                        : "text-gray-700 hover:bg-amber-100 focus:bg-amber-100",
                    ].join(' ')}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    {active && <span className="ml-auto inline-block w-1.5 h-1.5 rounded-full bg-rose-400" />}
                  </button>
                </li>
              );
            })}
          </ul>
          {/* Pie del sidebar (opcional) */}
          <div className="mt-3 pt-3 border-t border-amber-100 text-xs text-gray-500 px-1">
            © {new Date().getFullYear()} Mi Empresa
          </div>
        </aside>

        {/* Content */}
        <section
          className="flex-1 bg-white border border-amber-200 rounded-xl shadow-sm overflow-hidden"
          aria-live="polite"
        >
          {/* Encabezado del contenido */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-amber-100">
            <h1 className="text-lg font-semibold text-gray-800">{selected}</h1>
            {/* espacio para acciones contextuales futuras */}
          </div>
          <div className="p-2 md:p-4">
            {content}
          </div>
        </section>
      </div>
    </div>
  );
}
