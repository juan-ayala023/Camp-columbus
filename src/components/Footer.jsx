export default function Footer() {
  return (
    <footer className="relative bg-brand-blue text-white pt-20 pb-10">
      <div className="absolute inset-0 blob-bg opacity-30 pointer-events-none" />

      <div className="container-tcs relative">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white text-brand-blue flex items-center justify-center font-extrabold shadow">
                TCS
              </div>
              <div>
                <p className="font-extrabold text-lg">TCS Camp 2026</p>
                <p className="text-xs uppercase tracking-widest text-brand-yellow">Summer fun</p>
              </div>
            </div>
            <p className="text-white/75 max-w-md">
              Una experiencia de campamento del campus TCS pensada para que cada estudiante
              aprenda jugando, explore y haga nuevos amigos en un entorno seguro.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-brand-yellow uppercase tracking-widest text-xs">Camp</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              <li><a href="#experiencia" className="hover:text-white transition">Experiencia</a></li>
              <li><a href="#fechas" className="hover:text-white transition">Fechas</a></li>
              <li><a href="#para-quien" className="hover:text-white transition">Para quién</a></li>
              <li><a href="#actividades" className="hover:text-white transition">Actividades</a></li>
              <li><a href="#valores" className="hover:text-white transition">Valores</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-brand-yellow uppercase tracking-widest text-xs">Contacto</h4>
            <ul className="space-y-3 text-white/80 text-sm">
              <li>
                <p className="text-white/60 text-xs">Correo</p>
                <a href="mailto:columbuslife@columbus.edu.co" className="hover:text-white transition break-all">
                  columbuslife@columbus.edu.co
                </a>
              </li>
              <li>
                <p className="text-white/60 text-xs">WhatsApp</p>
                <a href="https://wa.me/573005484312" target="_blank" rel="noreferrer" className="hover:text-white transition">
                  300 548 4312
                </a>
              </li>
              <li>
                <p className="text-white/60 text-xs">Transporte</p>
                <a href="tel:+573104267880" className="hover:text-white transition">
                  Anderson Castro · 310 426 7880
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 TCS Camp · Campus TCS. Todos los derechos reservados.</p>
          <p>Hecho con energía para un verano inolvidable.</p>
        </div>
      </div>
    </footer>
  )
}
