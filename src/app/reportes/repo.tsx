'use client';
import { useMemo } from 'react';

/* ===================== Datos de ejemplo (cámbialos por los reales) ===================== */
type VentaDia = { fecha: string; ventas: number; ingresos: number };
type MotivoCancel = { motivo: string; cantidad: number };
type MetodoPago = { metodo: string; porcentaje: number };

const dataVentas: VentaDia[] = [
  { fecha: 'Lun', ventas: 24, ingresos: 3200 },
  { fecha: 'Mar', ventas: 31, ingresos: 4100 },
  { fecha: 'Mié', ventas: 18, ingresos: 2300 },
  { fecha: 'Jue', ventas: 35, ingresos: 4700 },
  { fecha: 'Vie', ventas: 44, ingresos: 5900 },
  { fecha: 'Sáb', ventas: 28, ingresos: 3600 },
  { fecha: 'Dom', ventas: 22, ingresos: 2900 },
];

const dataCancelaciones: MotivoCancel[] = [
  { motivo: 'Error en pedido', cantidad: 8 },
  { motivo: 'Cliente lo solicitó', cantidad: 12 },
  { motivo: 'Pago no confirmado', cantidad: 5 },
  { motivo: 'Stock insuficiente', cantidad: 7 },
];

const dataMetodosPago: MetodoPago[] = [
  { metodo: 'Tarjeta', porcentaje: 52 },
  { metodo: 'Transferencia', porcentaje: 28 },
  { metodo: 'Efectivo', porcentaje: 14 },
  { metodo: 'Otros', porcentaje: 6 },
];

