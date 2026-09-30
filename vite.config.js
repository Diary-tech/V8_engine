import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    { enforce: 'pre', ...mdx({ providerImportSource: '@mdx-js/react' }) },
    react()
  ],
  ssr: {
    noExternal: ['react-helmet-async']
  },
  build: {
    target: 'es2020',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: !isSsrBuild
          ? {
              'vendor-react': ['react', 'react-dom', 'react-router-dom'],
              'vendor-head': ['react-helmet-async'],
              'vendor-gsap': ['gsap', '@gsap/react']
            }
          : undefined
      }
    }
  }
}))
