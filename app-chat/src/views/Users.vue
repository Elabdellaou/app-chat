<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <p v-if="isAuthenticated">You are logged in as: {{ user }}</p>
    <p v-else>Please login or register to continue</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);
</script>
