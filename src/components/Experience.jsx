const items = [
  {
    title: 'Aprender jugando',
    description: 'Campamento diseñado para que cada actividad despierte la curiosidad y el aprendizaje.',
    color: 'bg-brand-yellow',
    icon: (
      <path d="M12 2L15 8.5L22 9.5L17 14.5L18 22L12 18.5L6 22L7 14.5L2 9.5L9 8.5z" />
    ),
  },
  {
    title: 'Creatividad y deporte',
    description: 'Actividades dinámicas que combinan creatividad, deporte y exploración.',
    color: 'bg-brand-green',
    icon: (
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    ),
  },
  {
    title: 'Entorno seguro',
    description: 'Un espacio guiado, lleno de energía y supervisado por nuestro equipo TCS.',
    color: 'bg-brand-sky',
    icon: (
      <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
    ),
  },
  {
    title: 'Una nueva aventura',
    description: 'Cada día es una experiencia diferente, llena de retos y nuevos amigos.',
    color: 'bg-brand-pink',
    icon: (
      <path d="M12 2l9 7-9 13L3 9l9-7zm0 4L7 10l5 7 5-7-5-4z" />
    ),
  },
]

export default function Experience() {
  return (
    <section id="experiencia" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-yellow/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-brand-blue/10 blur-3xl" />

      <div className="container-tcs relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <span className="eyebrow">La experiencia</span>
            <h2 className="section-title">
              Un campamento donde cada día <span className="text-brand-yellow">es una nueva aventura</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-slate-600 md:text-lg">
            Diseñamos cada semana para que los estudiantes aprendan jugando,
            descubran nuevos talentos y se diviertan en un entorno seguro y
            acompañado por nuestro equipo TCS.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="card-soft p-7 group relative overflow-hidden"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition`}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round">
                  {item.icon}
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-bold text-brand-blue">{item.title}</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">{item.description}</p>

              <span className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full ${item.color} opacity-10 group-hover:opacity-20 transition`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
