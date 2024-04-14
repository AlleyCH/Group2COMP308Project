import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteVitalSigns',
      filename: 'remoteEntry.js',
      exposes: {
        './dashboard': './src/components/dashboard', 
      },
      shared: ["react", "react-dom"],
    })
  ],
  server: {
    port: 5171, 
    strictPort: true,
  },
  build: {
    rollupOptions: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    }
  }
});
