import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin(['VITE_TEST_ENDPOINT', 'VITE_DEV_ENDPOINT'])
  ],
  build: {
    outDir: "../src/main/resources/static"
  }
})
