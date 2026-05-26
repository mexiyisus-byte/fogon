'use client'
import { useLang } from '@/contexts/LanguageContext'

// Binomial Tree SVG component
function BinomialTree() {
  // Node positions
  const nodes = {
    t0: { x: 60, y: 160, label: '$18,240M', sub: 'S (now)' },
    t1u: { x: 240, y: 60, label: '$24,624M', sub: 'S×u' },
    t1d: { x: 240, y: 260, label: '$13,514M', sub: 'S×d' },
    t2uu: { x: 420, y: 20, label: '$33,222M', sub: 'S×u²' },
    t2ud: { x: 420, y: 160, label: '$18,240M', sub: 'S×ud' },
    t2dd: { x: 420, y: 300, label: '$10,018M', sub: 'S×d²' },
  }

  const edges = [
    { from: nodes.t0, to: nodes.t1u, label: 'u=1.350' },
    { from: nodes.t0, to: nodes.t1d, label: 'd=0.741' },
    { from: nodes.t1u, to: nodes.t2uu, label: 'u' },
    { from: nodes.t1u, to: nodes.t2ud, label: 'd' },
    { from: nodes.t1d, to: nodes.t2ud, label: 'u' },
    { from: nodes.t1d, to: nodes.t2dd, label: 'd' },
  ]

  return (
    <svg viewBox="0 0 500 340" className="w-full max-w-lg mx-auto">
      {/* Edges */}
      {edges.map((e, i) => (
        <line
          key={i}
          x1={e.from.x + 35}
          y1={e.from.y}
          x2={e.to.x - 35}
          y2={e.to.y}
          stroke="#2A2A2A"
          strokeWidth={1.5}
        />
      ))}

      {/* Probability labels on edges */}
      <text x={145} y={90} fill="#888" fontSize={9} textAnchor="middle">p=0.499</text>
      <text x={145} y={230} fill="#888" fontSize={9} textAnchor="middle">1-p=0.501</text>

      {/* Nodes */}
      {Object.entries(nodes).map(([key, n]) => {
        const isUU = key === 't2uu'
        const isDD = key === 't2dd'
        const color = isUU ? '#22C55E' : isDD ? '#EF4444' : '#FF6A00'
        return (
          <g key={key}>
            <rect
              x={n.x - 35}
              y={n.y - 22}
              width={70}
              height={44}
              rx={6}
              fill="#1E1E1E"
              stroke={color}
              strokeWidth={1.5}
            />
            <text x={n.x} y={n.y - 6} fill={color} fontSize={9} textAnchor="middle" fontWeight="bold">
              {n.label}
            </text>
            <text x={n.x} y={n.y + 8} fill="#555" fontSize={8} textAnchor="middle">
              {n.sub}
            </text>
          </g>
        )
      })}

      {/* Year labels */}
      <text x={60} y={330} fill="#555" fontSize={9} textAnchor="middle">Year 0</text>
      <text x={240} y={330} fill="#555" fontSize={9} textAnchor="middle">Year 1</text>
      <text x={420} y={330} fill="#555" fontSize={9} textAnchor="middle">Year 2</text>
    </svg>
  )
}

