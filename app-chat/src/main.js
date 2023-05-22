import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import './style.css';
import './plugins/axios';
import App from './App.vue';
import { createPinia } from 'pinia';
import { useAuthStore } from './store/auth';
import authPlugin from './plugins/authPlugin';
import router from './router/index';

const pinia = createPinia();

const app = createApp(App);
app.use(pinia)
   .use(router)
   .mount('#app');

const authStore = useAuthStore();
app.config.globalProperties.$auth = authStore;

authPlugin(pinia);

router.beforeEach((to, from, next) => {
   if (to.meta.requiresAuth && !authStore.isLoggedIn) {
      next('/login');
   } else {
      next();
   }
});
