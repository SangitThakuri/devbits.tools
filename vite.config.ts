import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // If the build environment is GitHub Actions, use the subfolder path. Otherwise, use the root path.
  base: process.env.GITHUB_ACTIONS ? "/devbits.tools/" : "/",
  plugins: [react(), tailwindcss()],
})
