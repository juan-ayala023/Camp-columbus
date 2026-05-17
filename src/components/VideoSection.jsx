import { useEffect, useRef, useState } from 'react'

export default function VideoSection() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted
      videoRef.current.volume = 1
    }
  }, [muted])

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      const result = v.play()
      if (result && typeof result.then === 'function') {
        result
          .then(() => setPlaying(true))
          .catch(() => { setError(true); setPlaying(false) })
      } else {
        setPlaying(true)
      }
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  function toggleMute() {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <section id="video" className="relative py-20 md:py-28 bg-white">
      <div className="container-tcs">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow">Vive la experiencia</span>
          <h2 className="section-title">
            Un verano para <span className="text-brand-yellow">recordar</span>
          </h2>
          <p className="mt-4 text-slate-600 md:text-lg">
            Mira cómo se vive el TCS Camp y descubre por qué cada día es una nueva aventura.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-tr from-brand-yellow via-brand-pink to-brand-sky rounded-[2rem] blur-2xl opacity-30" />
          <div className="relative aspect-video rounded-[1.5rem] overflow-hidden shadow-2xl ring-1 ring-slate-200 bg-black">
            <video
              ref={videoRef}
              src="/images/carousel/tcs_summer_camp_2026_v1%20(1080p).mp4"
              muted={muted}
              playsInline
              preload="metadata"
              onClick={togglePlay}
              onEnded={() => setPlaying(false)}
              onError={() => { setError(true); setPlaying(false) }}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            />

            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-brand-blue/90 backdrop-blur text-white">
                <h3 className="font-display font-bold text-2xl mb-2">Falta el archivo del video</h3>
                <p className="text-white/80 max-w-md">
                  No se pudo cargar el archivo del video. Verifica que esté en <code className="bg-white/10 px-2 py-0.5 rounded">public/images/carousel/</code>.
                </p>
              </div>
            )}

            {!playing && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Reproducir video"
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/20 to-black/30 group"
              >
                <span className="relative">
                  <span className="absolute inset-0 rounded-full bg-brand-yellow/40 blur-2xl scale-150 group-hover:scale-[1.8] transition-transform" />
                  <span className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-brand-yellow text-brand-blue flex items-center justify-center shadow-2xl ring-4 ring-white/30 group-hover:scale-110 transition-transform">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </button>
            )}

            {playing && (
              <div className="absolute bottom-0 inset-x-0 flex items-center px-5 py-4 bg-gradient-to-t from-black/80 to-transparent">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Pausar"
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 ring-1 ring-white/30 text-white flex items-center justify-center backdrop-blur transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
