import { useEffect, useState } from 'react'
import {
  EVENT_ID,
  ApiError,
  getCampWeeks,
  getCampPackages,
  createOrder,
  initPayment,
  hasSupportKey,
} from '../../lib/api'
import StepBuyer from './StepBuyer'
import StepChildren from './StepChildren'
import StepReview from './StepReview'
import StepPayment from './StepPayment'
import { COP } from '../../lib/format'

const emptyBuyer = {
  nit_type: 'CC',
  nit: '',
  first_name: '',
  middle_name: '',
  last_name_1: '',
  last_name_2: '',
  email: '',
  cell_phone: '',
  birth_date: '',
  person_source: 'FAMILY',
  siesa_id: '',
  family_id: null,
}

const emptyChild = () => ({
  child_first_name: '',
  child_last_name: '',
  child_nit: '',
  child_nit_type: '',
  age_group: 'K4_1ST',
  enrollment_type: 'WEEK',
  camp_week_id: '',
  camp_package_id: '',
  individual_date: '',
})

const STEPS = [
  { key: 'buyer', label: 'Comprador' },
  { key: 'children', label: 'Niños' },
  { key: 'review', label: 'Resumen' },
  { key: 'payment', label: 'Pago' },
]

export default function InscriptionModal({ onClose, initialPackageCode, initialWeekNumber }) {
  const [step, setStep] = useState(0)
  const [weeks, setWeeks] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  const [buyer, setBuyer] = useState(emptyBuyer)
  const [children, setChildren] = useState([emptyChild()])

  const [submitting, setSubmitting] = useState(false)
  const [orderError, setOrderError] = useState(null)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setLoadError(null)
    Promise.all([getCampWeeks(EVENT_ID), getCampPackages(EVENT_ID)])
      .then(([w, p]) => {
        if (cancelled) return
        setWeeks(w || [])
        setPackages(p || [])

        // pre-seleccionar paquete o semana si vino del CTA
        if (initialPackageCode) {
          const pkg = (p || []).find((x) => x.code === initialPackageCode)
          if (pkg) {
            setChildren([{
              ...emptyChild(),
              enrollment_type: pkg.code === 'DAY' ? 'DAY' : 'PACKAGE',
              camp_package_id: pkg.code === 'DAY' ? '' : pkg.id,
            }])
          }
        } else if (initialWeekNumber) {
          const wk = (w || []).find((x) => x.week_number === initialWeekNumber)
          if (wk) {
            setChildren([{
              ...emptyChild(),
              enrollment_type: 'WEEK',
              camp_week_id: wk.id,
            }])
          }
        }
      })
      .catch((err) => {
        if (cancelled) return
        setLoadError(err.message || 'No fue posible cargar los datos del Camp.')
      })
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const goBack = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmitOrder = async () => {
    setSubmitting(true)
    setOrderError(null)
    try {
      const payload = {
        buyer: {
          ...buyer,
          event_id: EVENT_ID,
          middle_name: buyer.middle_name || null,
          last_name_2: buyer.last_name_2 || null,
          family_id: buyer.family_id || null,
          siesa_id: buyer.siesa_id || '',
        },
        camp_children: children.map((c) => ({
          child_first_name: c.child_first_name.trim(),
          child_last_name: c.child_last_name.trim(),
          child_nit: c.child_nit?.trim() || '',
          child_nit_type: c.child_nit_type || '',
          age_group: c.age_group,
          enrollment_type: c.enrollment_type,
          camp_week_id: c.enrollment_type === 'WEEK' ? Number(c.camp_week_id) : null,
          camp_package_id: c.enrollment_type === 'PACKAGE' ? Number(c.camp_package_id) : null,
          individual_date: c.enrollment_type === 'DAY' ? c.individual_date : null,
        })),
      }

      if (!hasSupportKey()) {
        throw new Error('Falta configurar VITE_SUPPORT_KEY en el archivo .env del frontend.')
      }

      const result = await createOrder(payload)
      setOrder({ id: result.order_id })
      setStep(3)
    } catch (err) {
      setOrderError(err instanceof ApiError ? err.message : (err.message || 'Error al crear la orden.'))
    } finally {
      setSubmitting(false)
    }
  }

  const estimatedTotal = computeEstimated(children, weeks, packages)

  return (
    <div className="fixed inset-0 z-[100] flex items-stretch md:items-center justify-center">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
      />

      <div className="relative bg-white w-full md:max-w-3xl md:rounded-3xl md:my-8 shadow-2xl flex flex-col max-h-screen md:max-h-[92vh] overflow-hidden">
        <header className="relative flex items-start justify-between gap-4 px-6 md:px-8 py-6 bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
              TCS Camp 2026
            </h2>
            <p className="text-white/85 text-sm mt-1">Summer fun · Junio 16 – Julio 3, 2026</p>
            <p className="text-white/70 text-sm">Campus The Columbus School</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition"
            aria-label="Cerrar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <Stepper step={step} />

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {loading && <Loading />}
          {!loading && loadError && <LoadError message={loadError} onClose={onClose} />}

          {!loading && !loadError && step === 0 && (
            <StepBuyer
              buyer={buyer}
              setBuyer={setBuyer}
              onNext={goNext}
            />
          )}
          {!loading && !loadError && step === 1 && (
            <StepChildren
              children={children}
              setChildren={setChildren}
              weeks={weeks}
              packages={packages}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {!loading && !loadError && step === 2 && (
            <StepReview
              buyer={buyer}
              children={children}
              weeks={weeks}
              packages={packages}
              estimatedTotal={estimatedTotal}
              error={orderError}
              submitting={submitting}
              onBack={goBack}
              onConfirm={handleSubmitOrder}
            />
          )}
          {!loading && !loadError && step === 3 && (
            <StepPayment
              orderId={order?.id}
              buyer={buyer}
              onClose={onClose}
            />
          )}
        </div>

        {!loading && !loadError && step < 2 && (
          <footer className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-sm">
            <span className="text-slate-500">Total estimado</span>
            <span className="font-extrabold text-brand-blue text-base">{COP(estimatedTotal)}</span>
          </footer>
        )}
      </div>
    </div>
  )
}

function Stepper({ step }) {
  return (
    <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/60">
      <ol className="flex items-center justify-between gap-2">
        {STEPS.map((s, i) => {
          const done = i < step
          const active = i === step
          return (
            <li key={s.key} className="flex-1 flex items-center gap-2 min-w-0">
              <span
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  done
                    ? 'bg-brand-green text-white'
                    : active
                    ? 'bg-brand-blue text-white ring-4 ring-brand-blue/15'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {done ? '✓' : i + 1}
              </span>
              <span
                className={`text-xs md:text-sm truncate ${
                  active ? 'font-bold text-brand-blue' : 'text-slate-500'
                }`}
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <span className={`hidden md:block flex-1 h-px ${done ? 'bg-brand-green' : 'bg-slate-200'}`} />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Loading() {
  return (
    <div className="py-16 flex flex-col items-center justify-center gap-4 text-slate-500">
      <div className="w-12 h-12 rounded-full border-4 border-brand-blue/15 border-t-brand-blue animate-spin" />
      <p>Cargando datos del Camp…</p>
    </div>
  )
}

function LoadError({ message, onClose }) {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-brand-blue">No pudimos cargar el Camp</h3>
      <p className="mt-2 text-slate-600">{message}</p>
      <button
        onClick={onClose}
        className="mt-6 inline-flex items-center px-5 py-2.5 rounded-full bg-brand-blue text-white font-semibold"
      >
        Cerrar
      </button>
    </div>
  )
}

function computeEstimated(children, weeks, packages) {
  let total = 0
  for (const c of children) {
    if (c.enrollment_type === 'WEEK' && c.camp_week_id) {
      const w = weeks.find((x) => String(x.id) === String(c.camp_week_id))
      if (w) total += Number(w.price) || 0
    } else if (c.enrollment_type === 'PACKAGE' && c.camp_package_id) {
      const p = packages.find((x) => String(x.id) === String(c.camp_package_id))
      if (p) total += Number(p.price) || 0
    } else if (c.enrollment_type === 'DAY') {
      const day = packages.find((x) => x.code === 'DAY')
      if (day) total += Number(day.price) || 0
    }
  }
  return total
}
