import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './styles.css'

export const createRoot = ViteReactSSG(
  {
    routes,
    basename: import.meta.env.BASE_URL
  },
  ({ isClient }) => {
    if (isClient) {
      document.documentElement.classList.add('hydrated')
    }
  }
)
