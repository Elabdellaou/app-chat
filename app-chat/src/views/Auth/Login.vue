<template>
  <form @submit.prevent="submitForm">
    <p class="h2 text-center">Please Sign in</p>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        v-model="emailInput"
        id="exampleInputEmail1"
      />
      <div v-if="v$.emailInput.$error" class="form-text invalid-feedback">
        Email is required and must be valid
      </div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        v-model="password"
        id="exampleInputPassword1"
      />
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
import { required, email } from "vuelidate/lib/validators";
import { useVuelidate } from "@vuelidate/core";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const emailInput = ref("");
const password = ref("");

const authStore = useAuthStore();

const rules = {
  emailInput: { required, email },
  password: { required },
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
    await authStore.login({ emailInput, password });
    if (authStore.isLoggedIn) router.push("/home");
  }
};
</script>
<style scoped></style>
