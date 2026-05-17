import { createContext, useContext, useState, useCallback } from 'react'
import InscriptionModal from '../components/inscription/InscriptionModal'

const Ctx = createContext({ open: () => {}, close: () => {}, isOpen: false })

export function InscriptionProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialPackageCode, setInitialPackageCode] = useState(null)
  const [initialWeekNumber, setInitialWeekNumber] = useState(null)

  const open = useCallback((opts = {}) => {
    setInitialPackageCode(opts.packageCode || null)
    setInitialWeekNumber(opts.weekNumber || null)
    setIsOpen(true)
  }, [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <Ctx.Provider value={{ isOpen, open, close }}>
      {children}
      {isOpen && (
        <InscriptionModal
          onClose={close}
          initialPackageCode={initialPackageCode}
          initialWeekNumber={initialWeekNumber}
        />
      )}
    </Ctx.Provider>
  )
}

export const useInscription = () => useContext(Ctx)
