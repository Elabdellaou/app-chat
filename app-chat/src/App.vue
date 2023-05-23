<template>
  <div id="app" v-cloak>
    <header>
      <h1>Welcome to My App</h1>
      <p v-if="isAuthenticated" class="text-center">
        Logged in as: {{ user.name }}
      </p>
      <p v-else class="text-center">Not logged in</p>
    </header>
    <nav>
      <router-link v-if="isAuthenticated" class="" to="/">Home</router-link>
      <router-link v-if="isAuthenticated" class="ms-2" to="/users"
        >Users</router-link
      >
      <router-link v-if="!isAuthenticated" to="/login" class="ms-2"
        >Login</router-link
      >
      <router-link v-if="!isAuthenticated" to="/register" class="ms-2"
        >Register</router-link
      >
      <router-link v-if="isAuthenticated" class="ms-2" to="/logout"
        >Logout</router-link
      >
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useAuthStore } from "./store/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.user);

watch(isAuthenticated, (newValue) => {
  if (newValue) {
    router.push("/home");
  }
});
</script>

<style>
/* Your custom styles */
</style>
