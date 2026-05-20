import { useEffect, useState } from 'react'
import { initPayment, ApiError } from '../../lib/api'
import WompiPaymentButton from './WompiPaymentButton'

export default function StepPayment({ orderId, buyer, onClose }) {
  const [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    if (!orderId) return
    const controller = new AbortController()
    setLoading(true)
    setError(null)
    setPayment(null)
    initPayment(orderId, 'WOMPI', { signal: controller.signal })
      .then((res) => {
        if (controller.signal.aborted) return
        setPayment(res)
        setLoading(false)
      })
      .catch((err) => {
        if (controller.signal.aborted) return
        setError(err instanceof ApiError ? err.message : (err?.message || 'No fue posible iniciar el pago.'))
        setLoading(false)
      })
    return () => controller.abort()
  }, [orderId, retryCount])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-brand-green/15 text-brand-green flex items-center justify-center mb-4">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <h3 className="text-xl font-extrabold text-brand-blue">¡Orden creada!</h3>
        <p className="text-sm text-slate-500 mt-1">
          Completa el pago con Wompi para confirmar tu inscripción.
        </p>
        <p className="text-[11px] text-slate-400 mt-2 break-all">Orden: {orderId}</p>
      </div>

      <div className="rounded-2xl border-2 border-brand-blue/30 bg-brand-blue/5 p-6 text-center">
        <p className="font-bold text-brand-blue mb-1">Pagar con Wompi</p>
        <p className="text-xs text-slate-500 mb-4">Tarjeta, PSE, Nequi, Bancolombia y más.</p>

        {loading && (
          <div className="flex items-center justify-center gap-2 py-4 text-sm text-slate-500">
            <span className="w-4 h-4 rounded-full border-2 border-brand-blue/20 border-t-brand-blue animate-spin" />
            Preparando el pago…
          </div>
        )}

        {!loading && error && (
          <div className="space-y-3">
            <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
              {error}
            </div>
            <button
              type="button"
              onClick={() => setRetryCount((n) => n + 1)}
              className="w-full px-5 py-3 rounded-full font-semibold bg-brand-blue text-white hover:bg-brand-blue/90 transition"
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && payment && (
          <WompiPaymentButton payment={payment} buyer={buyer} orderId={orderId} />
        )}
      </div>

      <div className="flex justify-end pt-2">
        <button type="button" onClick={onClose} className="px-5 py-3 rounded-full font-semibold text-slate-600 hover:text-brand-blue">
          Cerrar
        </button>
      </div>
    </div>
  )
}
