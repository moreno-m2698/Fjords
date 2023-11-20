import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    outDir: "../src/main/resources/static"
  }
})
