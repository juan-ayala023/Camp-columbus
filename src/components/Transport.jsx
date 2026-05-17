const COP = (n) => `$${n.toLocaleString('es-CO')}`

const fees = [
  { range: '16 al 19 de junio', days: '4 días', price: 165000 },
  { range: '22 al 26 de junio', days: '5 días', price: 206000 },
  { range: '30 junio al 3 julio', days: '4 días', price: 165000 },
  { range: 'Paquete completo (3 semanas)', days: '13 días', price: 530000, featured: true },
]

export default function Transport() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-tcs">
        <div className="rounded-3xl bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white shadow-xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-brand-yellow/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-brand-pink/15 blur-3xl" />

          <div className="relative grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <span className="inline-block uppercase tracking-[0.25em] text-xs font-semibold text-brand-yellow mb-3">
                Transporte
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Servicio de <span className="text-brand-yellow">transporte opcional</span>
              </h2>
              <p className="mt-4 text-white/80">
                Contamos con un proveedor externo que ofrece servicio de
                transporte desde diferentes zonas del Área Metropolitana.
                Este servicio no está incluido en el valor del Camp y debe
                contratarse directamente con el proveedor.
              </p>

              <div className="mt-7 bg-white/10 rounded-2xl p-5 ring-1 ring-white/20 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest text-brand-yellow font-semibold">
                  Contacto del proveedor
                </p>
                <p className="mt-2 font-bold text-lg">Anderson Castro</p>
                <a
                  href="tel:+573104267880"
                  className="mt-1 inline-flex items-center gap-2 text-white/90 hover:text-brand-yellow transition"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.05 15.05 0 0 1-6.59-6.59l2.2-2.21a1 1 0 0 0 .25-1.02A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1 17 17 0 0 0 17 17 1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z" />
                  </svg>
                  310 426 7880
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white/10 rounded-2xl ring-1 ring-white/15 backdrop-blur-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                  <p className="font-semibold">Tarifas Área Metropolitana</p>
                  <span className="text-[11px] uppercase tracking-widest text-white/60">COP</span>
                </div>
                <ul className="divide-y divide-white/10">
                  {fees.map((f) => (
                    <li
                      key={f.range}
                      className={`flex items-center justify-between gap-4 px-6 py-4 ${f.featured ? 'bg-brand-yellow/10' : ''}`}
                    >
                      <div>
                        <p className="font-semibold">{f.range}</p>
                        <p className="text-white/70 text-xs uppercase tracking-widest">{f.days}</p>
                      </div>
                      <p className={`font-extrabold text-lg ${f.featured ? 'text-brand-yellow' : 'text-white'}`}>
                        {COP(f.price)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
