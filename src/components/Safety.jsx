const points = [
  {
    title: 'Equipo calificado',
    desc: 'Docentes y personal logístico con experiencia y formación específica.',
    icon: (
      <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C14 14.17 9.33 13 8 13zm8 0c-.29 0-.62.02-.97.05A4.99 4.99 0 0 1 18 16.5V19h5v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    ),
  },
  {
    title: 'Espacios seguros',
    desc: 'Actividades dentro del campus TCS con protocolos institucionales activos.',
    icon: (
      <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4zm-1 14l-4-4 1.4-1.4L11 13.2l4.6-4.6L17 10l-6 6z" />
    ),
  },
  {
    title: 'Acompañamiento',
    desc: 'Supervisión permanente del equipo durante toda la jornada.',
    icon: (
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    ),
  },
  {
    title: 'Protocolos activos',
    desc: 'Procedimientos de seguridad y atención permanentes en todo el Camp.',
    icon: (
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    ),
  },
]

export default function Safety() {
  return (
    <section className="relative py-20 md:py-28 bg-brand-blue text-white overflow-hidden">
      <div className="absolute inset-0 blob-bg opacity-40" />
      <div className="absolute -top-20 right-10 w-72 h-72 rounded-full bg-brand-sky/20 blur-3xl" />

      <div className="container-tcs relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="inline-block uppercase tracking-[0.25em] text-xs font-semibold text-brand-yellow mb-3">
              Seguridad y entorno
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Tu hijo está en <br />
              <span className="text-brand-yellow">las mejores manos</span>
            </h2>
            <p className="mt-5 text-white/80 md:text-lg max-w-md">
              En TCS Camp combinamos un equipo profesional, espacios pensados
              para el bienestar y protocolos institucionales que garantizan una
              experiencia tranquila para las familias.
            </p>

            <a href="#faq" className="btn-outline mt-8">
              Conoce las preguntas frecuentes
            </a>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {points.map((p) => (
              <div
                key={p.title}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 ring-1 ring-white/15 hover:bg-white/15 transition"
              >
                <div className="w-12 h-12 bg-brand-yellow rounded-xl flex items-center justify-center text-brand-blue shadow-lg">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    {p.icon}
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                <p className="mt-1.5 text-white/80 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
