'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function PaymentSection() {
  // ⚠️ Sin cambios en la lógica: no se agregó estado ni handlers
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-amber-50 via-white to-white">
      {/* Encabezado simple */}
      <header className="border-b border-amber-200/60 bg-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800 shadow-inner">
            {/* icono tarjeta */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M3 7h18v2H3V7zm0 4h18v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6zm3 3h6v2H6v-2z"/></svg>
          </span>
          <div>
            <h1 className="text-xl font-bold text-amber-900">Pago y Validación</h1>
            <p className="text-sm text-amber-900/70">Confirma tu transacción para completar tu pedido.</p>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="flex items-start justify-center pt-8">
          <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Resumen del Pedido */}
              <section className="rounded-2xl border border-amber-200 bg-white/80 shadow-sm">
                <div className="border-b border-amber-100 px-6 py-5">
                  <h2 className="text-center text-2xl font-extrabold tracking-tight text-amber-900">Resumen del Pedido</h2>
                </div>

                <div className="px-6 py-5">
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between rounded-xl border border-amber-100 bg-amber-50/50 px-4 py-3">
                      <span className="flex items-center gap-2 text-amber-900">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-amber-100">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-amber-800"><path d="M12 4l4 4H8l4-4zM6 9h12v10a2 2 0 01-2 2H8a2 2 0 01-2-2V9z"/></svg>
                        </span>
                        Producto/Servicio
                      </span>
                      <span className="font-semibold text-amber-900">$299.00</span>
                    </li>
                    <li className="flex items-center justify-between rounded-xl border border-amber-100 bg-amber-50/30 px-4 py-3">
                      <span className="flex items-center gap-2 text-amber-900">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-amber-100">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-amber-800"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5v3h2v2h-2v3h-2v-3H9v-2h2V7h2z"/></svg>
                        </span>
                        Impuestos (16%)
                      </span>
                      <span className="font-semibold text-amber-900">$47.84</span>
                    </li>
                    <li className="flex items-center justify-between rounded-xl border border-amber-100 bg-amber-50/30 px-4 py-3">
                      <span className="flex items-center gap-2 text-amber-900">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-amber-100">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-amber-800"><path d="M20 8h-3V4H7v4H4l8 8 8-8zM7 20h10v-2H7v2z"/></svg>
                        </span>
                        Envío
                      </span>
                      <span className="font-semibold text-amber-900">$50.00</span>
                    </li>
                  </ul>

                  <div className="mt-5 rounded-2xl bg-amber-100 px-4 py-3 text-amber-900">
                    <div className="flex items-center justify-between text-lg font-extrabold">
                      <span>Total</span>
                      <span>$396.84</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-amber-900/70">
                    <div className="rounded-lg border border-amber-100 bg-white px-3 py-2">Factura: <span className="font-semibold">Incluida</span></div>
                    <div className="rounded-lg border border-amber-100 bg-white px-3 py-2">Entrega: <span className="font-semibold">48–72h</span></div>
                  </div>
                </div>
              </section>

              {/* Formulario de Validación de Transacción */}
              <section className="rounded-2xl border border-amber-200 bg-white/80 shadow-sm">
                <div className="border-b border-amber-100 px-6 py-5">
                  <h2 className="text-center text-2xl font-extrabold tracking-tight text-amber-900">Validar Transacción</h2>
                </div>

                <div className="px-6 py-6">
                  <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <h3 className="mb-2 font-bold text-amber-900">Instrucciones</h3>
                    <ol className="list-inside list-decimal text-sm text-amber-900/80">
                      <li>Realiza el pago mediante transferencia bancaria</li>
                      <li>Obtén el número de transacción</li>
                      <li>Ingresa el número aquí para validar tu pago</li>
                    </ol>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label htmlFor="transactionNumber" className="mb-2 block text-sm font-semibold text-amber-900">Número de Transacción *</label>
                      <input
                        id="transactionNumber"
                        type="text"
                        placeholder="Ej: TXN123456789"
                        required
                        className="w-full rounded-xl border border-amber-200 bg-white/80 px-4 py-3 text-amber-900 placeholder:text-amber-900/40 outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-200/50"
                      />
                      <p className="mt-1 text-xs text-amber-900/60">Ingresa el número de transacción proporcionado por tu banco</p>
                    </div>

                    <div>
                      <label htmlFor="paymentAmount" className="mb-2 block text-sm font-semibold text-amber-900">Monto del Pago *</label>
                      <input
                        id="paymentAmount"
                        type="number"
                        step="0.01"
                        placeholder="396.84"
                        required
                        className="w-full rounded-xl border border-amber-200 bg-white/80 px-4 py-3 text-amber-900 placeholder:text-amber-900/40 outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-200/50"
                      />
                      <p className="mt-1 text-xs text-amber-900/60">Debe coincidir con el monto total del pedido</p>
                    </div>

                    <div>
                      <label htmlFor="paymentDate" className="mb-2 block text-sm font-semibold text-amber-900">Fecha del Pago *</label>
                      <input
                        id="paymentDate"
                        type="date"
                        required
                        className="w-full rounded-xl border border-amber-200 bg-white/80 px-4 py-3 text-amber-900 outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-200/50"
                      />
                    </div>

                    <div>
                      <label htmlFor="customerEmail" className="mb-2 block text-sm font-semibold text-amber-900">Email de Confirmación *</label>
                      <input
                        id="customerEmail"
                        type="email"
                        placeholder="tu@email.com"
                        required
                        className="w-full rounded-xl border border-amber-200 bg-white/80 px-4 py-3 text-amber-900 placeholder:text-amber-900/40 outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-200/50"
                      />
                      <p className="mt-1 text-xs text-amber-900/60">Te enviaremos la confirmación a este email</p>
                    </div>

                    {/* Botones de Acción */}
                    <div className="pt-2">
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          className="w-full rounded-xl bg-amber-500 px-6 py-3 font-bold text-white shadow-sm transition-colors hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300/50"
                          type="submit"
                        >
                          Validar Transacción
                        </button>
                        <button
                          className="w-full rounded-xl bg-amber-100 px-6 py-3 font-bold text-amber-900 shadow-sm transition-colors hover:bg-amber-200 focus:outline-none focus:ring-4 focus:ring-amber-300/40"
                          type="button"
                        >
                          Volver
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
                      <h4 className="mb-2 font-bold text-blue-900">📋 Datos Bancarios</h4>
                      <p className="mb-1 text-sm text-blue-800"><strong>Banco:</strong> Banco Nacional</p>
                      <p className="mb-1 text-sm text-blue-800"><strong>Cuenta:</strong> 1234-5678-9012-3456</p>
                      <p className="mb-1 text-sm text-blue-800"><strong>CLABE:</strong> 012345678901234567</p>
                      <p className="text-sm text-blue-800"><strong>Beneficiario:</strong> Mi Empresa S.A. de C.V.</p>
                    </div>

                    <p className="mt-4 text-center text-xs text-amber-900/60">🔍 La validación puede tomar de 5 a 10 minutos</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Pie de página simple */}
      <footer className="mt-10 border-t border-amber-200/60 bg-white/50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-amber-900/70 sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} Granelia</span>
          <span className="inline-flex items-center gap-1">Seguridad <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/> SSL</span>
        </div>
      </footer>
    </div>
  );
}
