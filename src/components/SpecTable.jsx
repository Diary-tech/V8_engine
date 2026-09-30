/**
 * @param {{rows: Array<{label: string, left: string, right: string}>, leftLabel: string, rightLabel: string}} props
 */
export default function SpecTable({ rows, leftLabel, rightLabel }) {
  return (
    <div className="table-wrap" role="region" aria-label="Side-by-side specification comparison" tabIndex="0">
      <table className="spec-table">
        <thead>
          <tr>
            <th scope="col">Attribute</th>
            <th scope="col">{leftLabel}</th>
            <th scope="col">{rightLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.left}</td>
              <td>{row.right}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
