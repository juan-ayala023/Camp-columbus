import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VideoSection from './components/VideoSection'
import Carousel from './components/Carousel'
import Experience from './components/Experience'
import ForWhom from './components/ForWhom'
import Safety from './components/Safety'
import Activities from './components/Activities'
import Pricing from './components/Pricing'
import Transport from './components/Transport'
import Faq from './components/Faq'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import { InscriptionProvider } from './context/InscriptionContext'

const PAYMENT_RETURN_PARAMS = ['order_id', 'orderId', 'id', 'env', 'reference']

export default function App() {
  useEffect(() => {
    const url = new URL(window.location.href)
    const hadPaymentParam = PAYMENT_RETURN_PARAMS.some((p) => url.searchParams.has(p))
    if (!hadPaymentParam) return
    PAYMENT_RETURN_PARAMS.forEach((p) => url.searchParams.delete(p))
    window.history.replaceState({}, '', url.pathname + (url.search ? `?${url.searchParams}` : '') + url.hash)
  }, [])

  return (
    <InscriptionProvider>
      <div className="min-h-screen bg-white overflow-x-hidden max-w-[100vw]">
        <Navbar />
        <main>
          <Hero />
          <VideoSection />
          <Experience />
          <ForWhom />
          <Activities />
          <Carousel />
          <Safety />
          <Pricing />
          <Transport />
          <Faq />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </InscriptionProvider>
  )
}
