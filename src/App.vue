<script setup>
import Navbar1 from "./components/Navbar1.vue";
import auth from "./stores/auth";
import { onMounted, onUnmounted } from "vue";

const useAuth = auth();

const updateAuthState = () => {
  useAuth.token = sessionStorage.getItem("token");
};

onMounted(() => {
  updateAuthState();
  window.addEventListener("storage", updateAuthState);
});

onUnmounted(() => {
  window.removeEventListener("storage", updateAuthState);
});
</script>

<template>
  <Navbar1 />
</template>
