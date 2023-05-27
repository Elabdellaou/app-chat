<template>
  <Form @submit="submitForm"  :validation-schema="schema">
    <p class="h2 text-center">Sign in</p>
    <div class="mb-3" id="alert"></div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <div id="form-group">
        <Field id="exampleInputEmail1" class="form-control" name="email" type="email" />
        <font-awesome-icon id="first-icon" :icon="['fas', 'envelope']" />
      </div>
      <div class="form-text invalid-feedback">
        <ErrorMessage name="email" />
      </div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <div id="form-group">
        <Field v-if="hide_password" :keep-value="password" name="password" class="form-control" type="password" autocomplete="current-password"  />
        <Field v-else :keep-value="password" name="password" class="form-control" type="text" autocomplete="current-password"  />

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
      <div class="form-text invalid-feedback">
        <ErrorMessage name="password" />
      </div>
    </div> 
    
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-primary">Login</button>
    </div>
  </Form>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});
const router = useRouter();

let email = ref("");
let password = ref("");
let hide_password = ref(true);

const authStore = useAuthStore();


const submitForm = async (values) => {
    await authStore
      .login(values)
      .then(() => {
        
      })
      .catch((errors) => {
        const parentAlert = document.querySelector("#alert");
        parentAlert.innerHTML =
          '<div class="alert alert-danger alert-dismissible fade show" role="alert">The email or password is incorrect. <button type="button" class="btn-close" data-bs-dismiss="alert"aria-label="Fermer"></button></div>';
      });
    if (authStore.isLoggedIn) router.push("/home");
};
</script>
<style lang="scss" scoped></style>
