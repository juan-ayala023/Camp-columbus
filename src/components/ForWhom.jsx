const groups = [
  {
    title: 'K4 a 1°',
    age: 'Pequeños exploradores',
    color: 'bg-brand-pink',
    pattern: 'from-brand-pink to-brand-pink/60',
    desc: 'Actividades sensoriales, juegos cooperativos y exploración guiada para los más pequeños.',
  },
  {
    title: '2° y 3°',
    age: 'Aventureros',
    color: 'bg-brand-sky',
    pattern: 'from-brand-sky to-brand-sky/60',
    desc: 'Retos creativos, deportes y experimentos divertidos para descubrir nuevos talentos.',
  },
  {
    title: '4° y 5°',
    age: 'Líderes en acción',
    color: 'bg-brand-green',
    pattern: 'from-brand-green to-brand-green/60',
    desc: 'Proyectos colaborativos, ciencia aplicada y actividades de mayor reto físico y mental.',
  },
]

export default function ForWhom() {
  return (
    <section id="para-quien" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="container-tcs">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <span className="eyebrow">Para quién es</span>
            <h2 className="section-title">
              Grupos por edades, <span className="text-brand-yellow">cada uno con su propia magia</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-slate-600 md:text-lg">
            Cada grupo cuenta con actividades adaptadas a su etapa para vivir
            la experiencia al máximo, descubrir talentos y hacer nuevos amigos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {groups.map((g) => (
            <div
              key={g.title}
              className="relative rounded-3xl overflow-hidden p-8 text-white shadow-xl group hover:-translate-y-1 transition"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${g.pattern}`} />
              <div className="absolute inset-0 opacity-30">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/30 blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-black/20 blur-2xl" />
              </div>

              <div className="relative">
                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-90">
                  {g.age}
                </span>
                <h3 className="font-black text-5xl mt-2 leading-none">{g.title}</h3>
                <p className="mt-6 text-white/90 leading-relaxed">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
