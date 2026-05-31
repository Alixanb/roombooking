import './application/vue/assets/index.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './application/vue/router'

const app = createApp(App)

app.use(router)

app.mount('#app')
