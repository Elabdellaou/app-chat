import { createApp } from 'vue';
// import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import './style.css';
import './plugins/axios';
import App from './App.vue';
import { createPinia } from 'pinia';
import { useAuthStore } from './store/auth';
import authPlugin from './plugins/authPlugin';
import router from './router/index';
// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Add the required icon packs to the library
library.add(fas, far, fab);

// Register the component globally


const pinia = createPinia();

const app = createApp(App);
app.use(pinia)
   .use(router)
   .mount('#app');


   app.component('font-awesome-icon', FontAwesomeIcon);
   
const authStore = useAuthStore();
// app.config.globalProperties.$auth = authStore;

authPlugin(pinia);

// load access token
authStore.loadAccessToken();

router.beforeEach((to, from, next) => {
   if (to.meta.requiresAuth && !authStore.isLoggedIn) {
      next('/login');
   } else if (to.meta.requiresNotAuth && authStore.isLoggedIn) {
      next('/home');
   } else {
      next();
   }
});