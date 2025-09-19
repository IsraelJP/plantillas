'use client';
import Image from 'next/image';
import { use, useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor, llena ambos campos.');
    } else {
      setError('');
      // Aquí puedes manejar el inicio de sesión real
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
      <main className="flex-1 justify-center items-center p-29">
        <div className="flex justify-center items-center space-x-10">
          <Image
            src="/cereales.jpg"
            alt="Logo"
            width={500}
            height={700}
            className="rounded-lg shadow-lg"
          />
          <form
            className="bg-gray-100 shadow-md rounded px-8 pb-8 mb-4"
            onSubmit={handleLogin}
          >
            <h1 className="text-3xl font-bold mb-4">Iniciar Sesion</h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Usuario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs mb-4">{error}</p>
            )}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Iniciar Sesion
              </button>
            </div>
            <p className="text-center text-gray-500 text-xs mt-4">
              ¿No tienes una cuenta? <a href="#" className="text-blue-500 hover:text-blue-800">Regístrate</a>
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