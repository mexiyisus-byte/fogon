'use client'
import { useLang } from '@/contexts/LanguageContext'

// Fixed cash flow data — exact values as specified
const CF_DATA = [
  { year: 0, cf: -18000, pvFactor: 1.000, pv: -18000, cumPV: -18000 },
  { year: 1, cf: -18000, pvFactor: 0.916, pv: -16488, cumPV: -34488 },
  { year: 2, cf: -16400, pvFactor: 0.839, pv: -13760, cumPV: -48248 },
  { year: 3, cf: 4200, pvFactor: 0.768, pv: 3226, cumPV: -45022 },
  { year: 4, cf: 9800, pvFactor: 0.703, pv: 6889, cumPV: -38133 },
  { year: 5, cf: 14500, pvFactor: 0.644, pv: 9338, cumPV: -28795 },
  { year: 6, cf: 18000, pvFactor: 0.590, pv: 10620, cumPV: -18175 },
  { year: 7, cf: 20500, pvFactor: 0.540, pv: 11070, cumPV: -7105 },
  { year: 8, cf: 22000, pvFactor: 0.494, pv: 10868, cumPV: 3763 },
  { year: 9, cf: 24000, pvFactor: 0.453, pv: 10872, cumPV: 14635 },
  { year: '10*', cf: '26,000 + TV', pvFactor: 0.414, pv: 32292, cumPV: 46927 },
]

function fmt(v: number | string): string {
  if (typeof v === 'string') return v
  const abs = Math.abs(v)
  const str = abs.toLocaleString('en-US')
  return v < 0 ? `(${str})` : str
}

function fmtPV(v: number): string {
  const abs = Math.abs(v)
  const str = abs.toLocaleString('en-US')
  return v < 0 ? `(${str})` : `+${str}`
}