// Event Tree SVG
function EventTree() {
  const w = 560
  const h = 300

  // Nodes
  const root = { x: 60, y: 150 }
  const bear = { x: 300, y: 60, label: 'Bear (p=25%)', npv: '$4,120M', color: '#EF4444' }
  const base = { x: 300, y: 150, label: 'Base (p=55%)', npv: '$18,240M', color: '#FF6A00' }
  const bull = { x: 300, y: 240, label: 'Bull (p=20%)', npv: '$31,800M', color: '#22C55E' }

  const delay = { x: 190, y: 270, label: 'Delay 1 yr', ev: 'EV=$18,840M', color: '#888' }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      {/* Root node */}
      <rect x={root.x - 50} y={root.y - 28} width={100} height={56} rx={8}
        fill="#1E1E1E" stroke="#FF6A00" strokeWidth={2} />
      <text x={root.x} y={root.y - 10} fill="#FF6A00" fontSize={8} textAnchor="middle" fontWeight="bold">
        Invest Now
      </text>
      <text x={root.x} y={root.y + 4} fill="#888" fontSize={7} textAnchor="middle">
        Phased Yr 0–3
      </text>
      <text x={root.x} y={root.y + 18} fill="#FF6A00" fontSize={8} textAnchor="middle" fontWeight="bold">
        $18,240M
      </text>

      {/* Branches to outcomes */}
      {[bear, base, bull].map((outcome, i) => (
        <g key={i}>
          <line
            x1={root.x + 50}
            y1={root.y}
            x2={outcome.x - 50}
            y2={outcome.y}
            stroke="#2A2A2A"
            strokeWidth={1.5}
          />
          <rect
            x={outcome.x - 50}
            y={outcome.y - 28}
            width={100}
            height={56}
            rx={6}
            fill="#1E1E1E"
            stroke={outcome.color}
            strokeWidth={1.5}
          />
          <text x={outcome.x} y={outcome.y - 13} fill={outcome.color} fontSize={7} textAnchor="middle" fontWeight="bold">
            {outcome.label}
          </text>
          <text x={outcome.x} y={outcome.y + 1} fill="#EEE" fontSize={8} textAnchor="middle" fontWeight="bold">
            {outcome.npv}
          </text>
        </g>
      ))}

      {/* Action boxes */}
      <line x1={350} y1={bear.y} x2={400} y2={bear.y} stroke="#2A2A2A" strokeWidth={1} />
      <rect x={400} y={bear.y - 16} width={140} height={32} rx={4} fill="#EF444420" stroke="#EF444440" />
      <text x={470} y={bear.y - 4} fill="#EF4444" fontSize={7} textAnchor="middle">→ Contract Option</text>
      <text x={470} y={bear.y + 9} fill="#888" fontSize={7} textAnchor="middle">Reduce to 4 DCs</text>

      <line x1={350} y1={base.y} x2={400} y2={base.y} stroke="#2A2A2A" strokeWidth={1} />
      <rect x={400} y={base.y - 16} width={140} height={32} rx={4} fill="#FF6A0020" stroke="#FF6A0040" />
      <text x={470} y={base.y - 4} fill="#FF6A00" fontSize={7} textAnchor="middle">→ Full Rollout</text>
      <text x={470} y={base.y + 9} fill="#888" fontSize={7} textAnchor="middle">As planned</text>

      <line x1={350} y1={bull.y} x2={400} y2={bull.y} stroke="#2A2A2A" strokeWidth={1} />
      <rect x={400} y={bull.y - 16} width={140} height={32} rx={4} fill="#22C55E20" stroke="#22C55E40" />
      <text x={470} y={bull.y - 4} fill="#22C55E" fontSize={7} textAnchor="middle">→ Accelerate</text>
      <text x={470} y={bull.y + 9} fill="#888" fontSize={7} textAnchor="middle">AI integration</text>

      {/* Delay node */}
      <line x1={root.x} y1={root.y + 28} x2={delay.x} y2={delay.y - 18} stroke="#2A2A2A" strokeWidth={1} strokeDasharray="4 2" />
      <rect x={delay.x - 55} y={delay.y - 18} width={110} height={36} rx={5}
        fill="#1E1E1E" stroke="#888" strokeWidth={1} strokeDasharray="3 2" />
      <text x={delay.x} y={delay.y - 4} fill="#888" fontSize={7} textAnchor="middle">{delay.label}</text>
      <text x={delay.x} y={delay.y + 9} fill="#888" fontSize={7} textAnchor="middle">{delay.ev}</text>
    </svg>
  )
}

