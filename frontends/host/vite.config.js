import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host_frontend',
      remotes: {
        remoteVitalSigns: 'http://localhost:5171/assets/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: false },
        "react-dom": { singleton: true, eager: true, requiredVersion: false },
        "@apollo/client": { singleton: true, eager: true, requiredVersion: false },
        "graphql": { singleton: true, eager: true, requiredVersion: false }
      }
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
