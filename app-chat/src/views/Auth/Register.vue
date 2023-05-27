<template>
  <Form @submit="submitForm" :validation-schema="schema">
    <p class="h2 text-center">Register</p>
    <div class="mb-3" id="alert"></div>
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <div id="form-group">
        <Field id="name" class="form-control" name="name" type="text" />
        <font-awesome-icon id="first-icon" :icon="['fas', 'user']" />
      </div>

      <div class="form-text invalid-feedback">
        <ErrorMessage name="name" />
      </div>
    </div>
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
        <Field  v-if="hide_password" :keep-value="password" name="password" class="form-control" type="password"  />
        <Field  v-else :keep-value="password" name="password" class="form-control" type="text"  />

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
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label"
        >Password confirmation</label
      >
      <div id="form-group">
        <Field  v-if="hide_password_confirmation" :keep-value="password_confirmation" name="password_confirmation" class="form-control" type="password"  />
        <Field  v-else :keep-value="password_confirmation" name="password_confirmation" class="form-control" type="text"  />

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
      <div class="form-text invalid-feedback">
        <ErrorMessage name="password_confirmation" />
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-primary">
        Register
      </button>
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
  name:yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required('Password is required').min(8),
  password_confirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Password confirmation must match'),
});

const router = useRouter();
let email = ref("");
let name = ref("");
let password = ref("");
let password_confirmation = ref("");
let hide_password = ref(true);
let hide_password_confirmation = ref(true);
const authStore = useAuthStore();


const submitForm = async (values) => {
    // Form is valid, submit data
    await authStore
      .register(values)
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
};
</script>
<style lang="scss" scoped></style>
