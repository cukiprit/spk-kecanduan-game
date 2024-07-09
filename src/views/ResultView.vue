<script setup>
import { useRoute } from "vue-router";
import moment from "moment";

const route = useRoute();
const highestResult = JSON.parse(route.query.highestResult);
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold mb-6">Result</h1>

    <div class="mt-6">
      <h2 class="text-xl font-bold mb-4">Kecanduan</h2>
      <p class="mb-4">
        Tanggal Konsultasi: {{ moment().format("d-MMMM-YYYY h:mm") }}
        <br />
        Kecanduan: {{ highestResult.perilaku_kecanduan }}
        <br />
        Persentanse Kemungkinan: {{ highestResult.percentage.toFixed(2) }}%
      </p>
      <h3 class="text-xl font-bold mb-4">Solusi</h3>
      <p>{{ highestResult.solusi }}</p>
    </div>
  </div>
</template>
