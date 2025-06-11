import vuetify from 'vite-plugin-vuetify'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import type { Nuxt } from '@nuxt/schema'
import type { UserConfig } from 'vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@pinia/nuxt',
    // Carga el plugin de Vuetify correctamente
    (_: unknown, nuxt: Nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config: UserConfig) => {
        config.plugins?.push(vuetify({ autoImport: true }))
      })
    }
  ],

  vite: {
    plugins: [
      viteTsconfigPaths()
    ]
  },
})



