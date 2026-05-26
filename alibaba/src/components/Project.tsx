'use client'
import { useLang } from '@/contexts/LanguageContext'

export default function Project() {
  const { t } = useLang()
  const p = t.project

  const techItems = [
    { label: p.techNewDC, detail: p.techNewDCDetail, icon: '🌐' },
    { label: p.techChinaExp, detail: p.techChinaDetail, icon: '🇨🇳' },
    { label: p.techHardware, detail: p.techHardwareDetail, icon: '🖥️' },
    { label: p.techAIChips, detail: p.techAIChipsDetail, icon: '🔷' },
    { label: p.techModel, detail: p.techModelDetail, icon: '🧠' },
    { label: p.techHires, detail: p.techHiresDetail, icon: '👥' },
  ]

  const stressRows = [
    {
      scenario: p.stressBear,
      driver: p.stressBearDriver,
      impact: p.stressBearImpact,
      npv: '$4,120M',
      color: '#EF4444',
    },
    {
      scenario: p.stressBase,
      driver: p.stressBaseDriver,
      impact: p.stressBaseImpact,
      npv: '$18,240M',
      color: '#FF6A00',
    },
    {
      scenario: p.stressBull,
      driver: p.stressBullDriver,
      impact: p.stressBullImpact,
      npv: '$31,800M',
      color: '#22C55E',
    },
  ]

  return (
    <section id="project" className="py-24 md:py-32 border-t border-[#2A2A2A]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#FF6A00] uppercase mb-3 block">
            {p.sectionTag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{p.title}</h2>
          <p className="text-[#666] text-lg max-w-2xl">{p.subtitle}</p>
        </div>

        {/* Classification + Market */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Classification */}
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-white mb-4">{p.classifTitle}</h3>
            <div className="inline-block px-4 py-2 bg-[#FF6A00]/15 border border-[#FF6A00]/30 rounded-lg mb-4">
              <span className="text-[#FF6A00] font-black text-lg tracking-widest">{p.classifType}</span>
            </div>
            <p className="text-[#888] text-sm mb-4">{p.classifDetail}</p>
            <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#2A2A2A]">
              <div className="text-xs text-[#555] uppercase tracking-wider mb-1">CAPEX Budget</div>
              <div className="text-xl font-black text-white">{p.classifBudget}</div>
            </div>
          </div>

          {/* Market Study */}
          <div className="lg:col-span-2 bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-white mb-1">{p.marketTitle}</h3>
            <p className="text-xs text-[#555] uppercase tracking-wider mb-5">{p.marketSubtitle}</p>
            <div className="grid grid-cols-2 gap-3">
              {p.marketItems.map((item, i) => (
                <div key={i} className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-3 hover:border-[#FF6A00]/30 transition-colors">
                  <div className="text-xs text-[#555] mb-1">{item.label}</div>
                  <div className="text-sm font-bold text-white leading-tight">{item.value}</div>
                  {item.detail && <div className="text-xs text-[#FF6A00] mt-0.5">{item.detail}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price Stress Test */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 mb-6">
          <h3 className="text-lg font-bold text-white mb-1">{p.stressTitle}</h3>
          <div className="overflow-x-auto mt-4">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th className="text-left">Scenario</th>
                  <th className="text-left">{p.stressDriverCol}</th>
                  <th className="text-left">{p.stressImpactCol}</th>
                  <th className="text-right">{p.stressNPVCol}</th>
                </tr>
              </thead>
              <tbody>
                {stressRows.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <span
                        className="px-2 py-1 rounded text-xs font-bold"
                        style={{ background: `${row.color}20`, color: row.color }}
                      >
                        {row.scenario}
                      </span>
                    </td>
                    <td className="text-[#CCC]">{row.driver}</td>
                    <td className="text-[#888] text-sm">{row.impact}</td>
                    <td className="text-right font-mono font-bold" style={{ color: row.color }}>
                      {row.npv}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Study */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-white mb-1">{p.techTitle}</h3>
            <p className="text-xs text-[#555] uppercase tracking-wider mb-5">{p.techSubtitle}</p>
            <div className="space-y-4">
              {techItems.map((item, i) => (
                <div key={i} className="flex gap-4 py-3 border-b border-[#1E1E1E] last:border-0">
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-[#FF6A00] mb-0.5">{item.label}</div>
                    <div className="text-sm text-[#888]">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organizational Structure */}
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-white mb-1">{p.orgTitle}</h3>
            <p className="text-xs text-[#555] uppercase tracking-wider mb-5">{p.orgSubtitle}</p>
            <div className="overflow-x-auto">
              <table className="data-table w-full">
                <thead>
                  <tr>
                    <th className="text-left">{p.orgCol1}</th>
                    <th className="text-left">{p.orgCol2}</th>
                  </tr>
                </thead>
                <tbody>
                  {p.orgUnits.map((row, i) => (
                    <tr key={i}>
                      <td className="font-semibold text-[#FF6A00] whitespace-nowrap pr-4">{row.unit}</td>
                      <td className="text-[#888] text-sm">{row.resp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
