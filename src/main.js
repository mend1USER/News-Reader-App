import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/theme.css'
import './assets/style.css'

import App from './App.vue'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
import router from './router'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
