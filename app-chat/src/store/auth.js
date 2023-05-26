import { defineStore } from 'pinia';
import axios from "axios";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    async login(data) {
      // this.token = ;
      const result = await axios.post("/login", { email: data.emailInput.value, password: data.password.value });
      if (result && result.status == 200) {
        const token = result.data.access_token;
        this.setAccessToken(token);
        this.loadAccessToken();
      }

    },
    setAccessToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    async loadAccessToken() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const data = await this.getUser();

        if (data) {
          this.user = data.data;
        }
      }
    },
    async logout() {

      await axios.post("/logout")
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
    async getUser() {
      // const response=await axios.get("/user");
      // console.log(response)
      // if (response.status == 401) {
      //   this.logout()
      //   return null;
      // }
      // return response;
      let response = null;
      await axios.get("/user").then(res => {
        response = res;
      }).catch(errors => {
        this.logout()
      })
      return response;
    },
    async register(data) {
      const result = await axios.post("/register", { password_confirmation: data.password_confirmation.value, name: data.name.value, email: data.emailInput.value, password: data.password.value });
      // console.log(result)
      if (result && result.status == 200) {
        const token = result.data.token;
        this.setAccessToken(token);
        this.loadAccessToken();
      }
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
});
