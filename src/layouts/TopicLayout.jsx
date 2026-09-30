import { Link } from 'react-router-dom'
import SourceList from '../components/SourceList.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Seo from '../components/Seo.jsx'

/**
 * @param {{title:string, summary:string, children:import('react').ReactNode, sources:string[], related?:Array<{label:string,to:string}>}} props
 */
export default function TopicLayout({ title, summary, children, sources, related = [] }) {
  return (
    <>
      <Seo title={title} description={summary} />
      <div className="page-shell topic-shell">
        <header className="topic-header">
          <p className="eyebrow">TOPIC</p>
          <h1>{title}</h1>
          <p className="hero-summary">{summary}</p>
        </header>
        <aside className="toc">
          <strong>On this page</strong>
          <a href="#content">Content</a>
          <a href="#sources">Sources</a>
        </aside>
        <article id="content" className="prose">{children}</article>
        <section id="sources" className="content-section">
          <SectionHeading title="Sources" />
          <SourceList items={sources} />
        </section>
        <section className="content-section">
          <SectionHeading title="Related pages" />
          {related.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
        </section>
      </div>
    </>
  )
}
