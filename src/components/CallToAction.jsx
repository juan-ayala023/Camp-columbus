import { useInscription } from '../context/InscriptionContext'

export default function CallToAction() {
  const { open } = useInscription()
  return (
    <section id="inscripcion" className="relative py-16 md:py-20 bg-white">
      <div className="container-tcs">
        <div className="relative bg-gradient-to-br from-brand-yellow to-brand-yellow-light text-white rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-brand-pink/30 blur-3xl" />

          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <span className="inline-block uppercase tracking-[0.25em] text-xs font-semibold mb-2 opacity-90">
                ¿Listos para vivirlo?
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Asegura tu cupo en TCS Camp 2026
              </h3>
              <p className="mt-2 text-white/90 max-w-lg">
                Los cupos son limitados y se asignan por orden de pago. ¡No esperes más!
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => open()}
                className="inline-flex items-center gap-2 bg-brand-blue text-white font-bold rounded-full px-7 py-3 shadow-lg hover:-translate-y-0.5 transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
                </svg>
                Inscribirme ahora
              </button>
              <a
                href="https://wa.me/573005484312"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-brand-blue font-bold rounded-full px-7 py-3 shadow-lg hover:-translate-y-0.5 transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.05 15.05 0 0 1-6.59-6.59l2.2-2.21a1 1 0 0 0 .25-1.02A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1 17 17 0 0 0 17 17 1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
