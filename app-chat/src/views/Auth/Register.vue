<template>
  <div>
    <h1>Register</h1>
    <form @submit="register">
      <label for="name">Name:</label>
      <input type="name" id="name" v-model="name" />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />

      <label for="password_confirmation">Password:</label>
      <input
        type="password_confirmation"
        id="password_confirmation"
        v-model="password_confirmation"
      />
      <button type="submit">Register</button>
    </form>
  </div>
</template>
<script>
const register = () => {};
</script>
<style></style>
