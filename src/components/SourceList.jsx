/**
 * @param {{items: string[]}} props
 */
export default function SourceList({ items }) {
  return (
    <ol className="source-list">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ol>
  )
}
