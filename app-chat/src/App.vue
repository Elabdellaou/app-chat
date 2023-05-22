<template>
  <div id="app">
    <header>
      <h1>Welcome to My App</h1>
      <p v-if="isAuthenticated" class="text-center">Logged in as: {{ user }}</p>
      <p v-else class="text-center">Not logged in</p>
    </header>
    <nav>
      <router-link v-if="isAuthenticated" class="" to="/">Home</router-link>
      <router-link v-if="isAuthenticated" class="ms-2" to="/users">Users</router-link>
      <router-link v-if="!isAuthenticated" to="/login" class="ms-2">Login</router-link>
      <router-link v-if="!isAuthenticated" to="/register" class="ms-2">Register</router-link>
      <router-link v-if="isAuthenticated" class="ms-2" to="/logout">Logout</router-link>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "./store/auth";

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
</script>

<style>
/* Your custom styles */
</style>
