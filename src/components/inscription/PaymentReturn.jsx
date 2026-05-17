import { useEffect, useState } from 'react'
import { checkPlaceToPay, getOrder, ApiError } from '../../lib/api'
import { COP } from '../../lib/format'

const STATUS_MAP = {
  PAID: { label: 'Pago aprobado', color: 'green', icon: 'check' },
  APPROVED: { label: 'Pago aprobado', color: 'green', icon: 'check' },
  PENDING: { label: 'Pago en proceso', color: 'amber', icon: 'clock' },
  DECLINED: { label: 'Pago rechazado', color: 'red', icon: 'x' },
  FAILED: { label: 'Pago fallido', color: 'red', icon: 'x' },
  CANCELLED: { label: 'Pago cancelado', color: 'red', icon: 'x' },
}

export default function PaymentReturn({ orderId, onClose }) {
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState(null)
  const [statusKey, setStatusKey] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    document.body.style.overflow = 'hidden'

    async function run() {
      setLoading(true)
      try {
        try { await checkPlaceToPay(orderId) } catch { /* Wompi orders no aplican aquí */ }
        const o = await getOrder(orderId)
        if (cancelled) return
        setOrder(o)
        setStatusKey(o.status)
      } catch (err) {
        if (!cancelled) setError(err instanceof ApiError ? err.message : (err.message || 'No fue posible consultar la orden.'))
      } finally {
        !cancelled && setLoading(false)
      }
    }
    run()

    return () => {
      cancelled = true
      document.body.style.overflow = ''
    }
  }, [orderId])

  const closeAndClean = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('order_id')
    url.searchParams.delete('orderId')
    window.history.replaceState({}, '', url.toString())
    onClose()
  }

  const cfg = STATUS_MAP[statusKey] || { label: 'Procesando…', color: 'slate', icon: 'clock' }

  return (
    <div className="fixed inset-0 z-[100] flex items-stretch md:items-center justify-center">
      <button type="button" onClick={closeAndClean} aria-label="Cerrar" className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
      <div className="relative bg-white w-full md:max-w-lg md:rounded-3xl md:my-8 shadow-2xl flex flex-col max-h-screen md:max-h-[92vh] overflow-hidden">
        <div className="p-8 text-center">
          {loading && (
            <>
              <div className="mx-auto w-12 h-12 rounded-full border-4 border-brand-blue/15 border-t-brand-blue animate-spin mb-4" />
              <h3 className="text-lg font-bold text-brand-blue">Consultando tu pago…</h3>
            </>
          )}

          {!loading && error && (
            <>
              <StatusIcon icon="x" color="red" />
              <h3 className="text-xl font-extrabold text-brand-blue mt-4">No pudimos consultar la orden</h3>
              <p className="mt-2 text-sm text-slate-600">{error}</p>
              <p className="text-xs text-slate-400 mt-2 break-all">Orden: {orderId}</p>
            </>
          )}

          {!loading && !error && order && (
            <>
              <StatusIcon icon={cfg.icon} color={cfg.color} />
              <h3 className="text-xl font-extrabold text-brand-blue mt-4">{cfg.label}</h3>
              <p className="text-sm text-slate-500 mt-1">
                Orden <span className="font-mono text-xs">{order.order_id}</span>
              </p>
              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-left">
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Total</p>
                <p className="font-extrabold text-brand-blue text-xl">{COP(order.total)}</p>
                <p className="text-xs text-slate-500 mt-3">
                  Inscritos: {(order.camp_enrollments || []).length}
                </p>
              </div>
              {statusKey === 'PAID' && (
                <p className="mt-4 text-sm text-slate-600">
                  Te enviamos la confirmación al correo registrado. ¡Nos vemos en el Camp!
                </p>
              )}
              {statusKey === 'PENDING' && (
                <p className="mt-4 text-sm text-slate-600">
                  Aún estamos esperando confirmación de la pasarela. Te avisaremos por correo.
                </p>
              )}
            </>
          )}

          <button onClick={closeAndClean} className="btn-primary mt-6">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

function StatusIcon({ icon, color }) {
  const palette = {
    green: 'bg-brand-green/15 text-brand-green',
    red: 'bg-red-100 text-red-600',
    amber: 'bg-amber-100 text-amber-600',
    slate: 'bg-slate-100 text-slate-500',
  }[color] || 'bg-slate-100 text-slate-500'

  return (
    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${palette}`}>
      <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
        {icon === 'check' && <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />}
        {icon === 'x' && <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />}
        {icon === 'clock' && <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />}
      </svg>
    </div>
  )
}
