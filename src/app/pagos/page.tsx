'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function PaymentSection() {
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
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
        <div className="flex justify-center items-center pt-10">
          <div className="w-full max-w-4xl px-4">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Resumen del Pedido */}
              <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Resumen del Pedido</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700">Producto/Servicio</span>
                    <span className="font-semibold">$299.00</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700">Impuestos (16%)</span>
                    <span className="font-semibold">$47.84</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700">Envío</span>
                    <span className="font-semibold">$50.00</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-lg font-bold bg-yellow-200 px-4 py-2 rounded">
                    <span>Total</span>
                    <span>$396.84</span>
                  </div>
                </div>
              </div>

              {/* Formulario de Validación de Transacción */}
              <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Validar Transacción</h2>
                
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
                    <h3 className="font-bold text-gray-800 mb-2">Instrucciones:</h3>
                    <p className="text-sm text-gray-700 mb-2">1. Realiza el pago mediante transferencia bancaria</p>
                    <p className="text-sm text-gray-700 mb-2">2. Obtén el número de transacción</p>
                    <p className="text-sm text-gray-700">3. Ingresa el número aquí para validar tu pago</p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transactionNumber">
                      Número de Transacción *
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                      id="transactionNumber"
                      type="text"
                      placeholder="Ej: TXN123456789"
                      required
                    />
                    <p className="text-gray-600 text-xs mt-1">
                      Ingresa el número de transacción proporcionado por tu banco
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentAmount">
                      Monto del Pago *
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-lg"
                      id="paymentAmount"
                      type="number"
                      step="0.01"
                      placeholder="396.84"
                      required
                    />
                    <p className="text-gray-600 text-xs mt-1">
                      Debe coincidir con el monto total del pedido
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentDate">
                      Fecha del Pago *
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="paymentDate"
                      type="date"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerEmail">
                      Email de Confirmación *
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="customerEmail"
                      type="email"
                      placeholder="tu@email.com"
                      required
                    />
                    <p className="text-gray-600 text-xs mt-1">
                      Te enviaremos la confirmación a este email
                    </p>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex flex-col space-y-3 pt-4">
                    <button
                      className="bg-yellow-200 hover:bg-yellow-300 text-black font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full transition-colors"
                      type="submit"
                    >
                      Validar Transacción
                    </button>
                    
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline w-full transition-colors"
                      type="button"
                    >
                      Volver
                    </button>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-6">
                    <h4 className="font-bold text-blue-800 mb-2">📋 Datos Bancarios:</h4>
                    <p className="text-sm text-blue-700 mb-1"><strong>Banco:</strong> Banco Nacional</p>
                    <p className="text-sm text-blue-700 mb-1"><strong>Cuenta:</strong> 1234-5678-9012-3456</p>
                    <p className="text-sm text-blue-700 mb-1"><strong>CLABE:</strong> 012345678901234567</p>
                    <p className="text-sm text-blue-700"><strong>Beneficiario:</strong> Mi Empresa S.A. de C.V.</p>
                  </div>
                  
                  <p className="text-center text-gray-500 text-xs mt-4">
                    🔍 La validación puede tomar de 5 a 10 minutos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-yellow-200 w-full h-20 flex items-center justify-center mt-10">
        <p className="text-gray-700 text-sm">© 2024 Mi Empresa. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}