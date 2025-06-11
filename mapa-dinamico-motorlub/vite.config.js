import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "gume-inteligencia-comercial",
    project: "javascript-react",
    authToken: process.env.SENTRY_AUTH_TOKEN,
    include: "./dist",
    ignore: ["node_modules", "vite.config.js"],
  })],

  build: {
    sourcemap: true
  }
})