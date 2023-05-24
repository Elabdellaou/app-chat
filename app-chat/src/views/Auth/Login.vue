<template>
  <form @submit.prevent="submitForm">
    <p class="h2 text-center">Please Sign in</p>
    <div class="mb-3" id="alert"></div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <div id="form-group">
        <input
          type="email"
          class="form-control"
          v-model="emailInput"
          required
          id="exampleInputEmail1"
        />
        <font-awesome-icon id="first-icon" :icon="['fas', 'envelope']" />
      </div>

      <div v-if="v$.emailInput.$error" class="form-text invalid-feedback">
        Email is required and must be valid
      </div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <div id="form-group">
        <input
          v-if="hide_password"
          type="password"
          class="form-control"
          required
          minlength="8"
          v-model="password"
          id="exampleInputPassword1"
        />
        <input
          v-else
          type="text"
          class="form-control"
          required
          minlength="8"
          v-model="password"
          id="exampleInputPassword1"
        />
        <font-awesome-icon
          id="last-icon"
          @click="hide_password = !hide_password"
          class=""
          v-if="hide_password"
          :icon="['fasr', 'eye-slash']"
        />
        <font-awesome-icon
          id="last-icon"
          @click="hide_password = !hide_password"
          class=""
          v-else
          :icon="['fas', 'eye']"
        />
        <font-awesome-icon id="first-icon" :icon="['fas', 'lock']" />
      </div>
      <div v-if="v$.password.$error" class="form-text invalid-feedback">
        Password is required
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-primary">Login</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { required, email, minLength } from "vuelidate/lib/validators";
import { useVuelidate } from "@vuelidate/core";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";

const router = useRouter();
let emailInput = ref("");
let password = ref("");
let hide_password = ref(true);
const authStore = useAuthStore();

const rules = {
  emailInput: { required, email },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, { emailInput, password });

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    // Form is valid, submit data
    console.log("Form submitted:", {
      email: emailInput.value,
      password: password.value,
    });
    await authStore
      .login({ emailInput, password })
      .then((res) => {
        console.log(res);
      })
      .catch((errors) => {
        const parentAlert = document.querySelector("#alert");
        parentAlert.innerHTML =
          '<div class="alert alert-danger alert-dismissible fade show" role="alert">The email or password is incorrect. <button type="button" class="btn-close" data-bs-dismiss="alert"aria-label="Fermer"></button></div>';
      });
    if (authStore.isLoggedIn) router.push("/home");
  }
};
</script>
<style lang="scss" scoped></style>
