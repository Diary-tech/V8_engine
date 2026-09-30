import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <div className="page-shell not-found">
      <Seo title="Page not found — V8 Anatomy" description="The requested V8 Anatomy page was not found." path="/404" />
      <p className="eyebrow">404 / NOT FOUND</p>
      <h1>Page not found</h1>
      <p>The requested page is outside the current Step 1 foundation.</p>
      <Link className="ui-button ui-button--primary" to="/cross-plane-vs-flat-plane">Open the comparison</Link>
    </div>
  )
}
