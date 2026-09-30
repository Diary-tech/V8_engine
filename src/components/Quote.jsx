/**
 * @param {{children: import('react').ReactNode, cite?: string}} props
 */
export default function Quote({ children, cite }) {
  return (
    <figure className="quote">
      <blockquote>“{children}”</blockquote>
      {cite ? <figcaption>— {cite}</figcaption> : null}
    </figure>
  )
}
