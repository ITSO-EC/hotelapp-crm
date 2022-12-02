import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import './css/style.css'

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.companyOne = 'Consulting';
app.config.globalProperties.companyTwo = 'Lexi';
app.use(pinia)
app.use(router)
app.mount('#app')
