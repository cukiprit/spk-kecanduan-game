<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const highestResult = JSON.parse(route.query.highestResult);
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold mb-6">Result</h1>

    <div class="mt-6">
      <h2 class="text-2xl font-bold mb-4">
        {{ highestResult.perilaku_kecanduan }}
      </h2>
      <h3 class="text-xl font-bold mb-4">
        Percentage: {{ highestResult.percentage.toFixed(2) }}%
      </h3>
      <p>{{ highestResult.solusi }}</p>
    </div>
  </div>
</template>
