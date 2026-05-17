import { useState } from 'react'
import { useInscription } from '../context/InscriptionContext'

const links = [
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#para-quien', label: 'Para quién' },
  { href: '#actividades', label: 'Actividades' },
  { href: '#valores', label: 'Valores' },
  { href: '#faq', label: 'Preguntas' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { open: openInscription } = useInscription()

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur shadow-md">
      <div className="container-tcs flex items-center justify-between h-16 md:h-20 gap-3">
        <a href="#top" className="flex items-center gap-2 md:gap-3 min-w-0">
          <div className="h-11 md:h-14 px-2 md:px-3 rounded-xl flex items-center justify-center shadow-md bg-white ring-1 ring-slate-200 shrink-0">
            <img
              src="/images/gallery/columbus.png"
              alt="Columbus School"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </div>
          <div className="leading-tight min-w-0">
            <p className="font-extrabold text-sm md:text-lg truncate text-brand-blue">
              TCS Camp
            </p>
            <p className="hidden sm:block text-[10px] md:text-[11px] uppercase tracking-wider md:tracking-widest font-extrabold whitespace-nowrap">
              <span className="text-brand-pink">S</span>
              <span className="text-brand-pink">U</span>
              <span className="text-brand-sky">M</span>
              <span className="text-brand-pink">M</span>
              <span className="text-brand-yellow">E</span>
              <span className="text-brand-blue">R</span>
              <span> </span>
              <span className="text-brand-green">F</span>
              <span className="text-brand-yellow">U</span>
              <span className="text-brand-green">N</span>
              <span className="text-slate-500"> 2026</span>
            </p>
            <p className="sm:hidden text-[10px] uppercase tracking-wider font-extrabold text-brand-yellow">
              Summer fun 2026
            </p>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-bold transition text-slate-800 hover:text-brand-blue"
            >
              {l.label}
            </a>
          ))}
          <button onClick={() => openInscription()} className="btn-primary !py-2.5 !px-5 text-sm">
            Inscríbete
          </button>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-md text-brand-blue"
          aria-label="Menú"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white shadow-lg border-t border-slate-100">
          <div className="container-tcs py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg text-slate-700 hover:bg-brand-blue/5 hover:text-brand-blue font-medium"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => { setOpen(false); openInscription() }}
              className="btn-primary mt-2 justify-center"
            >
              Inscríbete
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
