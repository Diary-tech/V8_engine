import { lazy, Suspense } from 'react'

const BankAlternation = lazy(() => import('./BankAlternation.jsx'))

const crossFiringOrder = [1, 8, 4, 3, 6, 5, 7, 2]
const chevyBankMap = { 1: 'L', 3: 'L', 5: 'L', 7: 'L', 2: 'R', 4: 'R', 6: 'R', 8: 'R' }
const placeholderFlatOrder = [1, 2, 3, 4, 5, 6, 7, 8]
const placeholderFlatMap = { 1: 'L', 2: 'R', 3: 'L', 4: 'R', 5: 'L', 6: 'R', 7: 'L', 8: 'R' }

export default function BankAlternationPair() {
  return (
    <div className="diagram-grid">
      <Suspense fallback={<div className="tech-card">Loading cross-plane diagram…</div>}>
        <BankAlternation firingOrder={crossFiringOrder} bankMap={chevyBankMap} label="Cross-plane / Chevrolet SBC" />
      </Suspense>
      <Suspense fallback={<div className="tech-card">Loading flat-plane diagram…</div>}>
        <BankAlternation
          firingOrder={placeholderFlatOrder}
          bankMap={placeholderFlatMap}
          label="Flat-plane / PLACEHOLDER alternating dataset"
          isPlaceholder
        />
      </Suspense>
    </div>
  )
}
