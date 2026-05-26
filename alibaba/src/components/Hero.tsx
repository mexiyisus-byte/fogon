'use client'
import { useLang } from '@/contexts/LanguageContext'

const stats = [
  { value: '$52.4B', keyLabel: 'stat1Label', keyExtra: '' },
  { value: '+34%', keyLabel: 'stat2Label', keyExtra: '' },
  { value: 'Triple-digit', keyLabel: 'stat3Label', keyExtra: 'stat3Sub' },
  { value: '~4%', keyLabel: 'stat4Label', keyExtra: 'stat4Sub' },
]

export default function Hero() {
  const { t } = useLang()
  const h = t.hero

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[72px]"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#FF6A00 1px, transparent 1px), linear-gradient(90deg, #FF6A00 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Orange radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-[0.07] bg-[#FF6A00] blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 py-20 md:py-32">
        {/* Tag */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-[#FF6A00] animate-pulse" />
          <span className="text-xs font-semibold tracking-[0.2em] text-[#FF6A00] uppercase">
            {h.tag}
          </span>
        </div>

        {/* Main title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight mb-6 max-w-5xl">
          <span className="text-white">ALIBABA CLOUD</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #FF6A00, #FF9A4D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            GLOBAL AI EXPANSION
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#888] text-lg md:text-xl max-w-2xl mb-16 leading-relaxed">
          {h.subtitle}
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => {
            const label = h[s.keyLabel as keyof typeof h] as string
            const extra = s.keyExtra ? (h[s.keyExtra as keyof typeof h] as string) : ''
            return (
              <div
                key={i}
                className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-5 md:p-7 hover:border-[#FF6A00]/40 transition-all duration-300 group"
              >
                <div
                  className="text-3xl md:text-4xl font-black mb-2 group-hover:text-[#FF6A00] transition-colors duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF, #CCCCCC)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.value}
                </div>
                <div className="text-xs font-semibold text-[#FF6A00] uppercase tracking-wider mb-1">
                  {label}
                </div>
                {extra && (
                  <div className="text-xs text-[#555]">{extra}</div>
                )}
              </div>
            )
          })}
        </div>

        {/* Scroll CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('financial')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex items-center gap-3 px-6 py-3 bg-[#FF6A00] text-white font-semibold text-sm rounded-lg hover:bg-[#FF8533] transition-all duration-200 hover:shadow-[0_0_30px_rgba(255,106,0,0.4)]"
          >
            {h.scrollCta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 1a.5.5 0 01.5.5v11.793l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L7.5 13.293V1.5A.5.5 0 018 1z" />
            </svg>
          </button>

          {/* Horizontal divider line */}
          <div className="flex-1 h-px bg-gradient-to-r from-[#2A2A2A] to-transparent hidden md:block" />
          <div className="hidden md:flex items-center gap-2 text-xs text-[#444] font-mono">
            <span>WACC 9.2%</span>
            <span>·</span>
            <span>NPV $18,240M</span>
            <span>·</span>
            <span>IRR 34.8%</span>
          </div>
        </div>
      </div>
    </section>
  )
}
