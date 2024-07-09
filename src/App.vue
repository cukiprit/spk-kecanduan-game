<script setup>
import { useRouter } from "vue-router";
import Navbar1 from "./components/Navbar1.vue";
import auth from "./stores/auth";
import { onMounted, onUnmounted } from "vue";

const useAuth = auth();
const router = useRouter();

onMounted(() => {
  useAuth.loadToken();
});
</script>

<template>
  <Navbar1 />
</template>
