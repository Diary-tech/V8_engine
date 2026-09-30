import SectionHeading from '../components/SectionHeading.jsx'
import SourceList from '../components/SourceList.jsx'
import SpecTable from '../components/SpecTable.jsx'
import Seo from '../components/Seo.jsx'

/**
 * @param {{title:string, summary:string, children:import('react').ReactNode, tableRows:Array<{label:string,left:string,right:string}>, sources:string[], related?:string[]}} props
 */
export default function ComparisonLayout({ title, summary, children, tableRows, sources, related = [] }) {
  return (
    <>
      <Seo
        title="Cross-Plane vs Flat-Plane V8 Crankshafts: The Complete Guide"
        description="A concise technical comparison of cross-plane and flat-plane V8 crankshafts, bank alternation, vibration, sound, and real-world use."
      />
      <div className="page-shell topic-shell">
        <header className="comparison-hero">
          <p className="eyebrow">V8 CRANKSHAFTS / COMPARISON</p>
          <h1>{title}</h1>
          <p className="hero-summary">{summary}</p>
          <div className="hero-grid">
            <div className="hero-side hero-side--cross"><span>01</span><strong>Cross-plane</strong><small>90° crank-pin spacing</small></div>
            <div className="hero-vs">VS</div>
            <div className="hero-side hero-side--flat"><span>02</span><strong>Flat-plane</strong><small>180° crank-pin spacing</small></div>
          </div>
        </header>

        {children}

        <section className="content-section">
          <SectionHeading eyebrow="AT A GLANCE" title="Head-to-head table" />
          <SpecTable rows={tableRows} leftLabel="Cross-plane" rightLabel="Flat-plane" />
        </section>

        <section className="content-section">
          <SectionHeading eyebrow="INTERPRETATION" title="Verdict" />
          <div className="prose-grid">
            <p>Neither crank layout is universally superior. The geometry changes counterweight needs, vibration characteristics, exhaust-pulse sequencing and packaging choices; the complete engine determines the resulting behavior.</p>
            <p>For this guide, the useful distinction is not “uneven versus even firing.” Both V8 layouts have one firing event every 90° of crank rotation. The key difference is how those events alternate between the two banks.</p>
          </div>
        </section>

        <section className="content-section">
          <SectionHeading eyebrow="REFERENCES" title="Sources" />
          <SourceList items={sources} />
        </section>

        <section className="content-section related-section">
          <SectionHeading eyebrow="NEXT" title="Further reading" />
          <ul className="related-list">
            {related.map((item) => <li key={item}><a href="#">{item}</a></li>)}
          </ul>
        </section>
      </div>
    </>
  )
}
