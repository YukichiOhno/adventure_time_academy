import './assets/reset.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import axios from 'axios';

import App from './App.vue';
import router from './router';

const app = createApp(App);;
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

// Set the Axios base URL from environment variable
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

app.use(pinia);
app.use(router);

app.mount('#app');