export default function Analysis() {
  const { t } = useLang()
  const a = t.analysis

  const metrics = [
    {
      label: a.npvLabel,
      value: '$18,240M',
      sub: a.npvFormula,
      detail: '',
      color: '#22C55E',
      verdict: 'ACCEPT',
    },
    {
      label: a.irrLabel,
      value: '34.8%',
      sub: a.irrMethod,
      detail: a.irrInterpret,
      color: '#22C55E',
      verdict: 'ACCEPT',
    },
    {
      label: a.mirrLabel,
      value: '14.7%',
      sub: a.mirrFormula,
      detail: a.mirrDetail + ' · ' + a.mirrNote,
      color: '#22C55E',
      verdict: 'ACCEPT',
    },
    {
      label: a.pbLabel,
      value: '7.65 yrs',
      sub: a.pbFormula,
      detail: a.pbDetail,
      color: '#FF6A00',
      verdict: null,
    },
    {
      label: a.dpbLabel,
      value: '7.65 yrs',
      sub: a.dpbNote,
      detail: '',
      color: '#FF6A00',
      verdict: null,
    },
    {
      label: a.piLabel,
      value: '1.35',
      sub: a.piFormula,
      detail: a.piInterpret,
      color: '#22C55E',
      verdict: 'ACCEPT',
    },
  ]

  return (
    <section id="analysis" className="py-24 md:py-32 border-t border-[#2A2A2A]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#FF6A00] uppercase mb-3 block">
            {a.sectionTag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{a.title}</h2>
          <p className="text-[#666] text-lg max-w-2xl">{a.subtitle}</p>
        </div>

        {/* Cash Flow Table */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 mb-6">
          <h3 className="text-xl font-bold text-white mb-1">{a.cfTitle}</h3>
          <p className="text-xs text-[#555] uppercase tracking-wider mb-6">{a.cfSubtitle}</p>

          <div className="overflow-x-auto">
            <table className="data-table w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">{a.yearCol}</th>
                  <th className="text-right">{a.cfCol}</th>
                  <th className="text-right">{a.pvFactorCol}</th>
                  <th className="text-right">{a.pvCol}</th>
                  <th className="text-right">{a.cumPVCol}</th>
                </tr>
              </thead>
              <tbody>
                {CF_DATA.map((row, i) => {
                  const isNeg = typeof row.cf === 'number' ? row.cf < 0 : false
                  const isLast = i === CF_DATA.length - 1
                  const isBreakEven = row.year === 8
                  return (
                    <tr
                      key={i}
                      className={isBreakEven ? 'bg-[#FF6A00]/5' : ''}
                    >
                      <td className="font-semibold">
                        <div className="flex items-center gap-2">
                          <span className={isLast ? 'text-[#FF6A00]' : ''}>{`Yr ${row.year}`}</span>
                          {isBreakEven && (
                            <span className="text-[10px] bg-[#22C55E]/20 text-[#22C55E] px-2 py-0.5 rounded-full font-bold">
                              → Positive
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        className={`text-right font-mono ${
                          isNeg ? 'text-[#EF4444]' : 'text-[#22C55E]'
                        }`}
                      >
                        {fmt(row.cf)}
                      </td>
                      <td className="text-right font-mono text-[#888]">
                        {row.pvFactor.toFixed(3)}
                      </td>
                      <td
                        className={`text-right font-mono font-semibold ${
                          typeof row.pv === 'number' && row.pv < 0
                            ? 'text-[#EF4444]'
                            : 'text-[#22C55E]'
                        }`}
                      >
                        {fmtPV(row.pv as number)}
                      </td>
                      <td
                        className={`text-right font-mono font-bold ${
                          typeof row.cumPV === 'number' && row.cumPV < 0
                            ? 'text-[#EF4444]'
                            : 'text-[#22C55E]'
                        }`}
                      >
                        {fmtPV(row.cumPV as number)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#555] mt-3 italic">{a.tvNote}</p>

          {/* TV Formula */}
          <div className="mt-4 bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4">
            <div className="text-xs text-[#FF6A00] font-mono mb-1">Terminal Value Formula</div>
            <div className="text-xs text-[#888] font-mono">{a.tvFormula}</div>
          </div>

          {/* Summary row */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4">
              <div className="text-xs text-[#555] mb-1">{a.totalPV}</div>
              <div className="text-xl font-black text-white">$76,927M</div>
            </div>
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4">
              <div className="text-xs text-[#555] mb-1">{a.investPV}</div>
              <div className="text-xl font-black text-[#EF4444]">($52,400M)</div>
            </div>
            <div className="bg-[#FF6A00]/10 border border-[#FF6A00]/30 rounded-xl p-4">
              <div className="text-xs text-[#FF6A00] mb-1">{a.npvResult}</div>
              <div className="text-xl font-black text-[#FF6A00]">$18,240M</div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-1">{a.metricsTitle}</h3>
          <p className="text-xs text-[#555] uppercase tracking-wider mb-6">{a.metricsSubtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#FF6A00]/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-xs text-[#555] uppercase tracking-wider">{m.label}</div>
                  {m.verdict && (
                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded-full"
                      style={{ background: `${m.color}20`, color: m.color }}
                    >
                      ✓ {m.verdict}
                    </span>
                  )}
                </div>
                <div
                  className="text-3xl font-black mb-3"
                  style={{ color: m.color }}
                >
                  {m.value}
                </div>
                <div className="text-xs text-[#666] font-mono leading-relaxed break-words">
                  {m.sub}
                </div>
                {m.detail && (
                  <div className="mt-2 text-xs text-[#555] leading-relaxed">{m.detail}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Decision Banner */}
        <div className="bg-gradient-to-r from-[#FF6A00]/15 to-[#FF6A00]/5 border border-[#FF6A00]/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="text-5xl font-black text-[#FF6A00] flex-shrink-0">✓ ACCEPT</div>
          <div>
            <div className="text-lg font-bold text-white mb-1">{a.decisionTitle}</div>
            <p className="text-[#888]">{a.decisionText}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
