import { useState } from 'react'

const faqs = [
  {
    q: '¿Cómo funciona la inscripción?',
    a: 'La inscripción se realiza directamente a través de esta misma página. Los cupos son limitados y se asignan por orden de pago. Para más información: columbuslife@columbus.edu.co — WhatsApp 300 5484312.',
  },
  {
    q: '¿Qué incluye el Camp?',
    a: 'El programa incluye actividades diarias, refrigerio, una camiseta por semana del color asignado según el grupo, y una salida semanal. Todas las experiencias están diseñadas para aprendizaje, recreación y diversión.',
  },
  {
    q: '¿El Camp tiene salidas?',
    a: 'Sí. Cada semana incluye una salida lúdico-deportiva y de aprendizaje a un parque o espacio externo. Estas actividades están organizadas y supervisadas por el equipo del TCS Camp.',
  },
  {
    q: '¿Hay alguna actividad especial al final de la semana?',
    a: 'Sí. Cada semana finaliza con una actividad especial tipo cierre, pensada para resaltar lo vivido durante el Camp.',
  },
  {
    q: '¿Los niños reciben uniforme o camiseta?',
    a: 'Sí. Cada participante recibe una camiseta del color correspondiente a su grupo durante la semana.',
  },
  {
    q: '¿Incluye alimentación?',
    a: 'El Camp incluye un refrigerio diario. En las salidas fuera de la institución, este también está incluido.',
  },
  {
    q: '¿Los niños están supervisados todo el tiempo?',
    a: 'Sí. Los estudiantes cuentan con acompañamiento permanente del equipo docente y logístico durante toda la jornada.',
  },
  {
    q: '¿Hay transporte disponible?',
    a: 'Sí, contamos con un proveedor con servicio de transporte con costo adicional desde diferentes zonas. Este se contrata directamente con el proveedor.',
  },
  {
    q: '¿Qué pasa si no puedo asistir?',
    a: 'No se realizan devoluciones de dinero. En casos de fuerza mayor debidamente soportados, se podrá generar saldo a favor.',
  },
  {
    q: '¿Cómo se organizan los grupos?',
    a: 'Los grupos se dividen por edades para garantizar actividades acordes a cada etapa: K4 a 1°, 2° y 3°, y 4° y 5°.',
  },
  {
    q: '¿Qué debe llevar mi hijo(a)?',
    a: 'Se recomienda ropa cómoda, hidratación y elementos personales básicos. Previo al inicio del Camp se enviará información detallada a las familias.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50">
      <div className="container-tcs">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2 className="section-title">
              Resolvemos <br />
              <span className="text-brand-yellow">tus dudas</span>
            </h2>
            <p className="mt-5 text-slate-600">
              Si necesitas más información, escríbenos al correo o por WhatsApp.
            </p>

            <div className="mt-7 space-y-3">
              <a
                href="mailto:columbuslife@columbus.edu.co"
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white shadow-sm hover:shadow-md transition group"
              >
                <span className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </span>
                <div className="text-sm">
                  <p className="text-slate-500 text-xs">Correo</p>
                  <p className="font-semibold text-brand-blue group-hover:text-brand-yellow transition truncate">
                    columbuslife@columbus.edu.co
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/573005484312"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white shadow-sm hover:shadow-md transition group"
              >
                <span className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center text-white shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.05 15.05 0 0 1-6.59-6.59l2.2-2.21a1 1 0 0 0 .25-1.02A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1 17 17 0 0 0 17 17 1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z" />
                  </svg>
                </span>
                <div className="text-sm">
                  <p className="text-slate-500 text-xs">WhatsApp</p>
                  <p className="font-semibold text-brand-blue group-hover:text-brand-yellow transition">
                    300 548 4312
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm divide-y divide-slate-100 ring-1 ring-slate-100">
              {faqs.map((f, i) => {
                const isOpen = open === i
                return (
                  <button
                    key={i}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full text-left p-5 md:p-6 group"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`mt-0.5 w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition ${
                          isOpen ? 'bg-brand-yellow text-white rotate-45' : 'bg-brand-blue/5 text-brand-blue group-hover:bg-brand-blue/10'
                        }`}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                      <div className="flex-1">
                        <h3 className={`font-bold transition ${isOpen ? 'text-brand-blue' : 'text-slate-800 group-hover:text-brand-blue'}`}>
                          {f.q}
                        </h3>
                        <div
                          className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-2' : 'max-h-0'}`}
                        >
                          <p className="text-slate-600 leading-relaxed">{f.a}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
