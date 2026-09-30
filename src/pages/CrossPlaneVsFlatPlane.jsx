import { lazy, Suspense } from 'react'
import ComparisonLayout from '../layouts/ComparisonLayout.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Quiz from '../components/Quiz.jsx'
import quizData from '../data/quizzes/cross-plane-vs-flat-plane.json'

const TopicBody = lazy(() => import('../content/cross-plane-vs-flat-plane.mdx'))

const tableRows = [
  { label: 'Crank-pin arrangement', left: 'Pins at 90° intervals across two planes', right: 'Pins arranged 180° apart in one plane' },
  { label: 'Firing interval', left: 'One event every 90° of crank rotation', right: 'One event every 90° of crank rotation' },
  { label: 'Bank alternation', left: 'Not strictly alternating; some consecutive events share a bank', right: 'L-R-L-R-L-R-L-R' },
  { label: 'Counterweight / inertia', left: 'More crank counterweight mass is typically needed', right: 'Potential for a lighter crank and lower rotational inertia' },
  { label: 'Vibration character', left: 'Primary balance can be favorable; exhaust and firing order complicate pulse spacing', right: 'More second-order vibration; engine design and mounts manage it' },
  { label: 'Exhaust pulse character', left: 'Irregular spacing at each bank exhaust', right: 'Evenly spaced pulses at each bank' }
]

const sources = [
  '[Heywood, Internal Combustion Engine Fundamentals: add edition/page]',
  '[Chevrolet Small-Block service documentation: add exact document/year/page]',
  '[SOURCE NEEDED: F136 firing order + cylinder numbering]',
  '[Vizard, How to Build Max-Performance Chevy Small-Blocks: add edition/page]'
]

const furtherReading = [
  'Crankshaft counterweighting and reciprocating balance — [SOURCE NEEDED: add source]',
  'V8 exhaust manifold pulse grouping — [SOURCE NEEDED: add source]',
  'Ferrari F136 architecture — [SOURCE NEEDED: add source]'
]

export default function CrossPlaneVsFlatPlane() {
  return (
    <ComparisonLayout
      title="Cross-Plane vs Flat-Plane V8 Crankshafts: The Complete Guide"
      summary="The crankshaft changes how an eight-cylinder engine balances, alternates exhaust pulses between banks, and responds as engine speed rises."
      tableRows={tableRows}
      sources={sources}
      related={furtherReading}
    >
      <Suspense fallback={<div className="page-shell py-24">Loading topic…</div>}>
        <TopicBody />
      </Suspense>

      <section className="content-section quiz-section">
        <SectionHeading eyebrow="CHECK YOUR UNDERSTANDING" title="Quiz" />
        <Quiz questions={quizData} />
      </section>
    </ComparisonLayout>
  )
}
