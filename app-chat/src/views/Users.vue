<template>
  <div>
    <h1>Welcome to the Users Page</h1>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.user);
</script>
