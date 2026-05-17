import { useRef, useState } from 'react'
import { AGE_GROUPS } from '../../lib/format'
import { findPersonByDocument, hasSupportKey, ApiError } from '../../lib/api'

export default function StepChildren({ children, setChildren, weeks, packages, onNext, onBack }) {
  const [errors, setErrors] = useState({})
  const [lookups, setLookups] = useState({})
  const timersRef = useRef({})
  const lastQueriedRef = useRef({})
  const childrenRef = useRef(children)
  childrenRef.current = children

  const dayPackage = packages.find((p) => p.code === 'DAY')
  const realPackages = packages.filter((p) => p.code !== 'DAY')

  const dayMin = weeks.length ? weeks.reduce((m, w) => (w.start_date < m ? w.start_date : m), weeks[0].start_date) : ''
  const dayMax = weeks.length ? weeks.reduce((m, w) => (w.end_date > m ? w.end_date : m), weeks[0].end_date) : ''

  const updateChild = (idx, patch) => {
    setChildren(childrenRef.current.map((c, i) => (i === idx ? { ...c, ...patch } : c)))
  }

  const setEnrollmentType = (idx, type) => {
    updateChild(idx, {
      enrollment_type: type,
      camp_week_id: '',
      camp_package_id: '',
      individual_date: '',
    })
  }

  const runLookup = async (idx, nit) => {
    if (!nit || nit.length < 5) return
    if (!hasSupportKey()) {
      setLookups((s) => ({ ...s, [idx]: { loading: false, status: 'warn', message: 'Configura VITE_SUPPORT_KEY para autocompletar.' } }))
      return
    }
    if (lastQueriedRef.current[idx] === nit) return
    lastQueriedRef.current[idx] = nit
    setLookups((s) => ({ ...s, [idx]: { loading: true, status: null, message: null } }))
    try {
      const res = await findPersonByDocument(nit)
      const found = res?.found && res.person
      if (!found) {
        updateChild(idx, { child_nit_type: '' })
        setLookups((s) => ({ ...s, [idx]: { loading: false, status: 'info', message: 'No encontramos este documento, completa los datos manualmente.' } }))
        return
      }
      const p = res.person
      const fullFirst = [p.first_name, p.middle_name].filter(Boolean).join(' ').trim()
      const fullLast = [p.last_name_1, p.last_name_2].filter(Boolean).join(' ').trim()
      updateChild(idx, {
        child_first_name: fullFirst,
        child_last_name: fullLast,
        child_nit_type: p.nit_type || '',
      })
      setLookups((s) => ({ ...s, [idx]: { loading: false, status: 'ok', message: 'Datos cargados desde el directorio TCS.' } }))
    } catch (err) {
      setLookups((s) => ({ ...s, [idx]: { loading: false, status: 'warn', message: err instanceof ApiError ? err.message : 'No fue posible consultar el directorio.' } }))
    }
  }

  const setChildNit = (idx, nit) => {
    updateChild(idx, { child_nit: nit })
    if (timersRef.current[idx]) clearTimeout(timersRef.current[idx])
    if (!nit || nit.length < 5) {
      lastQueriedRef.current[idx] = ''
      setLookups((s) => ({ ...s, [idx]: { loading: false, status: null, message: null } }))
      return
    }
    timersRef.current[idx] = setTimeout(() => runLookup(idx, nit), 600)
  }

  const addChild = () => {
    setChildren([
      ...children,
      {
        child_first_name: '',
        child_last_name: '',
        child_nit: '',
        child_nit_type: '',
        age_group: 'K4_1ST',
        enrollment_type: 'WEEK',
        camp_week_id: '',
        camp_package_id: '',
        individual_date: '',
      },
    ])
  }

  const removeChild = (idx) => {
    if (children.length === 1) return
    setChildren(children.filter((_, i) => i !== idx))
  }

  const validate = () => {
    const errs = {}
    children.forEach((c, idx) => {
      const e = {}
      if (!c.child_first_name.trim()) e.first = 'Requerido'
      if (!c.child_last_name.trim()) e.last = 'Requerido'
      if (c.enrollment_type === 'WEEK' && !c.camp_week_id) e.choice = 'Selecciona una semana'
      if (c.enrollment_type === 'PACKAGE' && !c.camp_package_id) e.choice = 'Selecciona un paquete'
      if (c.enrollment_type === 'DAY' && !c.individual_date) e.choice = 'Selecciona la fecha'
      if (Object.keys(e).length) errs[idx] = e
    })
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (validate()) onNext()
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-xl font-extrabold text-brand-blue">Inscritos al Camp</h3>
          <p className="text-sm text-slate-500 mt-1">
            Agrega cada niño y selecciona la modalidad de inscripción.
          </p>
        </div>
        <button type="button" onClick={addChild} className="text-sm font-semibold text-brand-blue hover:text-brand-yellow inline-flex items-center gap-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Agregar otro niño
        </button>
      </div>

      <div className="space-y-5">
        {children.map((c, idx) => {
          const err = errors[idx] || {}
          const lookup = lookups[idx] || {}
          return (
            <div key={idx} className="rounded-2xl border border-slate-200 p-5 md:p-6 bg-white relative">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-blue">
                  <span className="w-6 h-6 rounded-full bg-brand-blue text-white text-[10px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                  Niño / niña
                </span>
                {children.length > 1 && (
                  <button type="button" onClick={() => removeChild(idx)} className="text-xs text-red-500 hover:text-red-600 font-semibold">
                    Quitar
                  </button>
                )}
              </div>

              <Field label="Documento del niño / niña">
                <div className="relative">
                  <input
                    className="input2 pr-10"
                    value={c.child_nit || ''}
                    onChange={(e) => setChildNit(idx, e.target.value)}
                    placeholder="Ingresa el documento para autocompletar"
                    autoComplete="off"
                  />
                  {lookup.loading && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-brand-blue/20 border-t-brand-blue animate-spin" />
                  )}
                  {!lookup.loading && lookup.status === 'ok' && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-green">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </span>
                  )}
                </div>
                {lookup.message && (
                  <p className={`text-xs mt-1.5 ${
                    lookup.status === 'ok' ? 'text-brand-green' :
                    lookup.status === 'warn' ? 'text-amber-600' :
                    'text-slate-500'
                  }`}>
                    {lookup.message}
                  </p>
                )}
              </Field>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <Field label="Nombres" error={err.first}>
                  <input className="input2" value={c.child_first_name} onChange={(e) => updateChild(idx, { child_first_name: e.target.value })} />
                </Field>
                <Field label="Apellidos" error={err.last}>
                  <input className="input2" value={c.child_last_name} onChange={(e) => updateChild(idx, { child_last_name: e.target.value })} />
                </Field>
              </div>

              <Field label="Grupo etario" className="mt-4">
                <div className="grid sm:grid-cols-3 gap-2">
                  {AGE_GROUPS.map((g) => (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => updateChild(idx, { age_group: g.value })}
                      className={`px-3 py-2.5 rounded-xl border text-sm transition ${
                        c.age_group === g.value
                          ? 'border-brand-blue bg-brand-blue/5 ring-1 ring-brand-blue text-brand-blue font-semibold'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Modalidad" className="mt-4">
                <div className="grid sm:grid-cols-3 gap-2">
                  {[
                    { value: 'WEEK', label: 'Semana' },
                    { value: 'PACKAGE', label: 'Paquete' },
                    { value: 'DAY', label: 'Día individual' },
                  ].map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setEnrollmentType(idx, t.value)}
                      className={`px-3 py-2.5 rounded-xl border text-sm transition ${
                        c.enrollment_type === t.value
                          ? 'border-brand-yellow bg-brand-yellow/10 ring-1 ring-brand-yellow text-brand-blue font-semibold'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="mt-4">
                {c.enrollment_type === 'WEEK' && (
                  <Field label="Semana" error={err.choice}>
                    <div className="grid gap-2">
                      {weeks.map((w) => {
                        const disabled = w.stock === 0
                        const checked = String(c.camp_week_id) === String(w.id)
                        return (
                          <label
                            key={w.id}
                            className={`flex items-center justify-between gap-3 p-3 rounded-xl border text-sm cursor-pointer transition ${
                              disabled
                                ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed'
                                : checked
                                ? 'border-brand-blue bg-brand-blue/5 ring-1 ring-brand-blue'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                disabled={disabled}
                                checked={checked}
                                onChange={() => updateChild(idx, { camp_week_id: w.id })}
                                className="accent-brand-blue"
                              />
                              <div>
                                <p className="font-semibold text-brand-blue">{w.label}</p>
                                <p className="text-xs text-slate-500">
                                  {w.days} días · {disabled ? 'Sin cupos' : `${w.stock} cupos`}
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-brand-blue text-sm">
                              ${Number(w.price).toLocaleString('es-CO')}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </Field>
                )}

                {c.enrollment_type === 'PACKAGE' && (
                  <Field label="Paquete" error={err.choice}>
                    <div className="grid gap-2">
                      {realPackages.map((p) => {
                        const checked = String(c.camp_package_id) === String(p.id)
                        return (
                          <label
                            key={p.id}
                            className={`flex items-center justify-between gap-3 p-3 rounded-xl border text-sm cursor-pointer transition ${
                              checked
                                ? 'border-brand-yellow bg-brand-yellow/10 ring-1 ring-brand-yellow'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                checked={checked}
                                onChange={() => updateChild(idx, { camp_package_id: p.id })}
                                className="accent-brand-yellow"
                              />
                              <div>
                                <p className="font-semibold text-brand-blue">{p.label}</p>
                                <p className="text-xs text-slate-500">{p.code}</p>
                              </div>
                            </div>
                            <span className="font-bold text-brand-blue text-sm">
                              ${Number(p.price).toLocaleString('es-CO')}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </Field>
                )}

                {c.enrollment_type === 'DAY' && (
                  <Field label="Fecha del día individual" error={err.choice}>
                    <input
                      type="date"
                      className="input2"
                      min={dayMin}
                      max={dayMax}
                      value={c.individual_date}
                      onChange={(e) => updateChild(idx, { individual_date: e.target.value })}
                    />
                    {dayPackage && (
                      <p className="text-xs text-slate-500 mt-1.5">
                        Día individual: <strong>${Number(dayPackage.price).toLocaleString('es-CO')}</strong> · sujeto a disponibilidad.
                      </p>
                    )}
                  </Field>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="px-5 py-3 rounded-full font-semibold text-slate-600 hover:text-brand-blue">
          Atrás
        </button>
        <button type="submit" className="btn-primary">
          Continuar
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style>{`.input2 { width: 100%; padding: 0.65rem 0.85rem; border-radius: 0.75rem; border: 1px solid #e2e8f0; background: white; outline: none; font-size: 0.95rem; transition: border-color 0.15s, box-shadow 0.15s; }
        .input2:focus { border-color: #004990; box-shadow: 0 0 0 3px rgba(0,73,144,0.1); }`}</style>
    </form>
  )
}

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 block">
        {label}
      </span>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </label>
  )
}
