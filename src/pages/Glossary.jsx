import Seo from '../components/Seo.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

export default function Glossary() {
  return (
    <div className="page-shell topic-shell">
      <Seo title="V8 Anatomy Glossary" description="A placeholder glossary for V8 engine terminology." path="/glossary" />
      <header className="topic-header">
        <p className="eyebrow">LEARN</p>
        <h1>Glossary</h1>
        <p className="hero-summary">A future index of V8 terminology. Search is intentionally not part of Step 1.</p>
      </header>
      <section className="content-section">
        <SectionHeading title="Placeholder" />
        <p className="muted">Glossary entries will be added in a later step.</p>
      </section>
    </div>
  )
}
