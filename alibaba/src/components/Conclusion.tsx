'use client'
import { useLang } from '@/contexts/LanguageContext'

export default function Conclusion() {
  const { t } = useLang()
  const c = t.conclusion

  return (
    <section id="conclusion" className="py-24 md:py-32 border-t border-[#2A2A2A]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#FF6A00] uppercase mb-3 block">
            {c.sectionTag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{c.title}</h2>
          <p className="text-[#666] text-lg max-w-2xl">{c.subtitle}</p>
        </div>

        {/* KPI Grid */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 mb-6">
          <h3 className="text-xl font-bold text-white mb-1">{c.summaryTitle}</h3>
          <p className="text-xs text-[#555] uppercase tracking-wider mb-6">{c.summarySubtitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {c.kpis.map((kpi, i) => (
              <div
                key={i}
                className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#FF6A00]/30 transition-colors"
              >
                <div className="text-xs text-[#555] uppercase tracking-wider mb-1">{kpi.label}</div>
                <div className="text-xl md:text-2xl font-black text-[#FF6A00] mb-1 leading-tight">{kpi.value}</div>
                <div className="text-xs text-[#555]">{kpi.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Capital Rationing */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 mb-6">
          <h3 className="text-xl font-bold text-white mb-1">{c.rankingTitle}</h3>
          <p className="text-xs text-[#555] uppercase tracking-wider mb-6">{c.rankingSubtitle}</p>

          <div className="overflow-x-auto mb-6">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th className="text-left">Project</th>
                  <th className="text-right">PI (Profitability Index)</th>
                  <th className="text-right">NPV</th>
                  <th className="text-left">PI Rank</th>
                </tr>
              </thead>
              <tbody>
                {c.rankingRows.map((row, i) => (
                  <tr key={i} className={i === 0 ? '' : ''}>
                    <td className="font-semibold text-white">{row.project}</td>
                    <td className="text-right font-mono font-bold text-[#FF6A00]">{row.pi}</td>
                    <td className="text-right font-mono text-[#CCC]">{row.npv}</td>
                    <td>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        i === 0
                          ? 'bg-[#FF6A00]/20 text-[#FF6A00]'
                          : 'bg-[#2A2A2A] text-[#888]'
                      }`}>
                        {row.rank}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[c.rankingNote1, c.rankingNote2, c.rankingNote3].map((note, i) => (
              <div key={i} className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4">
                <p className="text-xs text-[#777] leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Recommendation */}
        <div className="bg-gradient-to-br from-[#FF6A00]/15 via-[#FF6A00]/8 to-[#0D0D0D] border border-[#FF6A00]/30 rounded-2xl p-6 md:p-10 mb-6">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="flex-shrink-0">
              <div className="text-xs text-[#FF6A00] uppercase tracking-widest mb-2">
                {c.recommendTitle}
              </div>
              <div className="text-6xl md:text-7xl font-black text-[#FF6A00]">
                {c.recommendVerdict}
              </div>
              <div className="text-lg font-semibold text-white mt-2">{c.recommendText}</div>
            </div>

            <div className="flex-1">
              {/* Phase rollout */}
              <div className="space-y-3 mb-6">
                {c.phases.map((phase, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-[#0D0D0D]/60 border border-[#2A2A2A] rounded-xl p-4"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                      style={{ background: '#FF6A00', color: '#0D0D0D' }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#FF6A00]">{phase.phase}</div>
                      <div className="text-sm text-[#888]">{phase.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Monitor + Robust */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#0D0D0D]/60 border border-[#FF6A00]/20 rounded-xl p-4">
                  <div className="text-xs text-[#FF6A00] uppercase tracking-wider mb-1">Monitor</div>
                  <p className="text-xs text-[#777] leading-relaxed">{c.monitorText}</p>
                </div>
                <div className="bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-xl p-4">
                  <div className="text-xs text-[#22C55E] uppercase tracking-wider mb-1">Robustness</div>
                  <p className="text-xs text-[#777] leading-relaxed">{c.robustText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-[#1E1E1E]">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-6 h-6 rounded bg-[#FF6A00] flex items-center justify-center">
              <span className="text-white font-black text-xs">A</span>
            </div>
            <span className="text-xs font-semibold tracking-widest text-[#444] uppercase">
              Alibaba Group
            </span>
          </div>
          <p className="text-xs text-[#333]">{c.footerText}</p>
          <p className="text-xs text-[#222] mt-2">
            WACC 9.2% · NPV $18,240M · IRR 34.8% · PI 1.35
          </p>
        </div>
      </div>
    </section>
  )
}
