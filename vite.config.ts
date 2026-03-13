import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const rawBasePath = env.VITE_BASE_PATH?.trim() || '/'
  const normalizedBasePath = rawBasePath === '/' ? '/' : `/${rawBasePath.replace(/^\/+|\/+$/g, '')}/`

  return {
    base: normalizedBasePath,
    plugins: [react()],
  }
})
