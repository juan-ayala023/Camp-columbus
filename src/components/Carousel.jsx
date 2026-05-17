import { useEffect, useRef, useState } from 'react'

const images = [
  'RAV01826.jpg',
  'RAV01829.jpg',
  'RAV01888.jpg',
  'RAV01904.jpg',
  'RAV01913.jpg',
  'RAV01963.jpg',
  'RAV02054.jpg',
  'RAV02114.jpg',
  'RAV02171.jpg',
  'RAV02229.jpg',
  'RAV07055.jpg',
].map((name) => `/images/carousel/${name}`)

const AUTOPLAY_MS = 4500

export default function Carousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)
  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)

  function go(next) {
    setIndex((i) => (next + images.length) % images.length)
  }

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
    setPaused(true)
  }
  function onTouchMove(e) {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
  }
  function onTouchEnd() {
    const threshold = 40
    if (touchDeltaX.current > threshold) go(index - 1)
    else if (touchDeltaX.current < -threshold) go(index + 1)
    touchDeltaX.current = 0
    setPaused(false)
  }

  useEffect(() => {
    if (paused) return
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, AUTOPLAY_MS)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [paused])

  return (
    <section id="galeria" className="relative py-16 md:py-28 bg-slate-50 overflow-hidden">
      <div className="container-tcs">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="eyebrow">Galería</span>
          <h2 className="section-title">
            Así se vive el <span className="text-brand-pink">TCS Camp</span>
          </h2>
          <p className="mt-4 text-slate-600 md:text-lg">
            Risas, aventura y nuevos amigos. Estos son los momentos que se quedan.
          </p>
        </div>

        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-tr from-brand-yellow via-brand-pink to-brand-sky rounded-[2rem] blur-2xl opacity-25" />

          <div className="relative rounded-2xl md:rounded-[1.5rem] overflow-hidden shadow-2xl ring-1 ring-slate-200 bg-slate-900 aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/9]">
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`TCS Camp momento ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-out ${
                  i === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}

            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Anterior"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white/85 hover:bg-white text-brand-blue flex items-center justify-center shadow-lg backdrop-blur transition hover:scale-110"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Siguiente"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white/85 hover:bg-white text-brand-blue flex items-center justify-center shadow-lg backdrop-blur transition hover:scale-110"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="absolute bottom-3 md:bottom-5 inset-x-0 flex items-center justify-center gap-1.5 md:gap-2 px-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ir a la imagen ${i + 1}`}
                  className={`h-1.5 md:h-2 rounded-full transition-all ${
                    i === index ? 'w-6 md:w-8 bg-brand-yellow' : 'w-1.5 md:w-2 bg-white/60 hover:bg-white/90'
                  }`}
                />
              ))}
            </div>

            <div className="absolute top-3 right-3 md:top-4 md:right-4 px-2.5 py-1 rounded-full bg-black/40 text-white text-[11px] md:text-xs font-medium backdrop-blur">
              {index + 1} / {images.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