/* ===================== Página ===================== */
export default function ReportesPage() {
  const { totalVentas, totalIngresos, tasaCancel, ticketProm } = useMemo(() => {
    const ventas = dataVentas.reduce((acc, d) => acc + d.ventas, 0);
    const ingresos = dataVentas.reduce((acc, d) => acc + d.ingresos, 0);
    const cancels = dataCancelaciones.reduce((a, c) => a + c.cantidad, 0);
    const tasa = ventas === 0 ? 0 : (cancels / ventas) * 100;
    const ticket = ventas === 0 ? 0 : ingresos / ventas;
    return { totalVentas: ventas, totalIngresos: ingresos, tasaCancel: tasa, ticketProm: ticket };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Título */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-rose-700">Reportes</h1>
          <p className="text-gray-600">Resumen de ventas, ingresos y cancelaciones</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KpiCard title="Ventas" value={totalVentas.toLocaleString()} subtitle="Último periodo" />
          <KpiCard title="Ingresos" value={`$ ${totalIngresos.toLocaleString()}`} subtitle="Total bruto" />
          <KpiCard title="Tasa de cancelación" value={`${tasaCancel.toFixed(1)}%`} subtitle="Canc./Ventas" />
          <KpiCard title="Ticket promedio" value={`$ ${ticketProm.toFixed(2)}`} subtitle="Ingresos/Venta" />
        </div>

        {/* Gráficas (SVG puro) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2 bg-white border border-amber-200 rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tendencia semanal</h3>
            <p className="text-sm text-gray-500 mb-4">Ventas e ingresos por día</p>
            <LineChartSVG
              width={900}
              height={280}
              padding={{ top: 20, right: 20, bottom: 30, left: 40 }}
              xLabels={dataVentas.map(d => d.fecha)}
              series={[
                { name: 'ventas', values: dataVentas.map(d => d.ventas), stroke: '#f59e0b' }, // ámbar
                { name: 'ingresos', values: dataVentas.map(d => d.ingresos), stroke: '#fb7185' }, // rosa
              ]}
            />
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
              <LegendDot color="#f59e0b" label="Ventas" />
              <LegendDot color="#fb7185" label="Ingresos" />
            </div>
          </div>

          <div className="bg-white border border-rose-200 rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Cancelaciones por motivo</h3>
            <p className="text-sm text-gray-500 mb-4">Distribución por categoría</p>
            <BarChartSVG
              width={500}
              height={280}
              padding={{ top: 20, right: 20, bottom: 40, left: 40 }}
              data={dataCancelaciones.map(d => ({ label: d.motivo, value: d.cantidad }))}
              fill="#fb7185"
            />
          </div>

          <div className="bg-white border border-amber-200 rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Métodos de pago</h3>
            <p className="text-sm text-gray-500 mb-4">Porcentaje de uso</p>
            <DonutChartSVG
              width={500}
              height={280}
              data={dataMetodosPago.map(d => ({ label: d.metodo, value: d.porcentaje }))}
              colors={['#fb7185', '#f59e0b', '#60a5fa', '#34d399']}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== UI: KPI Card ===================== */
function KpiCard({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) {
  return (
    <div className="bg-white border border-amber-200 rounded-xl shadow-md p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-block w-3 h-3 rounded-full" style={{ background: color }} />
      <span>{label}</span>
    </div>
  );
}

/* ===================== SVG Charts (sin librerías) ===================== */

/** LineChartSVG: soporta múltiples series, ejes simples y grid */
function LineChartSVG({
  width,
  height,
  padding,
  xLabels,
  series,
}: {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
  xLabels: string[];
  series: { name: string; values: number[]; stroke: string }[];
}) {
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const allValues = series.flatMap(s => s.values);
  const yMax = Math.max(1, Math.max(...allValues));
  const yMin = 0;

  const xStep = innerW / Math.max(1, xLabels.length - 1);
  const yScale = (v: number) => innerH - ((v - yMin) / (yMax - yMin)) * innerH;

  const gridY = 4; // líneas horizontales
  const gridLines = Array.from({ length: gridY + 1 }, (_, i) => Math.round((i * innerH) / gridY));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-72">
      {/* Área de dibujo */}
      <g transform={`translate(${padding.left},${padding.top})`}>
        {/* Grid */}
        {gridLines.map((y, i) => (
          <line key={i} x1={0} x2={innerW} y1={y} y2={y} stroke="#e5e7eb" strokeDasharray="4 4" />
        ))}

        {/* Eje X labels */}
        {xLabels.map((lab, i) => (
          <text
            key={lab + i}
            x={i * xStep}
            y={innerH + 18}
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
          >
            {lab}
          </text>
        ))}

        {/* Eje Y labels (0..yMax en 4 pasos) */}
        {gridLines.map((y, i) => {
          const v = Math.round(((gridY - i) * yMax) / gridY);
          return (
            <text key={'y' + i} x={-8} y={y} textAnchor="end" fontSize="12" fill="#6b7280" dy="0.32em">
              {v}
            </text>
          );
        })}

        {/* Series */}
        {series.map(s => {
          const d = s.values
            .map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * xStep} ${yScale(v)}`)
            .join(' ');
          return <path key={s.name} d={d} fill="none" stroke={s.stroke} strokeWidth={2} />;
        })}

        {/* Puntos */}
        {series.map(s =>
          s.values.map((v, i) => (
            <circle
              key={`${s.name}-${i}`}
              cx={i * xStep}
              cy={yScale(v)}
              r={3}
              fill="#fff"
              stroke={s.stroke}
              strokeWidth={2}
            >
              <title>{`${xLabels[i]} • ${s.name}: ${v}`}</title>
            </circle>
          )),
        )}
      </g>
    </svg>
  );
}

/** BarChartSVG: barras verticales con labels en X */
function BarChartSVG({
  width,
  height,
  padding,
  data,
  fill = '#fb7185',
}: {
  width: number;
  height: number;
  padding: { top: number; right: number; bottom: number; left: number };
  data: { label: string; value: number }[];
  fill?: string;
}) {
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const maxV = Math.max(1, ...data.map(d => d.value));
  const barW = innerW / data.length * 0.6;
  const gap = innerW / data.length * 0.4;

  const yScale = (v: number) => innerH - (v / maxV) * innerH;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-72">
      <g transform={`translate(${padding.left},${padding.top})`}>
        {/* Eje X labels */}
        {data.map((d, i) => (
          <text
            key={d.label}
            x={i * (barW + gap) + barW / 2}
            y={innerH + 18}
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
          >
            {d.label}
          </text>
        ))}

        {/* Barras */}
        {data.map((d, i) => (
          <g key={d.label}>
            <rect
              x={i * (barW + gap)}
              y={yScale(d.value)}
              width={barW}
              height={innerH - yScale(d.value)}
              rx={6}
              ry={6}
              fill={fill}
            >
              <title>{`${d.label}: ${d.value}`}</title>
            </rect>
            <text
              x={i * (barW + gap) + barW / 2}
              y={yScale(d.value) - 6}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
            >
              {d.value}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** DonutChartSVG: gráfica de dona con leyendas en tooltip */
function DonutChartSVG({
  width,
  height,
  data,
  colors,
}: {
  width: number;
  height: number;
  data: { label: string; value: number }[];
  colors: string[];
}) {
  const cx = width / 2;
  const cy = height / 2 + 5;
  const outerR = Math.min(width, height) * 0.28;
  const innerR = outerR * 0.55;
  const total = Math.max(1, data.reduce((a, d) => a + d.value, 0));

  let startAngle = -Math.PI / 2;

  const arcs = data.map((d, i) => {
    const angle = (d.value / total) * Math.PI * 2;
    const endAngle = startAngle + angle;

    const p = describeArc(cx, cy, outerR, innerR, startAngle, endAngle);
    const arc = { path: p, color: colors[i % colors.length], label: d.label, value: d.value };

    startAngle = endAngle;
    return arc;
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-72">
      {/* Dona */}
      {arcs.map((a, i) => (
        <path key={i} d={a.path} fill={a.color}>
          <title>{`${a.label}: ${((a.value / total) * 100).toFixed(1)}%`}</title>
        </path>
      ))}

      {/* Centro */}
      <circle cx={cx} cy={cy} r={innerR - 1} fill="#fff" />

      {/* Leyendas simples debajo */}
      <g transform={`translate(${cx - 100}, ${height - 30})`}>
        {data.map((d, i) => (
          <g key={i} transform={`translate(${(i % 2) * 100}, ${Math.floor(i / 2) * 18})`}>
            <rect width="10" height="10" fill={colors[i % colors.length]} rx="2" ry="2" />
            <text x="16" y="10" fontSize="12" fill="#374151">
              {d.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ===================== Helpers geométricos para la dona ===================== */
function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function describeArc(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  start: number,
  end: number
) {
  const largeArc = end - start <= Math.PI ? 0 : 1;

  const p1 = polarToCartesian(cx, cy, outerR, start);
  const p2 = polarToCartesian(cx, cy, outerR, end);
  const p3 = polarToCartesian(cx, cy, innerR, end);
  const p4 = polarToCartesian(cx, cy, innerR, start);

  return [
    `M ${p1.x} ${p1.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    'Z',
  ].join(' ');
}
