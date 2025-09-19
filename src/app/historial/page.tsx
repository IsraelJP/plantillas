'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Definición de tipos
type StatusType = 'Entregado' | 'En Tránsito' | 'Procesando' | 'Pendiente';

interface Producto {
  nombre: string;
  cantidad: number;
  precio: number;
}

interface Venta {
  id: string;
  cliente: string;
  productos: Producto[];
  fechaPedido: string;
  fechaEntrega: string;
  status: StatusType;
  total: number;
  metodoPago: string;
}

export default function SalesHistory() {
  const [filterStatus, setFilterStatus] = useState<'all' | StatusType>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Datos simulados de ventas de cereales
  const salesData: Venta[] = [
    {
      id: 'PED-001',
      cliente: 'ERP',
      productos: [
        { nombre: 'Corn Flakes Kellogg\'s', cantidad: 48, precio: 89.50 },
        { nombre: 'Granola Nature Valley', cantidad: 24, precio: 125.00 },
        { nombre: 'Avena Quaker', cantidad: 36, precio: 45.75 }
      ],
      fechaPedido: '2024-09-15',
      fechaEntrega: '2024-09-18',
      status: 'Entregado',
      total: 7758.00,
      metodoPago: 'Transferencia'
    },
    {
      id: 'PED-002',
      cliente: 'ERP',
      productos: [
        { nombre: 'Cheerios General Mills', cantidad: 60, precio: 95.25 },
        { nombre: 'Zucaritas Kellogg\'s', cantidad: 30, precio: 78.90 },
        { nombre: 'Choco Krispis', cantidad: 42, precio: 82.15 }
      ],
      fechaPedido: '2024-09-16',
      fechaEntrega: '2024-09-19',
      status: 'En Tránsito',
      total: 11772.30,
      metodoPago: 'Crédito 30 días'
    },
    {
      id: 'PED-003',
      cliente: 'ERP',
      productos: [
        { nombre: 'Special K Kellogg\'s', cantidad: 18, precio: 110.00 },
        { nombre: 'Granola con Miel', cantidad: 12, precio: 135.50 },
        { nombre: 'Cereal Fitness', cantidad: 24, precio: 98.75 }
      ],
      fechaPedido: '2024-09-14',
      fechaEntrega: '2024-09-17',
      status: 'Entregado',
      total: 6270.00,
      metodoPago: 'Efectivo'
    },
    {
      id: 'PED-004',
      cliente: 'ERP',
      productos: [
        { nombre: 'Trix General Mills', cantidad: 36, precio: 85.25 },
        { nombre: 'Lucky Charms', cantidad: 18, precio: 120.00 },
        { nombre: 'Cocoa Puffs', cantidad: 24, precio: 92.50 }
      ],
      fechaPedido: '2024-09-17',
      fechaEntrega: '2024-09-20',
      status: 'Procesando',
      total: 7389.00,
      metodoPago: 'Transferencia'
    },
    {
      id: 'PED-005',
      cliente: 'ERP',
      productos: [
        { nombre: 'Froot Loops Kellogg\'s', cantidad: 30, precio: 88.00 },
        { nombre: 'Honey Nut Cheerios', cantidad: 24, precio: 105.75 },
        { nombre: 'Raisin Bran', cantidad: 18, precio: 95.50 }
      ],
      fechaPedido: '2024-09-13',
      fechaEntrega: '2024-09-16',
      status: 'Entregado',
      total: 6459.00,
      metodoPago: 'Crédito 15 días'
    },
    {
      id: 'PED-006',
      cliente: 'ERP',
      productos: [
        { nombre: 'All-Bran Kellogg\'s', cantidad: 15, precio: 115.25 },
        { nombre: 'Granola Artesanal', cantidad: 20, precio: 145.00 },
        { nombre: 'Muesli Premium', cantidad: 12, precio: 165.75 }
      ],
      fechaPedido: '2024-09-18',
      fechaEntrega: '2024-09-21',
      status: 'Pendiente',
      total: 6608.75,
      metodoPago: 'Transferencia'
    }
  ];

  const getStatusColor = (status: StatusType): string => {
    switch (status) {
      case 'Entregado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'En Tránsito':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Procesando':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Pendiente':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredSales = salesData.filter(sale => {
    const matchesStatus = filterStatus === 'all' || sale.status === filterStatus;
    const matchesSearch = sale.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalVentas = salesData.reduce((sum, sale) => sum + sale.total, 0);
  const ventasEntregadas = salesData.filter(sale => sale.status === 'Entregado').length;

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
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Título y Estadísticas */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Historial de Ventas - Cereales</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Total Pedidos</h3>
                <p className="text-2xl font-bold text-gray-900">{salesData.length}</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Entregados</h3>
                <p className="text-2xl font-bold text-green-600">{ventasEntregadas}</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Total Ventas</h3>
                <p className="text-2xl font-bold text-gray-900">${totalVentas.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-yellow-200 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">Promedio por Pedido</h3>
                <p className="text-2xl font-bold text-gray-900">${(totalVentas / salesData.length).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>

          {/* Filtros y Búsqueda */}
          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Buscar por Cliente o Pedido
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Filtrar por Estado
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | StatusType)}
                >
                  <option value="all">Todos los Estados</option>
                  <option value="Entregado">Entregado</option>
                  <option value="En Tránsito">En Tránsito</option>
                  <option value="Procesando">Procesando</option>
                  <option value="Pendiente">Pendiente</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabla de Ventas */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-yellow-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Productos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Fecha Pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{sale.id}</div>
                        <div className="text-sm text-gray-500">{sale.metodoPago}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{sale.cliente}</div>
                        <div className="text-sm text-gray-500">Entrega: {sale.fechaEntrega}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {sale.productos.map((producto, index) => (
                            <div key={index} className="mb-1">
                              <span className="font-medium">{producto.nombre}</span>
                              <div className="text-gray-500">
                                Qty: {producto.cantidad} | ${producto.precio}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.fechaPedido}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          ${sale.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(sale.status)}`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredSales.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron resultados para los filtros aplicados.</p>
            </div>
          )}

        </div>
      </main>
      

    </div>
  );
}