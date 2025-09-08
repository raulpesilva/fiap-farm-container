import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { dependencies } from './package.json';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    server: { fs: { allow: ['.', '../shared'] } },
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
    ],
  };
});
