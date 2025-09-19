import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { dependencies } from './package.json';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    build: { target: 'chrome89' },
    plugins: [
      federation({
        name: 'container',
        remotes: {
          remote: {
            type: 'module',
            name: 'remote',
            entry: `${env.VITE_REMOTE_URL}/remoteEntry.js`,
            entryGlobalName: 'remote',
            shareScope: 'default',
          },
        },
        exposes: {},
        filename: 'remoteEntry.js',
        shared: {
          react: {
            requiredVersion: dependencies.react,
            singleton: true,
          },
          '@raulpesilva/re-state': {
            requiredVersion: dependencies['@raulpesilva/re-state'],
            singleton: true,
          },
        },
      }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
