import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // css: {
  //   postcss: {
  //     plugins: [
  //       require('autoprefixer'),
  //       // ... other postcss plugins
  //     ],
  //   },
  // },
})