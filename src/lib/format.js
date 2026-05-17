export const COP = (n) => `$${Number(n || 0).toLocaleString('es-CO')}`

export const AGE_GROUPS = [
  { value: 'K4_1ST', label: 'K4 a 1° grado' },
  { value: '2ND_3RD', label: '2° a 3° grado' },
  { value: '4TH_5TH', label: '4° a 5° grado' },
]

export const PERSON_SOURCES = [
  { value: 'EMPLOYEE', label: 'Empleado TCS' },
  { value: 'STUDENT', label: 'Estudiante / familia TCS' },
  { value: 'FAMILY', label: 'Externo / familiar' },
]

export const NIT_TYPES = [
  { value: 'CC', label: 'Cédula de ciudadanía' },
  { value: 'CE', label: 'Cédula de extranjería' },
  { value: 'TI', label: 'Tarjeta de identidad' },
  { value: 'PA', label: 'Pasaporte' },
]

export const GATEWAYS = [
  { value: 'WOMPI', label: 'Wompi', desc: 'Tarjeta, PSE, Nequi, Bancolombia.' },
  { value: 'PLACETOPAY', label: 'PlaceToPay', desc: 'Tarjeta, PSE y otros métodos.' },
]

export const formatRange = (start, end) => {
  if (!start || !end) return ''
  const s = new Date(start + 'T00:00')
  const e = new Date(end + 'T00:00')
  const fmt = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short' })
  return `${fmt.format(s)} – ${fmt.format(e)}`
}
