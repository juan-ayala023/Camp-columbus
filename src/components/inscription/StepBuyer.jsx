import { useEffect, useRef, useState } from 'react'
import { findPersonByDocument, hasSupportKey, ApiError } from '../../lib/api'
import { NIT_TYPES } from '../../lib/format'

export default function StepBuyer({ buyer, setBuyer, onNext }) {
  const [errors, setErrors] = useState({})
  const [lookupState, setLookupState] = useState({ loading: false, status: null, message: null })
  const lastQueriedRef = useRef('')
  const buyerRef = useRef(buyer)
  buyerRef.current = buyer

  const set = (k) => (e) => setBuyer({ ...buyerRef.current, [k]: e.target.value })

  const runLookup = async (nit) => {
    if (!nit || nit.length < 5) return
    if (!hasSupportKey()) {
      setLookupState({ loading: false, status: 'warn', message: 'Configura VITE_SUPPORT_KEY para autocompletar.' })
      return
    }
    if (lastQueriedRef.current === nit) return
    lastQueriedRef.current = nit
    setLookupState({ loading: true, status: null, message: null })
    try {
      const res = await findPersonByDocument(nit)
      const found = res?.found && res.person
      if (!found) {
        setBuyer({
          ...buyerRef.current,
          person_source: buyerRef.current.person_source || 'FAMILY',
          siesa_id: '',
          family_id: null,
        })
        setLookupState({ loading: false, status: 'info', message: 'No encontramos este documento, completa los datos manualmente.' })
        return
      }
      const p = res.person
      setBuyer({
        ...buyerRef.current,
        nit_type: p.nit_type || buyerRef.current.nit_type,
        first_name: p.first_name || '',
        middle_name: p.middle_name || '',
        last_name_1: p.last_name_1 || '',
        last_name_2: p.last_name_2 || '',
        email: p.email || '',
        cell_phone: p.cell_phone || '',
        birth_date: p.birth_date || '',
        person_source: p.person_source || 'FAMILY',
        siesa_id: p.siesa_id || '',
        family_id: p.family_id || null,
      })
      setLookupState({ loading: false, status: 'ok', message: 'Datos cargados desde el directorio TCS.' })
    } catch (err) {
      setLookupState({
        loading: false,
        status: 'warn',
        message: err instanceof ApiError ? err.message : 'No fue posible consultar el directorio.',
      })
    }
  }

  useEffect(() => {
    const nit = (buyer.nit || '').trim()
    if (!nit || nit.length < 5) {
      lastQueriedRef.current = ''
      return
    }
    const t = setTimeout(() => runLookup(nit), 600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyer.nit])

  const validate = () => {
    const errs = {}
    if (!buyer.nit?.trim()) errs.nit = 'Documento requerido'
    if (!buyer.first_name?.trim()) errs.first_name = 'Nombre requerido'
    if (!buyer.last_name_1?.trim()) errs.last_name_1 = 'Apellido requerido'
    if (!/^\S+@\S+\.\S+$/.test(buyer.email || '')) errs.email = 'Correo inválido'
    if (!buyer.cell_phone?.trim()) errs.cell_phone = 'Celular requerido'
    if (!buyer.birth_date) errs.birth_date = 'Fecha requerida'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (validate()) {
      if (!buyer.person_source) setBuyer({ ...buyer, person_source: 'FAMILY' })
      onNext()
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="rounded-2xl bg-blue-50/50 ring-1 ring-blue-100 p-5 md:p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center shadow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-extrabold text-brand-blue">Datos del comprador</h3>
          </div>
          <span className="text-[11px] font-semibold text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Obligatorio
          </span>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Tipo doc.">
            <select className="input" value={buyer.nit_type} onChange={set('nit_type')}>
              {NIT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </Field>
          <Field label="Número" required error={errors.nit} className="sm:col-span-2">
            <div className="relative">
              <input
                className="input pr-10"
                value={buyer.nit}
                onChange={set('nit')}
                placeholder="Ingresa el documento para buscar"
                autoComplete="off"
              />
              {lookupState.loading && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-brand-blue/20 border-t-brand-blue animate-spin" />
              )}
              {!lookupState.loading && lookupState.status === 'ok' && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
              )}
            </div>
            {lookupState.message && (
              <p className={`text-xs mt-1.5 ${
                lookupState.status === 'ok' ? 'text-brand-green' :
                lookupState.status === 'warn' ? 'text-amber-600' :
                'text-slate-500'
              }`}>
                {lookupState.message}
              </p>
            )}
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Field label="Primer nombre" required error={errors.first_name}>
            <input className="input" value={buyer.first_name} onChange={set('first_name')} placeholder="Juan" />
          </Field>
          <Field label="Segundo nombre">
            <input className="input" value={buyer.middle_name || ''} onChange={set('middle_name')} placeholder="Carlos" />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Field label="Primer apellido" required error={errors.last_name_1}>
            <input className="input" value={buyer.last_name_1} onChange={set('last_name_1')} placeholder="Pérez" />
          </Field>
          <Field label="Segundo apellido">
            <input className="input" value={buyer.last_name_2 || ''} onChange={set('last_name_2')} placeholder="García" />
          </Field>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <Field label="Email" required error={errors.email}>
            <input className="input" type="email" value={buyer.email} onChange={set('email')} placeholder="correo@ejemplo.com" />
          </Field>
          <Field label="Celular" required error={errors.cell_phone}>
            <input className="input" value={buyer.cell_phone} onChange={set('cell_phone')} placeholder="3001234567" />
          </Field>
          <Field label="Fecha nacimiento" required error={errors.birth_date}>
            <input className="input" type="date" value={buyer.birth_date || ''} onChange={set('birth_date')} />
          </Field>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" className="btn-primary">
          Continuar
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style>{`.input { width: 100%; padding: 0.65rem 0.85rem; border-radius: 0.85rem; border: 1px solid #dbe4f0; background: white; outline: none; font-size: 0.95rem; transition: border-color 0.15s, box-shadow 0.15s; }
        .input:focus { border-color: #004990; box-shadow: 0 0 0 3px rgba(0,73,144,0.12); }`}</style>
    </form>
  )
}

function Field({ label, required, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold text-slate-700 mb-1.5 block">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </label>
  )
}
