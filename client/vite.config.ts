import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: '5e72e52c0b955cb7c1edf5cd60bc6bdb-us21',
  server: 'us21',
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
})
