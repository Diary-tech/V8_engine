/**
 * @param {{children: import('react').ReactNode, variant?: 'primary'|'ghost', type?: 'button'|'submit', onClick?: () => void, disabled?: boolean, className?: string}} props
 */
export default function Button({ children, variant = 'ghost', type = 'button', onClick, disabled = false, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`ui-button ui-button--${variant} ${className}`}
    >
      {children}
    </button>
  )
}
