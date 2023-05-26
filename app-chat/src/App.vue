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
      <a
        v-if="isAuthenticated"
        @click.prevent="logout"
        class="ms-2"
        >Logout</a
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

let isAuthenticated = computed(() => authStore.isLoggedIn);
let user = computed(() => authStore.user);
const logout = async () => {
  await authStore.logout()
  router.push("/login");
};
watch(isAuthenticated, (newValue) => {
  if (newValue) {
    router.push("/home");
  }
});
</script>

<style lang="scss">
input {
  transition: all 0.7s linear !important;
}
input:valid {
  border-color: rgb(0, 128, 0) !important;
  box-shadow: none !important;
}

#form-group {
  position: relative;
  input {
    padding-left: 25px;
    padding-right: 25px;
    ~ #first-icon {
      left: 5px !important;
    }
    ~ #last-icon {
      right: 5px !important;
    }
    // + svg:last-child{
    //   left: 5px;
    // }
    &:valid ~ svg {
      color: green !important;
    }
    &:focus ~ svg {
      color: #86b7fe;
    }
  }
  svg {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.5s linear;
  }
}
</style>
