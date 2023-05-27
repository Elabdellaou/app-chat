<template>
  <div>
    <h1>Welcome to the Home Page</h1>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();

onMounted(() => {
  window.Echo.channel("my-channel").listen("Hello", (e) => {
    console.log(e);
  });
});
</script>
