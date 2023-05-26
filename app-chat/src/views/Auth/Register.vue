<template>
  <form @submit.prevent="submitForm">
    <p class="h2 text-center">Register</p>
    <div class="mb-3" id="alert"></div>
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <div id="form-group">
        <input
          type="name"
          class="form-control"
          v-model="name"
          required
          id="name"
        />
        <font-awesome-icon id="first-icon" :icon="['fas', 'user']" />
      </div>

      <div v-if="v$.name.$error" class="form-text invalid-feedback">
        Name is required and must be valid
      </div>
    </div>
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
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label"
        >Password confirmation</label
      >
      <div id="form-group">
        <input
          v-if="hide_password_confirmation"
          type="password"
          class="form-control"
          required
          minlength="8"
          v-model="password_confirmation"
          id="exampleInputPassword1"
        />
        <input
          v-else
          type="text"
          class="form-control"
          required
          minlength="8"
          v-model="password_confirmation"
          id="exampleInputPassword1"
        />
        <font-awesome-icon
          id="last-icon"
          @click="hide_password_confirmation = !hide_password_confirmation"
          class=""
          v-if="hide_password_confirmation"
          :icon="['fasr', 'eye-slash']"
        />
        <font-awesome-icon
          id="last-icon"
          @click="hide_password_confirmation = !hide_password_confirmation"
          class=""
          v-else
          :icon="['fas', 'eye']"
        />
        <font-awesome-icon id="first-icon" :icon="['fas', 'lock']" />
      </div>
      <div
        v-if="v$.password_confirmation.$error"
        class="form-text invalid-feedback"
      >
        Password confirmation is required
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-primary" :disabled="v$.$invalid">
        Register
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { useVuelidate } from "@vuelidate/core";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";

const router = useRouter();
let emailInput = ref("");
let name = ref("");
let password = ref("");
let password_confirmation = ref("");
let hide_password = ref(true);
let hide_password_confirmation = ref(true);
const authStore = useAuthStore();

const rules = {
  emailInput: { required, email },
  password: { required, minLength: minLength(8) },
  name: { required, minLength: minLength(3) },
  password_confirmation: {
    required,
    minLength: minLength(8),
    // sameAsPassword: sameAs("password"),
  },
};

const v$ = useVuelidate(rules, {
  emailInput,
  password,
  name,
  password_confirmation,
});

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (result) {
    // Form is valid, submit data
    await authStore
      .register({ name, emailInput, password, password_confirmation })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.status == 422 &&
          error.response.data.message
        ) {
          const parentAlert = document.querySelector("#alert");
          parentAlert.innerHTML =
            '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
            error.response.data.message +
            '<button type="button" class="btn-close" data-bs-dismiss="alert"aria-label="Fermer"></button></div>';
        }
      });
    if (authStore.isLoggedIn) router.push("/home");
  }
};
</script>
<style lang="scss" scoped></style>
