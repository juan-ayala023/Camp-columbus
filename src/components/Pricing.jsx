import { useInscription } from '../context/InscriptionContext'

const COP = (n) => `$${n.toLocaleString('es-CO')}`

const weeklyPlans = [
  { weekNumber: 1, name: 'Semana 1', range: '16 al 19 de junio', days: 4, price: 640000, color: 'border-brand-pink', dot: 'bg-brand-pink' },
  { weekNumber: 2, name: 'Semana 2', range: '22 al 26 de junio', days: 5, price: 800000, color: 'border-brand-sky', dot: 'bg-brand-sky', featured: true },
  { weekNumber: 3, name: 'Semana 3', range: '30 junio al 3 julio', days: 4, price: 640000, color: 'border-brand-yellow', dot: 'bg-brand-yellow' },
]

const packages = [
  { code: 'PKG_S1S2', name: '2 semanas', detail: '16 al 26 de junio', days: 9, price: 1370000, color: 'border-brand-pink', dot: 'bg-brand-pink' },
  { code: 'PKG_S1S3', name: '2 semanas', detail: '16 al 19 jun y 30 jun al 3 jul', days: 8, price: 1216000, color: 'border-brand-sky', dot: 'bg-brand-sky' },
  { code: 'PKG_3S', name: '3 semanas', detail: '16 de junio al 3 de julio', days: 13, price: 1875000, color: 'border-brand-green', dot: 'bg-brand-green', featured: true },
]

function PlanCard({ plan, onClick }) {
  return (
    <div
      className={`relative bg-white rounded-3xl p-8 shadow-md border-t-4 ${plan.color} hover:-translate-y-1 transition ${plan.featured ? 'ring-2 ring-brand-blue scale-[1.02]' : ''}`}
    >
      {plan.featured && (
        <span className="absolute -top-3 right-6 bg-brand-blue text-white text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full">
          Más popular
        </span>
      )}
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${plan.dot}`} />
        <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
          {plan.days} días
        </span>
      </div>
      <h3 className="mt-3 text-3xl md:text-4xl font-black text-brand-blue leading-tight">{plan.name}</h3>
      <p className="text-slate-500 text-sm mt-2">{plan.range || plan.detail}</p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="text-2xl md:text-3xl font-extrabold text-brand-blue">{COP(plan.price)}</span>
        <span className="text-slate-400 text-sm">COP</span>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="mt-7 btn-primary w-full justify-center"
      >
        Inscribirme
      </button>
    </div>
  )
}

export default function Pricing() {
  const { open } = useInscription()
  return (
    <section id="valores" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-20 left-0 w-72 h-72 rounded-full bg-brand-yellow/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-brand-blue/10 blur-3xl" />

      <div className="container-tcs relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow">Valores</span>
          <h2 className="section-title">
            Elige el plan que <span className="text-brand-yellow">mejor se adapte</span>
          </h2>
          <p className="mt-4 text-slate-600 md:text-lg">
            Inscríbete por semanas o aprovecha nuestros paquetes para vivir la experiencia completa desde $630.000.
          </p>
        </div>

        {/* Weekly */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {weeklyPlans.map((p) => (
            <PlanCard
              key={p.name}
              plan={p}
              onClick={() => open({ weekNumber: p.weekNumber })}
            />
          ))}
        </div>

        {/* Packages */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <h3 className="text-xl md:text-2xl font-extrabold text-brand-blue">Paquetes con descuento</h3>
          <span className="text-xs uppercase tracking-widest text-brand-yellow font-semibold">Ahorra inscribiéndote por varias semanas</span>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {packages.map((p) => (
            <PlanCard
              key={p.code}
              plan={p}
              onClick={() => open({ packageCode: p.code })}
            />
          ))}
        </div>

        {/* Día individual */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-brand-yellow/10 ring-1 ring-brand-yellow/30 flex-wrap">
          <div className="w-12 h-12 bg-brand-yellow rounded-xl flex items-center justify-center text-white shadow shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <div className="flex-1 min-w-[220px]">
            <p className="font-bold text-brand-blue">Día individual</p>
            <p className="text-sm text-slate-600">$200.000 (sujeto a disponibilidad)</p>
          </div>
          <button
            type="button"
            onClick={() => open({ packageCode: 'DAY' })}
            className="btn-primary !py-2.5 text-sm"
          >
            Inscríbete
          </button>
        </div>
      </div>
    </section>
  )
}
