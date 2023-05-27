<template>
  <div>
    <h1>Welcome to the Home Page</h1>
  </div>
</template>

<script setup>
import { computed,onMounted } from "vue";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isLoggedIn);
const user = computed(() => authStore.user);

onMounted(() => {
  window.Echo.channel('my-channel').listen("Hello", e => {
  console.log(e);
});
    });
</script>
