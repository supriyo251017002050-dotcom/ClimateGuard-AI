import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import { createChatMiddleware } from './server/chat.js'
import { createHazardMiddleware } from './server/hazards.js'
import { createIncidentMiddleware } from './server/incidents.js'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  define: { CESIUM_BASE_URL: JSON.stringify('/cesium') },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    allowedHosts: true,
    proxy: {
      '/gods-eye-view': {
        target: 'http://127.0.0.1:4173',
        changeOrigin: true,
        ws: true,
      },
    },
  },
  plugins: [
    { name: 'local-climateguard-chat', configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.envDir, '');
      server.middlewares.use(createHazardMiddleware({ firmsKey: env.FIRMS_MAP_KEY || '', capFeedUrl: env.CAP_FEED_URL || undefined }));
      server.middlewares.use(createIncidentMiddleware());
      server.middlewares.use(createChatMiddleware({ apiKey: env.OPENAI_API_KEY, model: env.OPENAI_MODEL || 'gpt-4.1-mini', baseUrl: env.OPENAI_BASE_URL || 'https://api.openai.com/v1' }));
    } },
    react(),
    tailwindcss(),
    viteStaticCopy({ targets: [
      ...['Workers', 'ThirdParty', 'Assets', 'Widgets'].map(name => ({
        src: `node_modules/cesium/Build/Cesium/${name}/**/*`, dest: 'cesium',
        // v4 preserves source paths; retain Assets/... but remove the package prefix.
        rename: { stripBase: 4 },
      })),
      {
        src: 'gods-eye-view/dist/**/*',
        dest: 'gods-eye-view',
        rename: { stripBase: 2 },
      },
    ] }),
  ],
})
