import { useEffect, useState } from 'react'
import Button from './Button.jsx'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.dataset.theme || 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('v8-anatomy-theme', theme)
  }, [theme])

  return (
    <Button
      variant="ghost"
      className="theme-toggle"
      onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </Button>
  )
}
