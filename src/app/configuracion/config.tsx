import { useState } from 'react';

export default function Configuracion() {
  // Datos simulados de sesión
  const [usuario] = useState({
    nombre: 'Israel Martínez',
    cargo: 'Administrador',
    email: 'israel@granelia.com',
    tiempoSesion: '00:42:15',
    ultimaConexion: '2025-09-18 09:15',
  });

  // Otras configuraciones simuladas
  const [notificaciones, setNotificaciones] = useState(true);
  const [temaOscuro, setTemaOscuro] = useState(false);

  const cerrarSesion = () => {
    alert('Sesión cerrada');
    // Aquí iría la lógica real de logout/redirección
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white py-10">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-amber-900">Configuración de la Cuenta</h2>
        <div className="mb-6">
          <h3 className="font-semibold text-amber-800 mb-2">Datos de la sesión</h3>
          <ul className="text-amber-900/90 space-y-1">
            <li><strong>Nombre:</strong> {usuario.nombre}</li>
            <li><strong>Cargo:</strong> {usuario.cargo}</li>
            <li><strong>Email:</strong> {usuario.email}</li>
            <li><strong>Tiempo de sesión:</strong> {usuario.tiempoSesion}</li>
            <li><strong>Última conexión:</strong> {usuario.ultimaConexion}</li>
          </ul>
        </div>


        <div className="flex flex-col gap-3">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
          <button
            className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold py-2 px-4 rounded transition"
            onClick={() => alert('Función de cambiar contraseña')}
          >
            Cambiar contraseña
          </button>
          <button
            className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold py-2 px-4 rounded transition"
            onClick={() => alert('Función de editar perfil')}
            >
              Editar perfil
            </button>
          </div>
        </div>
    </div>
    );
}