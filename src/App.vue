<script setup>
import Navbar1 from "./components/Navbar1.vue";
import auth from "./stores/auth";
import { onMounted } from "vue";

const useAuth = auth();

onMounted(() => {
  useAuth.loadToken();
});
</script>

<template>
  <Navbar1 />
</template>
