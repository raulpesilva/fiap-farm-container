import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { dependencies } from './package.json';

export default defineConfig(() => ({
  server: { fs: { allow: ['.', '../shared'] } },
  build: { target: 'chrome89' },
  plugins: [
    federation({
      name: 'container',
      remotes: {
        remote: {
          type: 'module',
          name: 'remote',
          entry: 'http://localhost:4174/remoteEntry.js',
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
  ],
}));
