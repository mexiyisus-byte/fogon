'use client'
import { useState, useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { useLang } from '@/contexts/LanguageContext'
import {
  calcNPV, calcIRR, calcMIRR, calcSimplePayback, calcDiscountedPayback, calcPI,
  generateSimCashFlows,
} from '@/lib/financialMath'

interface Params {
  initialInvestment: number
  annualGrowthRate: number
  wacc: number
  projectLife: number
  termGrowthRate: number
  operatingMargin: number
}

const DEFAULT_PARAMS: Params = {
  initialInvestment: 52400,
  annualGrowthRate: 22,
  wacc: 9.2,
  projectLife: 10,
  termGrowthRate: 3,
  operatingMargin: 15,
}

const RANGES = {
  initialInvestment: { min: 5000, max: 80000, step: 500 },
  annualGrowthRate: { min: 5, max: 50, step: 0.5 },
  wacc: { min: 4, max: 20, step: 0.1 },
  projectLife: { min: 5, max: 15, step: 1 },
  termGrowthRate: { min: 0, max: 6, step: 0.1 },
  operatingMargin: { min: 5, max: 35, step: 0.5 },
}

function fmtM(v: number | null): string {
  if (v === null || !isFinite(v)) return 'N/A'
  const abs = Math.abs(v)
  const str = abs >= 1000
    ? `$${(abs / 1000).toFixed(1)}B`
    : `$${abs.toFixed(0)}M`
  return v < 0 ? `(${str})` : str
}

function fmtPct(v: number | null): string {
  if (v === null || !isFinite(v)) return 'N/A'
  return `${(v * 100).toFixed(1)}%`
}

function fmtYrs(v: number | null): string {
  if (v === null || v === Infinity || !isFinite(v)) return '> Project life'
  return `${v.toFixed(2)} yrs`
}

interface SliderInputProps {
  label: string
  paramKey: keyof Params
  value: number
  onChange: (k: keyof Params, v: number) => void
  prefix?: string
  suffix?: string
}

function SliderInput({ label, paramKey, value, onChange, prefix = '', suffix = '' }: SliderInputProps) {
  const r = RANGES[paramKey]
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs text-[#888] uppercase tracking-wider font-semibold">{label}</label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#555]">{prefix}</span>
          <input
            type="number"
            value={value}
            min={r.min}
            max={r.max}
            step={r.step}
            onChange={e => onChange(paramKey, parseFloat(e.target.value) || r.min)}
            className="w-20 text-right text-sm font-bold text-[#FF6A00] bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-2 py-1 focus:outline-none focus:border-[#FF6A00]"
          />
          <span className="text-xs text-[#555]">{suffix}</span>
        </div>
      </div>
      <input
        type="range"
        min={r.min}
        max={r.max}
        step={r.step}
        value={value}
        onChange={e => onChange(paramKey, parseFloat(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-[#444] mt-1">
        <span>{prefix}{r.min}{suffix}</span>
        <span>{prefix}{r.max}{suffix}</span>
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: {active?: boolean; payload?: Array<{value: number; name: string}>; label?: string}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-3 shadow-xl">
        <p className="text-xs text-[#888] mb-1">Year {label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm font-bold" style={{ color: p.value >= 0 ? '#22C55E' : '#EF4444' }}>
            Cumulative NPV: {fmtM(p.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Simulator() {
  const { t } = useLang()
  const s = t.simulator
  const [params, setParams] = useState<Params>(DEFAULT_PARAMS)

  const handleChange = (k: keyof Params, v: number) => {
    setParams(prev => ({ ...prev, [k]: v }))
  }

  const { cashFlows, results, chartData } = useMemo(() => {
    const cfs = generateSimCashFlows(params)
    const wacc = params.wacc / 100

    const npv = calcNPV(cfs, wacc)
    const irr = calcIRR(cfs)
    const mirr = calcMIRR(cfs, wacc, wacc)
    const pb = calcSimplePayback(cfs)
    const dpb = calcDiscountedPayback(cfs, wacc)
    const pi = calcPI(cfs, wacc)

    const accept = npv > 0 && irr > wacc

    // Chart data: cumulative discounted CF
    let cumDisc = 0
    const cd = cfs.map((cf, t) => {
      cumDisc += cf / Math.pow(1 + wacc, t)
      return { year: t, cumNPV: Math.round(cumDisc) }
    })

    return {
      cashFlows: cfs,
      results: { npv, irr, mirr, pb, dpb, pi, accept },
      chartData: cd,
    }
  }, [params])

  const outputCards = [
    { label: s.npvOut, value: fmtM(results.npv), color: results.npv >= 0 ? '#22C55E' : '#EF4444' },
    { label: s.irrOut, value: fmtPct(results.irr), color: results.irr > params.wacc / 100 ? '#22C55E' : '#EF4444' },
    { label: s.mirrOut, value: fmtPct(results.mirr), color: results.mirr > params.wacc / 100 ? '#22C55E' : '#EF4444' },
    { label: s.pbOut, value: fmtYrs(results.pb), color: '#FF6A00' },
    { label: s.dpbOut, value: fmtYrs(results.dpb), color: '#FF6A00' },
    { label: s.piOut, value: isFinite(results.pi) ? results.pi.toFixed(2) : 'N/A', color: results.pi >= 1 ? '#22C55E' : '#EF4444' },
  ]

  // Table rows
  let cumDisc2 = 0
  const tableRows = cashFlows.map((cf, t) => {
    const disc = cf / Math.pow(1 + params.wacc / 100, t)
    cumDisc2 += disc
    const isLast = t === cashFlows.length - 1
    return { t, cf, disc, cum: cumDisc2, isLast }
  })

  return (
    <section id="simulator" className="py-24 md:py-32 border-t border-[#2A2A2A]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#FF6A00] uppercase mb-3 block">
            {s.sectionTag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{s.title}</h2>
          <p className="text-[#666] text-lg max-w-2xl">{s.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
          {/* Inputs panel */}
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-6 uppercase tracking-wider">
              {s.inputsTitle}
            </h3>

            <SliderInput label={s.inv} paramKey="initialInvestment" value={params.initialInvestment} onChange={handleChange} prefix="$" suffix="M" />
            <SliderInput label={s.growth} paramKey="annualGrowthRate" value={params.annualGrowthRate} onChange={handleChange} suffix="%" />
            <SliderInput label={s.wacc} paramKey="wacc" value={params.wacc} onChange={handleChange} suffix="%" />
            <SliderInput label={s.life} paramKey="projectLife" value={params.projectLife} onChange={handleChange} suffix=" yrs" />
            <SliderInput label={s.termGrowth} paramKey="termGrowthRate" value={params.termGrowthRate} onChange={handleChange} suffix="%" />
            <SliderInput label={s.margin} paramKey="operatingMargin" value={params.operatingMargin} onChange={handleChange} suffix="%" />
          </div>

          {/* Results panel */}
          <div className="space-y-6">
            {/* Accept/Reject */}
            <div
              className={`rounded-2xl p-5 border flex items-center gap-4 ${
                results.accept
                  ? 'bg-[#22C55E]/10 border-[#22C55E]/30'
                  : 'bg-[#EF4444]/10 border-[#EF4444]/30'
              }`}
            >
              <div
                className="text-3xl font-black flex-shrink-0"
                style={{ color: results.accept ? '#22C55E' : '#EF4444' }}
              >
                {results.accept ? `✓ ${s.accept}` : `✗ ${s.reject}`}
              </div>
              <p className="text-sm text-[#888]">
                {results.accept ? s.acceptReason : s.rejectReason}
                {' · '}NPV {fmtM(results.npv)}
                {' · '}IRR {fmtPct(results.irr)}
                {' · '}WACC {params.wacc}%
              </p>
            </div>

            {/* Output KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {outputCards.map((card, i) => (
                <div key={i} className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-4">
                  <div className="text-xs text-[#555] uppercase tracking-wider mb-2">{card.label}</div>
                  <div className="text-2xl font-black" style={{ color: card.color }}>{card.value}</div>
                </div>
              ))}
            </div>

            {/* Cumulative NPV Chart */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">{s.chartTitle}</h3>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                  <XAxis
                    dataKey="year"
                    stroke="#444"
                    tick={{ fill: '#666', fontSize: 11 }}
                    label={{ value: 'Year', position: 'insideBottom', offset: -2, fill: '#555', fontSize: 11 }}
                  />
                  <YAxis
                    stroke="#444"
                    tick={{ fill: '#666', fontSize: 10 }}
                    tickFormatter={v => `$${(v / 1000).toFixed(0)}B`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={0} stroke="#FF6A00" strokeDasharray="4 4" strokeWidth={1.5} />
                  <Line
                    type="monotone"
                    dataKey="cumNPV"
                    stroke="#FF6A00"
                    strokeWidth={2.5}
                    dot={{ fill: '#FF6A00', r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: '#FF6A00', stroke: '#0D0D0D', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Cash Flow Table */}
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">{s.tableTitle}</h3>
              <div className="overflow-x-auto max-h-64 overflow-y-auto">
                <table className="data-table w-full text-xs">
                  <thead className="sticky top-0">
                    <tr>
                      <th className="text-left">{s.yearCol}</th>
                      <th className="text-right">{s.cfCol}</th>
                      <th className="text-right">{s.discCFCol}</th>
                      <th className="text-right">{s.cumCFCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map(row => (
                      <tr key={row.t} className={row.cum >= 0 && row.t > 0 && tableRows[row.t - 1]?.cum < 0 ? 'bg-[#22C55E]/5' : ''}>
                        <td className="font-semibold">
                          Yr {row.t}
                          {row.isLast && <span className="ml-1 text-[10px] text-[#FF6A00]">{s.tvIncluded}</span>}
                        </td>
                        <td className={`text-right font-mono ${row.cf >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                          {row.cf >= 0 ? '+' : ''}{Math.round(row.cf).toLocaleString()}
                        </td>
                        <td className={`text-right font-mono ${row.disc >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                          {row.disc >= 0 ? '+' : ''}{Math.round(row.disc).toLocaleString()}
                        </td>
                        <td className={`text-right font-mono font-bold ${row.cum >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                          {row.cum >= 0 ? '+' : ''}{Math.round(row.cum).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
