import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaFlag, RiZhihuFill } from 'oh-vue-icons/icons';

// Vuetify
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

import './index.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// Configuración de Vuetify
const vuetify = createVuetify();

// Configuración de Oh-Vue-Icons
addIcons(FaFlag, RiZhihuFill);
app.component('v-icon', OhVueIcon);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
