import { useInscription } from '../context/InscriptionContext'

export default function Hero() {
  const { open } = useInscription()
  return (
    <section
      id="top"
      className="relative min-h-[100vh] flex items-center overflow-hidden bg-brand-blue"
    >
      {/* Background gradient + pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-dark" />
      <div className="absolute inset-0 blob-bg opacity-90" />

      {/* Animated decorative shapes */}
      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-brand-sky/30 blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-brand-green/30 blur-3xl animate-float"
        style={{ animationDelay: '1.2s' }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-brand-pink/20 blur-3xl animate-float"
        style={{ animationDelay: '0.6s' }}
      />

      {/* Floating mini icons (Matilda-style confetti/badges) */}
      <FloatingShape className="top-24 left-[8%]" delay="0s" color="bg-brand-yellow" rounded="rounded-full" size="w-6 h-6" />
      <FloatingShape className="top-40 right-[12%]" delay="0.4s" color="bg-brand-green" rounded="rounded-md rotate-12" size="w-8 h-8" />
      <FloatingShape className="bottom-32 left-[14%]" delay="0.8s" color="bg-brand-pink" rounded="rounded-full" size="w-5 h-5" />
      <FloatingShape className="bottom-20 right-[20%]" delay="1.2s" color="bg-brand-sky" rounded="rounded-md -rotate-12" size="w-7 h-7" />
      <FloatingShape className="top-1/2 left-[5%]" delay="1.6s" color="bg-white/60" rounded="rounded-full" size="w-3 h-3" />
      <FloatingShape className="top-36 left-[40%]" delay="2s" color="bg-brand-yellow/80" rounded="rounded-full" size="w-4 h-4" />

      <div className="container-tcs relative z-10 grid lg:grid-cols-12 gap-10 pt-28 md:pt-32 pb-20 items-center">
        <div className="lg:col-span-7 text-white">
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse shrink-0" />
            <span className="sm:hidden">Junio – Julio 2026</span>
            <span className="hidden sm:inline">TCS Camp · Junio – Julio 2026</span>
          </span>

          <h1
            className="font-display font-black leading-[0.9] text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl tracking-tight animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="block">Summer</span>
            <span className="block">
              <span className="shine-text animate-shine">fun</span>
              <span className="text-brand-yellow">.</span>
            </span>
          </h1>

          <p
            className="mt-6 text-lg md:text-xl text-white/85 max-w-xl animate-fade-up"
            style={{ animationDelay: '0.25s' }}
          >
            Una experiencia llena de aprendizaje, aventura y nuevas amistades.
            Tres semanas para crear, jugar, explorar y descubrir nuevos talentos
            en el campus TCS.
          </p>

          <div
            className="mt-9 flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <button onClick={() => open()} className="btn-primary">
              Inscribirse ahora
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
            <a href="#video" className="btn-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Ver el video
            </a>
          </div>

          <div
            className="mt-10 md:mt-12 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg animate-fade-up"
            style={{ animationDelay: '0.55s' }}
          >
            <Stat number="3" label="Semanas" />
            <Stat number="13" label="Días de aventura" />
            <Stat number="K4–5°" label="Estudiantes" />
          </div>
        </div>

        {/* Poster card */}
        <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="relative max-w-sm mx-auto">
            <div className="absolute -inset-3 bg-gradient-to-tr from-brand-yellow via-brand-pink to-brand-sky rounded-[2rem] blur-2xl opacity-50" />
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-gradient-to-br from-brand-yellow via-brand-pink to-brand-sky p-1 shadow-2xl">
              <div className="w-full h-full rounded-[1.85rem] overflow-hidden relative">
                <img
                  src="/images/gallery/5.%20TCS%20Camp.jpg"
                  alt="TCS Camp 2026 — Summer Fun"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-brand-blue/20 to-transparent" />
                <div className="relative h-full flex flex-col p-8 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-yellow font-semibold drop-shadow">
                    TCS Camp 2026
                  </p>
                  <h3 className="mt-3 font-black text-5xl leading-none drop-shadow-lg">
                    Summer<br />Fun
                  </h3>
                  <div className="mt-auto space-y-3">
                    <div className="h-px bg-white/30" />
                    <p className="text-sm text-white/90">
                      Junio 16 — Julio 3
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Pill>K4 a 1°</Pill>
                      <Pill>2° y 3°</Pill>
                      <Pill>4° y 5°</Pill>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* sticker */}
            <div className="absolute -top-5 -right-3 md:-top-6 md:-right-4 bg-brand-yellow text-brand-blue font-extrabold rounded-full w-20 h-20 md:w-24 md:h-24 flex flex-col items-center justify-center shadow-xl rotate-12 ring-4 ring-white">
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest">Cupos</span>
              <span className="text-xl md:text-2xl leading-none">limitados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 inset-x-0 leading-none">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="w-full h-16 md:h-20 fill-white">
          <path d="M0,40 C240,90 480,0 720,30 C960,60 1200,90 1440,40 L1440,90 L0,90 Z" />
        </svg>
      </div>
    </section>
  )
}

function FloatingShape({ className = '', delay = '0s', color = 'bg-white', rounded = 'rounded-full', size = 'w-4 h-4' }) {
  return (
    <span
      className={`absolute ${size} ${color} ${rounded} ${className} opacity-80 animate-float shadow-lg`}
      style={{ animationDelay: delay }}
    />
  )
}

function Stat({ number, label }) {
  return (
    <div>
      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">{number}</div>
      <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/70 mt-1">{label}</div>
    </div>
  )
}

function Pill({ children }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 ring-1 ring-white/25">
      {children}
    </span>
  )
}
