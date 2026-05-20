import { useEffect, useRef } from 'react'

export default function WompiPaymentButton({ payment, buyer, orderId }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!payment) return
    const container = containerRef.current
    if (!container) return

    container.innerHTML = ''

    const form = document.createElement('form')
    const script = document.createElement('script')
    script.src = 'https://checkout.wompi.co/widget.js'
    script.setAttribute('data-render', 'button')
    script.setAttribute('data-public-key', payment.public_key)
    script.setAttribute('data-currency', payment.currency || 'COP')
    script.setAttribute('data-amount-in-cents', String(payment.amount))
    script.setAttribute('data-reference', payment.reference)
    script.setAttribute('data-signature:integrity', payment.integrity_signature)

    const fallbackRedirect = `${window.location.origin}/?order_id=${encodeURIComponent(orderId || payment.reference || '')}`
    script.setAttribute('data-redirect-url', payment.redirect_url || fallbackRedirect)

    if (buyer?.email) {
      script.setAttribute('data-customer-data:email', buyer.email)
    }
    if (buyer?.first_name) {
      script.setAttribute(
        'data-customer-data:full-name',
        `${buyer.first_name} ${buyer.last_name_1 || ''}`.trim()
      )
    }
    if (buyer?.cell_phone) {
      script.setAttribute('data-customer-data:phone-number', buyer.cell_phone)
      script.setAttribute('data-customer-data:phone-number-prefix', '+57')
    }

    form.appendChild(script)
    container.appendChild(form)
  }, [payment, buyer])

  return <div ref={containerRef} className="flex justify-center" />
}
