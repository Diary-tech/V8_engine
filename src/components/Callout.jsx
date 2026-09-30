/**
 * @param {{children: import('react').ReactNode, tone?: 'info'|'warning'}} props
 */
export default function Callout({ children, tone = 'info' }) {
  return <aside className={`callout callout--${tone}`}>{children}</aside>
}
