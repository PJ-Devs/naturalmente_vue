import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import './index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Vuetify
const vuetify = createVuetify()

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
