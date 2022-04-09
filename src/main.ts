import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

// Set base URL
axios.defaults.baseURL = process.env.VUE_APP_POKEAPI_URI;

const app = createApp(App).use(store);
app.use(router);
app.use(VueAxios, axios);
app.provide('$http', app.config.globalProperties.axios); // provide 'axios'
app.mount('#app');
