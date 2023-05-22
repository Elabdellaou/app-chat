import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),
  actions: {
    login(data) {
      this.isLoggedIn = true;
      this.user = data;
    },
    logout() {
      this.isLoggedIn = false;
      this.user = null;
    },
    register(data) {
      // Implement registration logic here
    },
  },
  getters: {
    // Implement getters here
  },
});
