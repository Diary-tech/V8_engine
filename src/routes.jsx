import BaseLayout from './layouts/BaseLayout.jsx'
import NotFound from './pages/NotFound.jsx'
import Glossary from './pages/Glossary.jsx'
import Home from './pages/Home.jsx'

export const routes = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'cross-plane-vs-flat-plane',
        lazy: async () => {
          const module = await import('./pages/CrossPlaneVsFlatPlane.jsx')
          return { Component: module.default }
        }
      },
      {
        path: 'glossary',
        element: <Glossary />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]
