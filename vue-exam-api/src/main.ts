/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import useMoneyPluginSymbol from './composables/useMoney'

const app = createApp(App)
app.use(useMoneyPluginSymbol)
registerPlugins(app)

app.mount('#app')
