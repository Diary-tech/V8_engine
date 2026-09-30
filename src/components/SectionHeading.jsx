/**
 * @param {{eyebrow?: string, title: string, children?: import('react').ReactNode, id?: string}} props
 */
export default function SectionHeading({ eyebrow, title, children, id }) {
  return (
    <header className="section-heading" id={id}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </header>
  )
}
