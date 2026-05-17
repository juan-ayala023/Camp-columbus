const activities = [
  {
    title: 'Arte y creatividad',
    color: 'bg-brand-pink',
    icon: (
      <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.27-.38-.62-.38-1 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.51-4.49-10-10-10zm-5.5 10c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    ),
  },
  {
    title: 'Deportes y movimiento',
    color: 'bg-brand-green',
    icon: (
      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.89 19.38l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
    ),
  },
  {
    title: 'Exploración y naturaleza',
    color: 'bg-brand-sky',
    icon: (
      <path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z" />
    ),
  },
  {
    title: 'Ciencia y experimentos',
    color: 'bg-brand-yellow',
    icon: (
      <path d="M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z" />
    ),
  },
  {
    title: 'Juegos y diversión',
    color: 'bg-brand-pink',
    icon: (
      <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    ),
  },
  {
    title: 'Salida a parque natural',
    color: 'bg-brand-blue',
    icon: (
      <path d="M14.55 11l-1.14-3.27c-.16-.47-.6-.78-1.1-.78H7c-.83 0-1.5.67-1.5 1.5v3.55c0 .83.67 1.5 1.5 1.5h.5v6c0 .55.45 1 1 1s1-.45 1-1v-3h2v3c0 .55.45 1 1 1s1-.45 1-1v-7.5h2.05zM7 6c.83 0 1.5-.67 1.5-1.5S7.83 3 7 3 5.5 3.67 5.5 4.5 6.17 6 7 6zm9 4l-3 3v6c0 .55.45 1 1 1s1-.45 1-1v-3h2v3c0 .55.45 1 1 1s1-.45 1-1v-7l-3-2z" />
    ),
  },
  {
    title: 'Actividad especial cierre',
    color: 'bg-brand-yellow',
    icon: (
      <path d="M12 1.5l3 6 6 .9-4.5 4.4 1 6.2L12 16l-5.5 3 1-6.2L3 8.4l6-.9 3-6z" />
    ),
  },
  {
    title: 'Refrigerio diario',
    color: 'bg-brand-green',
    icon: (
      <path d="M2 21V19h18v2H2zM20 8V5l-2-2H6L4 5v3l-2 2v8h20v-8l-2-2zm-4 8H8v-2h8v2zm2-5h2v3h-2v-3zM6 11h2v3H6v-3zm2-3H6V6.41L7.41 5h9.18L18 6.41V8h-2V7H8v1z" />
    ),
  },
]

export default function Activities() {
  return (
    <section id="actividades" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-brand-pink/10 blur-3xl" />
      <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-brand-green/10 blur-3xl" />

      <div className="container-tcs relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow">Actividades</span>
          <h2 className="section-title">
            Cada día, una <span className="text-brand-yellow">aventura distinta</span>
          </h2>
          <p className="mt-4 text-slate-600 md:text-lg">
            Una agenda diversa que combina arte, deporte, naturaleza, ciencia y mucha diversión.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {activities.map((a, i) => (
            <div
              key={a.title}
              className="group relative card-soft p-6 text-center hover:-translate-y-1 transition"
            >
              <div
                className={`w-16 h-16 ${a.color} rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition`}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  {a.icon}
                </svg>
              </div>
              <h3 className="mt-4 text-sm md:text-base font-bold text-brand-blue leading-tight">
                {a.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-14 max-w-3xl mx-auto bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-brand-yellow/20 blur-2xl" />
          <div className="relative grid md:grid-cols-[auto_1fr] gap-6 items-center">
            <div className="w-20 h-20 bg-brand-yellow rounded-2xl flex items-center justify-center shadow-lg shrink-0">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M12 1.5l3 6 6 .9-4.5 4.4 1 6.2L12 16l-5.5 3 1-6.2L3 8.4l6-.9 3-6z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold">Cierre semanal especial</h3>
              <p className="mt-1 text-white/85">
                Cada viernes finalizamos con una actividad especial pensada para celebrar todo lo vivido durante la semana.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
