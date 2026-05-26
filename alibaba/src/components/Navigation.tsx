'use client'
import { useState, useEffect } from 'react'
import { useLang } from '@/contexts/LanguageContext'

const sections = [
  { id: 'financial', key: 'financial' as const },
  { id: 'project', key: 'project' as const },
  { id: 'analysis', key: 'analysis' as const },
  { id: 'simulator', key: 'simulator' as const },
  { id: 'risks', key: 'risks' as const },
  { id: 'realOptions', key: 'realOptions' as const },
  { id: 'conclusion', key: 'conclusion' as const },
]

export default function Navigation() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      // determine active section
      const ids = sections.map(s => s.id)
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100) current = id
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileOpen(false)
    }
  }

  const navLabels: Record<string, string> = {
    financial: t.nav.financial,
    project: t.nav.project,
    analysis: t.nav.analysis,
    simulator: t.nav.simulator,
    risks: t.nav.risks,
    realOptions: t.nav.realOptions,
    conclusion: t.nav.conclusion,
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#2A2A2A]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded bg-[#FF6A00] flex items-center justify-center">
              <span className="text-white font-black text-sm">A</span>
            </div>
            <span className="font-semibold text-white text-sm tracking-wide hidden sm:block">
              ALIBABA CLOUD
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-3 py-2 text-xs font-semibold tracking-widest rounded transition-all duration-200 ${
                  active === s.id
                    ? 'text-[#FF6A00] bg-[#FF6A00]/10'
                    : 'text-[#888] hover:text-white hover:bg-white/5'
                }`}
              >
                {navLabels[s.key]}
              </button>
            ))}
          </div>

          {/* Right side: Lang toggle + Mobile menu */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-1">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${
                  lang === 'en'
                    ? 'bg-[#FF6A00] text-white'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                ENG
              </button>
              <button
                onClick={() => setLang('es')}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${
                  lang === 'es'
                    ? 'bg-[#FF6A00] text-white'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                ESP
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-[#888] hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                {mobileOpen ? (
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                ) : (
                  <>
                    <rect y="3" width="20" height="2" rx="1" />
                    <rect y="9" width="20" height="2" rx="1" />
                    <rect y="15" width="20" height="2" rx="1" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-[#2A2A2A] pt-4">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`block w-full text-left px-4 py-3 text-sm font-semibold tracking-widest transition-colors ${
                  active === s.id ? 'text-[#FF6A00]' : 'text-[#888] hover:text-white'
                }`}
              >
                {navLabels[s.key]}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
