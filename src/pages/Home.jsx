import { lazy, Suspense } from 'react'
import Seo from '../components/Seo.jsx'

const ExplodedV8 = lazy(() => import('../components/ExplodedV8.jsx'))

export default function Home() {
  return (
    <>
      <Seo title="V8 Anatomy Home" description="A simplified, layered look at a V8 engine showing the major assemblies and how they relate in an exploded view." path="/" />
      <div className="page-shell topic-shell">
        <header className="topic-header">
          <p className="eyebrow">V8 engine anatomy / home</p>
          <h1>V8 Anatomy</h1>
          <p className="hero-summary">A front-view guide to the major V8 assemblies, from covers and heads to pistons, rods, crank, and block.</p>
        </header>

        <Suspense fallback={
          <section className="content-section exploded-section" aria-labelledby="exploded-v8-heading">
            <div className="section-heading">
              <p className="eyebrow">Exploded view</p>
              <h2 id="exploded-v8-heading">V8 anatomy in layers</h2>
            </div>
            <p className="exploded-caption">Simplified illustration, not to scale.</p>
            <ul className="exploded-parts-list" aria-label="V8 engine parts">
              <li><strong>Valve covers</strong><span>Valve covers seal the upper valvetrain area and help keep the cylinder head assembly contained.</span></li>
              <li><strong>Cylinder heads</strong><span>Cylinder heads guide the combustion process and contain the intake and exhaust passages of each bank.</span></li>
              <li><strong>Pistons + connecting rods</strong><span>The pistons and rods turn the combustion force into crankshaft rotation and are arranged in the two V-bank rows.</span></li>
              <li><strong>Crankshaft</strong><span>The crankshaft converts the pistons&apos; reciprocating motion into rotating output at the engine&apos;s center.</span></li>
              <li><strong>Engine block</strong><span>The block is the structural base of the engine and positions the cylinders, crankshaft, and head assemblies.</span></li>
            </ul>
          </section>
        }>
          <ExplodedV8 />
        </Suspense>
      </div>
    </>
  )
}
