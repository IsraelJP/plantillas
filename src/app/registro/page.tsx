import Image from 'next/image';
export default function Home() {
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
      <main className="flex-1">
        <div className="flex justify-center items-center pt-10 ">
          <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Crear Cuenta</h1>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Usuario *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Usuario"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                Nombre Completo *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                placeholder="Nombre completo"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Teléfono *
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Número de teléfono"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rolInicial">
                Rol Inicial *
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="rolInicial"
                required
              >
                <option value="">Selecciona un rol</option>
                <option value="Gerente">Gerente</option>
                <option value="Jefe">Jefe(Administrador)</option>
                <option value="Operador">Operador (Usuario Estándar)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-yellow-200 hover:bg-black text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Registrarse
              </button>
            </div>
            
            <p className="text-center text-gray-500 text-xs mt-4">
              ¿Ya tienes una cuenta? <a href="#" className="text-blue-500 hover:text-blue-800">Iniciar Sesión</a>
            </p>
          </form>
        </div>
      </main>
      <footer className="bg-yellow-200 w-full h-20 flex items-center justify-center">
        <p className="text-gray-700 text-sm">© 2024 Mi Empresa. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}