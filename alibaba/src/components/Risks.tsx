'use client'
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine, BarChart, Cell,
} from 'recharts'
import { useLang } from '@/contexts/LanguageContext'

// Break-even chart data
const BE_DATA = Array.from({ length: 11 }, (_, i) => {
  const revenue = i * 2500
  return {
    revenue,
    totalCost: 9200 + 0.45 * revenue,
    fixedCost: 9200,
    revenueVal: revenue,
  }
})

const BASE_NPV = 18240

export default function Risks() {
  const { t } = useLang()
  const r = t.risks

  // Tornado data
  const tornadoData = r.tornadoVars.map(v => ({
    name: v.name,
    change: v.change,
    low: v.low,
    high: v.high,
    range: v.range,
    // relative to base
    lowDelta: v.low - BASE_NPV,
    highDelta: v.high - BASE_NPV,
  })).sort((a, b) => b.range - a.range)

  // Tornado chart format: bar from low to high with base marker
  const tornadoChartData = tornadoData.map(d => ({
    name: d.name.length > 28 ? d.name.slice(0, 26) + '…' : d.name,
    fullName: d.name,
    low: d.low,
    high: d.high,
    range: d.range,
    // For waterfall style: start from low, bar = high - low
    start: d.low,
    span: d.high - d.low,
  }))

  const CustomBETip = ({ active, payload, label }: {active?: boolean; payload?: Array<{name: string; value: number; color: string}>; label?: string}) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-3 text-xs">
          <p className="text-[#888] mb-2">Revenue: ${(label as unknown as number)?.toLocaleString()}M</p>
          {payload.map((p, i) => (
            <p key={i} style={{ color: p.color }} className="font-bold">
              {p.name}: ${p.value?.toLocaleString()}M
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const CustomTornadoTip = ({ active, payload }: {active?: boolean; payload?: Array<{payload: typeof tornadoChartData[0]}>}) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload
      return (
        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-3 text-xs max-w-xs">
          <p className="text-white font-bold mb-1">{d.fullName}</p>
          <p className="text-[#EF4444]">Low: ${d.low?.toLocaleString()}M</p>
          <p className="text-[#22C55E]">High: ${d.high?.toLocaleString()}M</p>
          <p className="text-[#FF6A00]">Range: ${d.range?.toLocaleString()}M</p>
        </div>
      )
    }
    return null
  }

  return (
    <section id="risks" className="py-24 md:py-32 border-t border-[#2A2A2A]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#FF6A00] uppercase mb-3 block">
            {r.sectionTag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{r.title}</h2>
          <p className="text-[#666] text-lg max-w-2xl">{r.subtitle}</p>
        </div>

        {/* Break-Even */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 mb-6">
          <h3 className="text-xl font-bold text-white mb-1">{r.beTitle}</h3>
          <p className="text-xs text-[#555] uppercase tracking-wider mb-4">{r.beSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4 md:col-span-3">
              <div className="text-xs text-[#FF6A00] font-mono mb-1">Formula</div>
              <div className="text-xs text-[#888] font-mono">{r.beFormula}</div>
            </div>
            <div className="bg-[#0D0D0D] border border-[#FF6A00]/20 rounded-xl p-4">
              <div className="text-xs text-[#555] mb-1">{r.beResult.split(':')[0]}</div>
              <div className="text-xl font-black text-[#FF6A00]">$16,727M/year</div>
            </div>
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4">
              <div className="text-xs text-[#555] mb-1">Break-Even Clients</div>
              <div className="text-xl font-black text-white">5,974</div>
              <div className="text-xs text-[#555]">enterprise clients</div>
            </div>
            <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl p-4">
              <div className="text-xs text-[#22C55E] mb-1">Current Status</div>
              <div className="text-sm font-bold text-[#22C55E]">~$17.4B run rate</div>
              <div className="text-xs text-[#555]">Already at break-even ✓</div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={BE_DATA} margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis
                dataKey="revenue"
                stroke="#444"
                tick={{ fill: '#666', fontSize: 11 }}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}B`}
                label={{ value: 'Revenue ($M)', position: 'insideBottom', offset: -10, fill: '#555', fontSize: 11 }}
              />
              <YAxis
                stroke="#444"
                tick={{ fill: '#666', fontSize: 10 }}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}B`}
              />
              <Tooltip content={<CustomBETip />} />
              <Legend
                wrapperStyle={{ paddingTop: '12px' }}
                formatter={(value) => <span style={{ color: '#888', fontSize: '11px' }}>{value}</span>}
              />
              <ReferenceLine x={16727} stroke="#FF6A00" strokeDasharray="6 3" strokeWidth={2}
                label={{ value: 'Break-Even', position: 'top', fill: '#FF6A00', fontSize: 11 }}
              />
              <Line type="monotone" dataKey="revenueVal" name={r.beChartRevenue} stroke="#22C55E" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="totalCost" name={r.beChartTotalCost} stroke="#EF4444" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="fixedCost" name={r.beChartFixedCost} stroke="#FF6A00" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Tornado Chart */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 mb-6">
          <h3 className="text-xl font-bold text-white mb-1">{r.tornadoTitle}</h3>
          <p className="text-xs text-[#555] uppercase tracking-wider mb-6">{r.tornadoSubtitle}</p>

          {/* Tornado table */}
          <div className="overflow-x-auto mb-6">
            <table className="data-table w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">{r.tornadoVar}</th>
                  <th className="text-center">{r.tornadoChange}</th>
                  <th className="text-right">{r.tornadoLow}</th>
                  <th className="text-right">{r.tornadoHigh}</th>
                  <th className="text-right">{r.tornadoRange}</th>
                </tr>
              </thead>
              <tbody>
                {tornadoData.map((row, i) => (
                  <tr key={i}>
                    <td className="text-[#CCC]">{row.name}</td>
                    <td className="text-center font-mono text-[#888]">{row.change}</td>
                    <td className="text-right font-mono text-[#EF4444]">${row.low.toLocaleString()}M</td>
                    <td className="text-right font-mono text-[#22C55E]">${row.high.toLocaleString()}M</td>
                    <td className="text-right font-mono font-bold text-[#FF6A00]">${row.range.toLocaleString()}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tornado visual bars */}
          <div className="space-y-3">
            {tornadoData.map((row, i) => {
              const maxRange = tornadoData[0].range
              const barWidth = (row.range / maxRange) * 100
              const lowWidth = ((BASE_NPV - row.low) / row.range) * barWidth
              const highWidth = ((row.high - BASE_NPV) / row.range) * barWidth
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-48 text-xs text-[#888] text-right flex-shrink-0 truncate" title={row.name}>
                    {row.name}
                  </div>
                  <div className="flex-1 flex items-center">
                    <div className="flex-1 flex justify-end">
                      <div
                        className="h-5 rounded-l bg-[#EF4444]/70 flex items-center justify-end pr-1"
                        style={{ width: `${Math.min(lowWidth, 50)}%` }}
                      >
                        <span className="text-[10px] text-white font-bold">
                          ${(row.low / 1000).toFixed(1)}B
                        </span>
                      </div>
                    </div>
                    <div className="w-px h-7 bg-[#FF6A00] flex-shrink-0 mx-0.5" />
                    <div className="flex-1">
                      <div
                        className="h-5 rounded-r bg-[#22C55E]/70 flex items-center pl-1"
                        style={{ width: `${Math.min(highWidth, 50)}%` }}
                      >
                        <span className="text-[10px] text-white font-bold">
                          ${(row.high / 1000).toFixed(1)}B
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="flex items-center gap-3 mt-2">
              <div className="w-48 flex-shrink-0" />
              <div className="flex-1 flex justify-center">
                <span className="text-xs text-[#FF6A00] font-bold">← Base NPV $18,240M →</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Analysis */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-1">{r.scenarioTitle}</h3>
          <p className="text-xs text-[#555] uppercase tracking-wider mb-6">{r.scenarioSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {r.scenarios.map((sc, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 border"
                style={{
                  background: `${sc.color}08`,
                  borderColor: `${sc.color}30`,
                }}
              >
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-black mb-4 uppercase tracking-wider"
                  style={{ background: `${sc.color}20`, color: sc.color }}
                >
                  {sc.name}
                </div>
                <p className="text-xs text-[#666] mb-4">{sc.assumptions}</p>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-[#555] uppercase tracking-wider">NPV</div>
                    <div className="text-2xl font-black" style={{ color: sc.color }}>{sc.npv}</div>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <div className="text-xs text-[#555]">IRR</div>
                      <div className="text-lg font-bold text-white">{sc.irr}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[#555]">Payback</div>
                      <div className="text-lg font-bold text-white">{sc.pb}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* All positive note */}
          <div className="mt-6 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-xl p-4">
            <p className="text-sm text-[#22C55E] font-semibold">
              ✓ All scenarios — including Bear — show positive NPV. The investment decision is robust.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
