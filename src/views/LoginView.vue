<script setup>
import auth from "@/stores/auth";
import { onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const useAuth = auth();

const login = () => {
  useAuth.login();
  router.push("/");
};

onUnmounted(() => {
  useAuth.username = "";
  useAuth.password = "";
});
</script>

<template>
  <div
    class="container mx-auto flex flex-col lg:flex-row justify-center items-center"
  >
    <img class="w-1/2" src="/icon game.png" />

    <div class="w-full px-4">
      <h1 class="text-3xl font-bold mb-6 text-center">Login</h1>

      <form @submit.prevent="login" class="max-w-lg mx-auto">
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
          <p>
            Don't have account?
            <RouterLink class="text-cyan-700" to="/register">
              Click Here
            </RouterLink>
          </p>
        </div>

        <div class="form-control">
          <button type="submit" class="btn btn-primary w-full">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