export default function RealOptions() {
  const { t } = useLang()
  const ro = t.realOptions

  const optionCards = [
    {
      title: ro.contractTitle,
      subtitle: ro.contractSubtitle,
      badge: '$2,680M',
      badgeLabel: 'Option Value',
      badgeColor: '#22C55E',
      items: [
        { label: ro.contractTrigger, value: ro.contractTriggerText },
        { label: ro.contractAction, value: ro.contractActionText },
        { label: ro.contractSavings, value: ro.contractSavingsText },
        { label: ro.contractNewNPV, value: ro.contractNewNPVText },
        { label: ro.contractOptionVal, value: ro.contractOptionValText },
      ],
      note: '',
    },
    {
      title: ro.abandonTitle,
      subtitle: ro.abandonSubtitle,
      badge: '$380M',
      badgeLabel: 'Option Value',
      badgeColor: '#FF6A00',
      items: [
        { label: ro.abandonTrigger, value: ro.abandonTriggerText },
        { label: ro.abandonAction, value: ro.abandonActionText },
        { label: ro.abandonSalvage, value: ro.abandonSalvageText },
        { label: ro.abandonOptionVal, value: ro.abandonOptionValText },
      ],
      note: ro.abandonGeoNote,
    },
  ]

  return (
    <section id="realOptions" className="py-24 md:py-32 border-t border-[#2A2A2A]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#FF6A00] uppercase mb-3 block">
            {ro.sectionTag}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{ro.title}</h2>
          <p className="text-[#666] text-lg max-w-2xl">{ro.subtitle}</p>
        </div>

        {/* Delay Option — Binomial Tree */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 mb-6">
          <h3 className="text-xl font-bold text-white mb-1">{ro.delayTitle}</h3>
          <p className="text-xs text-[#555] uppercase tracking-wider mb-6">{ro.delaySubtitle}</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Parameters */}
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-5">
              <div className="text-xs text-[#FF6A00] font-semibold uppercase tracking-wider mb-3">
                {ro.delayParams}
              </div>
              <ul className="space-y-2">
                {ro.delayP.map((p, i) => (
                  <li key={i} className="text-sm font-mono text-[#888] flex items-start gap-2">
                    <span className="text-[#FF6A00] flex-shrink-0">›</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Calculation steps */}
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-5">
              <div className="text-xs text-[#FF6A00] font-semibold uppercase tracking-wider mb-3">
                {ro.delayCalc}
              </div>
              <ul className="space-y-2">
                {ro.delayCalcSteps.map((step, i) => (
                  <li key={i} className="text-xs font-mono text-[#888] flex items-start gap-2 leading-relaxed">
                    <span className="text-[#FF6A00] flex-shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Decision */}
            <div className="bg-[#FF6A00]/10 border border-[#FF6A00]/30 rounded-xl p-5">
              <div className="text-xs text-[#FF6A00] font-semibold uppercase tracking-wider mb-3">
                {ro.delayDecision}
              </div>
              <div className="text-2xl font-black text-white mb-3">Invest Now</div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#0D0D0D] rounded-lg p-2 text-center flex-1">
                  <div className="text-xs text-[#555]">Invest Now</div>
                  <div className="text-lg font-black text-[#FF6A00]">$18,240M</div>
                </div>
                <div className="text-[#555]">vs</div>
                <div className="bg-[#0D0D0D] rounded-lg p-2 text-center flex-1">
                  <div className="text-xs text-[#555]">EV Waiting</div>
                  <div className="text-lg font-black text-white">$18,840M</div>
                </div>
              </div>
              <div className="text-xs text-[#888] leading-relaxed">
                Gap of $600M — but competitive risk (AWS/Azure) exceeds waiting premium.
              </div>
              <p className="text-xs text-[#666] mt-3 leading-relaxed">{ro.delayDecisionText}</p>
            </div>
          </div>

          {/* Binomial Tree Diagram */}
          <div className="mt-6 bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4">
            <div className="text-xs text-[#555] uppercase tracking-wider mb-3 text-center">
              Binomial Tree — NPV Paths
            </div>
            <BinomialTree />
          </div>
        </div>

        {/* Contract + Abandon Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {optionCards.map((card, i) => (
            <div key={i} className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{card.title}</h3>
                  <p className="text-xs text-[#555]">{card.subtitle}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-2xl font-black" style={{ color: card.badgeColor }}>
                    {card.badge}
                  </div>
                  <div className="text-xs text-[#555]">{card.badgeLabel}</div>
                </div>
              </div>

              <div className="space-y-3">
                {card.items.map((item, j) => (
                  <div key={j} className="py-2 border-b border-[#1E1E1E] last:border-0">
                    <div className="text-xs text-[#555] uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-sm text-[#CCC]">{item.value}</div>
                  </div>
                ))}
              </div>

              {card.note && (
                <div className="mt-4 bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg p-3">
                  <p className="text-xs text-[#666] italic leading-relaxed">{card.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Event Tree */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-bold text-white mb-1">{ro.eventTitle}</h3>
          <p className="text-xs text-[#555] uppercase tracking-wider mb-6">{ro.eventSubtitle}</p>

          <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4 overflow-x-auto">
            <EventTree />
          </div>

          {/* Event tree text summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: ro.eventBear, value: ro.eventBearNPV, color: '#EF4444' },
              { label: ro.eventBase, value: ro.eventBaseNPV, color: '#FF6A00' },
              { label: ro.eventBull, value: ro.eventBullNPV, color: '#22C55E' },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-4 border"
                style={{ background: `${item.color}08`, borderColor: `${item.color}25` }}
              >
                <div className="text-xs font-bold mb-2" style={{ color: item.color }}>{item.label}</div>
                <div className="text-xs text-[#888]">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4">
              <div className="text-xs text-[#555] mb-1">{ro.eventNode2}</div>
              <div className="text-sm text-[#888]">{ro.eventNode2EV}</div>
            </div>
            <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4">
              <div className="text-xs text-[#555] mb-1">{ro.eventNode3}</div>
              <div className="text-sm text-[#888]">{ro.eventNode3SV}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
