<script setup>
import auth from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const useAuth = auth();
const router = useRouter();

const error = ref(null);

const login = () => {
  if (useAuth.password !== useAuth.confirmPassword) {
    error.value = "Password is not matched!";
    setTimeout(() => {
      error.value = null;
    }, 3000);
    return;
  }
  useAuth.register();
  router.push("/login");
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Register</h1>

    <form @submit.prevent="login" class="max-w-lg mx-auto">
      <div v-if="error" role="alert" class="alert alert-error my-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ error }}</span>
      </div>

      <div class="form-control mb-5">
        <div class="label">
          <span class="label-text">Username</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          v-model="useAuth.username"
          class="input input-bordered w-full"
        />
      </div>

      <div class="form-control mb-5">
        <div class="label">
          <span class="label-text">Password</span>
        </div>
        <input
          type="password"
          placeholder="Type here"
          v-model="useAuth.password"
          class="input input-bordered w-full"
        />
      </div>

      <div class="form-control mb-5">
        <div class="label">
          <span class="label-text">Confirm Password</span>
        </div>
        <input
          type="password"
          placeholder="Type here"
          v-model="useAuth.confirmPassword"
          class="input input-bordered w-full"
        />
      </div>

      <div class="form-control mb-5">
        <p>
          Already have an account?
          <RouterLink class="text-cyan-700" to="/login">Click Here</RouterLink>
        </p>
      </div>

      <div class="form-control">
        <button type="submit" class="btn btn-primary w-full">Register</button>
      </div>
    </form>
  </div>
</template>
