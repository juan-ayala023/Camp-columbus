import { COP, AGE_GROUPS } from '../../lib/format'

export default function StepReview({ buyer, children, weeks, packages, estimatedTotal, error, submitting, onBack, onConfirm }) {
  const enrollLabel = (c) => {
    if (c.enrollment_type === 'WEEK') {
      const w = weeks.find((x) => String(x.id) === String(c.camp_week_id))
      return w ? w.label : 'Semana'
    }
    if (c.enrollment_type === 'PACKAGE') {
      const p = packages.find((x) => String(x.id) === String(c.camp_package_id))
      return p ? p.label : 'Paquete'
    }
    return `Día individual · ${c.individual_date}`
  }

  const enrollPrice = (c) => {
    if (c.enrollment_type === 'WEEK') {
      const w = weeks.find((x) => String(x.id) === String(c.camp_week_id))
      return w?.price || 0
    }
    if (c.enrollment_type === 'PACKAGE') {
      const p = packages.find((x) => String(x.id) === String(c.camp_package_id))
      return p?.price || 0
    }
    const day = packages.find((p) => p.code === 'DAY')
    return day?.price || 0
  }

  const ageLabel = (v) => AGE_GROUPS.find((g) => g.value === v)?.label || v

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-brand-blue">Revisa tu inscripción</h3>
        <p className="text-sm text-slate-500 mt-1">
          Verifica los datos antes de confirmar y pasar al pago.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5 md:p-6">
        <p className="text-xs uppercase tracking-widest text-brand-yellow font-semibold mb-2">Comprador</p>
        <p className="text-brand-blue font-bold">
          {buyer.first_name} {buyer.middle_name} {buyer.last_name_1} {buyer.last_name_2}
        </p>
        <div className="mt-2 grid sm:grid-cols-2 gap-1 text-sm text-slate-600">
          <p>{buyer.nit_type} · {buyer.nit}</p>
          <p>{buyer.email}</p>
          <p>{buyer.cell_phone}</p>
          <p className="text-slate-500">{buyer.person_source}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200">
        <div className="px-5 md:px-6 py-3 border-b border-slate-100 flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-brand-yellow font-semibold">Inscritos</p>
          <p className="text-xs text-slate-500">{children.length} {children.length === 1 ? 'niño' : 'niños'}</p>
        </div>
        <ul className="divide-y divide-slate-100">
          {children.map((c, i) => (
            <li key={i} className="px-5 md:px-6 py-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-brand-blue">
                  {c.child_first_name} {c.child_last_name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{ageLabel(c.age_group)}</p>
                <p className="text-sm text-slate-600 mt-1 break-words">{enrollLabel(c)}</p>
              </div>
              <p className="font-bold text-brand-blue whitespace-nowrap">
                {COP(enrollPrice(c))}
              </p>
            </li>
          ))}
        </ul>
        <div className="px-5 md:px-6 py-3 bg-slate-50 flex items-center justify-between rounded-b-2xl">
          <span className="text-sm text-slate-500">Total estimado</span>
          <span className="font-extrabold text-brand-blue text-lg">{COP(estimatedTotal)}</span>
        </div>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        El total final es calculado por el backend al crear la orden. Si hay cambios de stock o validaciones, te lo
        indicaremos antes de pagar.
      </p>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} disabled={submitting} className="px-5 py-3 rounded-full font-semibold text-slate-600 hover:text-brand-blue disabled:opacity-40">
          Atrás
        </button>
        <button type="button" onClick={onConfirm} disabled={submitting} className="btn-primary disabled:opacity-60">
          {submitting ? 'Creando orden…' : 'Confirmar y pagar'}
          {!submitting && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
