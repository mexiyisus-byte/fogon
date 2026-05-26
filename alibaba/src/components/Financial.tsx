'use client'
import { useLang } from '@/contexts/LanguageContext'

const waccItems = (t: ReturnType<typeof useLang>['t']) => [
  { label: t.financial.keLabel, value: '12.5%', detail: t.financial.keDetail },
  { label: t.financial.kdLabel, value: '4.1%', detail: '' },
  { label: t.financial.kdAfterLabel, value: '3.075%', detail: t.financial.kdAfterDetail },
  { label: t.financial.taxLabel, value: '25%', detail: '' },
  { label: t.financial.capLabel, value: '', detail: t.financial.capDetail },
]

const costItems = (t: ReturnType<typeof useLang>['t']) => [
  { cat: t.financial.cost1, amount: '$28,000M', pct: '53%' },
  { cat: t.financial.cost2, amount: '$12,000M', pct: '23%' },
  { cat: t.financial.cost3, amount: '$8,000M', pct: '15%' },
  { cat: t.financial.cost4, amount: '$3,000M', pct: '6%' },
  { cat: t.financial.cost5, amount: '$1,400M', pct: '3%' },
]

const opexItems = (t: ReturnType<typeof useLang>['t']) => [
  { label: t.financial.opex1, value: '$4,200M' },
  { label: t.financial.opex2, value: '$2,000M' },
  { label: t.financial.opex3, value: '$1,800M' },
  { label: t.financial.opex4, value: '$1,200M' },
]

export default function Financial() {
  const { t } = useLang()
  const f = t.financial

  return (
    <section id="financial" className="py-24 md:py-32 border-t border-[#2A2A2A]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#FF6A00] uppercase mb-3 block">
            {f.sectionTag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{f.title}</h2>
          <p className="text-[#666] text-lg max-w-2xl">{f.subtitle}</p>
        </div>

        {/* Top info cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
          {[
            { label: f.companyLabel, value: 'Alibaba Group Holding' },
            { label: f.projectLabel, value: 'Cloud Global AI Expansion' },
            { label: f.periodLabel, value: '2025–2028' },
            { label: f.currencyLabel, value: 'USD ($)' },
            { label: f.totalInvLabel, value: '$52,400M', highlight: true },
          ].map((item, i) => (
            <div
              key={i}
              className={`rounded-xl p-4 border ${
                item.highlight
                  ? 'bg-[#FF6A00]/10 border-[#FF6A00]/30'
                  : 'bg-[#161616] border-[#2A2A2A]'
              }`}
            >
              <div className="text-xs text-[#555] uppercase tracking-wider mb-1">{item.label}</div>
              <div
                className={`text-sm font-bold ${
                  item.highlight ? 'text-[#FF6A00]' : 'text-white'
                }`}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* WACC Card */}
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{f.waccTitle}</h3>
                <p className="text-xs text-[#555] uppercase tracking-wider">{f.waccSubtitle}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-[#FF6A00]">9.2%</div>
                <div className="text-xs text-[#555]">{f.waccResult}</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {waccItems(t).map((item, i) => (
                <div key={i} className="flex items-start justify-between py-3 border-b border-[#2A2A2A] last:border-0">
                  <div>
                    <div className="text-sm text-[#CCC] font-medium">{item.label}</div>
                    {item.detail && <div className="text-xs text-[#555] mt-0.5">{item.detail}</div>}
                  </div>
                  {item.value && (
                    <div className="text-sm font-bold text-[#FF6A00] ml-4 flex-shrink-0">{item.value}</div>
                  )}
                </div>
              ))}
            </div>

            {/* WACC formula box */}
            <div className="bg-[#0D0D0D] border border-[#FF6A00]/20 rounded-xl p-4">
              <div className="text-xs text-[#FF6A00] font-mono mb-1">WACC =</div>
              <div className="text-xs text-[#888] font-mono leading-relaxed">{f.waccFormula}</div>
              <div className="text-2xl font-black text-[#FF6A00] mt-2">= 9.2%</div>
            </div>
          </div>

          {/* OPEX Card */}
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-1">{f.opexTitle}</h3>
            <p className="text-xs text-[#555] uppercase tracking-wider mb-6">{f.opexSubtitle}</p>

            <div className="space-y-3 flex-1">
              {opexItems(t).map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[#1E1E1E] last:border-0">
                  <span className="text-sm text-[#CCC]">{item.label}</span>
                  <span className="text-sm font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#FF6A00]/30 flex items-center justify-between">
              <span className="text-sm font-bold text-[#FF6A00] uppercase tracking-wider">TOTAL OPEX</span>
              <span className="text-2xl font-black text-[#FF6A00]">$9,200M/yr</span>
            </div>
          </div>
        </div>

        {/* Cost Structure Table */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-1">{f.costTitle}</h3>
          <p className="text-xs text-[#555] uppercase tracking-wider mb-6">{f.costSubtitle}</p>

          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th className="text-left">{f.costCol1}</th>
                  <th className="text-right">{f.costCol2}</th>
                  <th className="text-right">{f.costCol3}</th>
                  <th className="text-left w-[200px] hidden md:table-cell">Share</th>
                </tr>
              </thead>
              <tbody>
                {costItems(t).map((row, i) => (
                  <tr key={i}>
                    <td className="text-[#CCC]">{row.cat}</td>
                    <td className="text-right font-mono font-semibold text-white">{row.amount}</td>
                    <td className="text-right font-bold text-[#FF6A00]">{row.pct}</td>
                    <td className="hidden md:table-cell pl-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#2A2A2A] rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-[#FF6A00]"
                            style={{ width: row.pct }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td className="font-bold text-[#FF6A00]">TOTAL</td>
                  <td className="text-right font-mono font-black text-[#FF6A00]">$52,400M</td>
                  <td className="text-right font-black text-[#FF6A00]">100%</td>
                  <td className="hidden md:table-cell" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
