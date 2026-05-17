const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const SUPPORT_KEY = import.meta.env.VITE_SUPPORT_KEY || ''

export const EVENT_ID = Number(import.meta.env.VITE_EVENT_ID || 3)

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message)
    this.status = status
    this.payload = payload
  }
}

async function request(path, { method = 'GET', body, auth = false, signal, timeoutMs = 25000 } = {}) {
  const headers = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (auth) headers['X-SUPPORT-KEY'] = SUPPORT_KEY

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(new Error('timeout')), timeoutMs)
  const onExternalAbort = () => controller.abort(signal?.reason)
  if (signal) {
    if (signal.aborted) controller.abort(signal.reason)
    else signal.addEventListener('abort', onExternalAbort, { once: true })
  }

  let res
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })
  } catch (err) {
    clearTimeout(timeoutId)
    signal?.removeEventListener('abort', onExternalAbort)
    if (signal?.aborted) throw err
    if (controller.signal.aborted) {
      throw new ApiError('El servidor no respondió a tiempo. Verifica tu conexión o el backend e inténtalo de nuevo.', 0, null)
    }
    throw new ApiError(err?.message || 'No fue posible contactar el servidor.', 0, null)
  }

  let payload = null
  try {
    const text = await res.text()
    if (text) {
      try { payload = JSON.parse(text) } catch { payload = text }
    }
  } catch (err) {
    clearTimeout(timeoutId)
    signal?.removeEventListener('abort', onExternalAbort)
    if (signal?.aborted) throw err
    throw new ApiError('La respuesta del servidor se interrumpió. Intenta de nuevo.', res.status, null)
  }

  clearTimeout(timeoutId)
  signal?.removeEventListener('abort', onExternalAbort)

  if (!res.ok) {
    const detail =
      (payload && typeof payload === 'object' && payload.detail) ||
      (typeof payload === 'string' && payload) ||
      `Error ${res.status}`
    throw new ApiError(detail, res.status, payload)
  }
  return payload
}

export const getEvent = (eventId = EVENT_ID, opts) =>
  request(`/api/events/${eventId}`, opts)

export const getCampWeeks = (eventId = EVENT_ID, opts) =>
  request(`/api/events/${eventId}/camp/weeks`, opts)

export const getCampPackages = (eventId = EVENT_ID, opts) =>
  request(`/api/events/${eventId}/camp/packages`, opts)

export const findPersonByDocument = (nit, opts) =>
  request(`/api/persons/by-document?nit=${encodeURIComponent(nit)}`, { ...opts, auth: true })

export const createOrder = (payload, opts) =>
  request(`/api/orders/new`, { ...opts, method: 'POST', body: payload, auth: true })

export const initPayment = (orderId, gateway, opts) =>
  request(`/api/payments/init/${orderId}`, {
    ...opts,
    method: 'POST',
    body: { gateway },
    auth: true,
  })

export const checkPlaceToPay = (orderId, opts) =>
  request(`/api/payments/placetopay/check/${orderId}`, { ...opts, method: 'POST' })

export const getOrder = (orderId, opts) =>
  request(`/api/orders/${orderId}`, opts)

export const hasSupportKey = () => Boolean(SUPPORT_KEY)
