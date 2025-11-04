import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import Checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    Checker({ typescript: true }),
  ],
})