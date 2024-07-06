<script setup>
import useQuisionerStore from "@/stores/useQuisionser";
import { onMounted, ref } from "vue";

const store = useQuisionerStore();
const result = ref([]);

onMounted(() => {
  store.fetchQuisioner();
  store.fetchRules();
});

const handleSubmit = () => {
  result.value = store.calculateResult();
};
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold mb-6">Quisioner</h1>

    <div
      v-for="gejala in store.quisioner"
      :key="gejala.kode_gejala"
      class="mb-4"
    >
      <p class="text-lg mb-2">
        {{ gejala.nama_gejala }}
      </p>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Ya</span>
          <input
            type="radio"
            :name="gejala.kode_gejala"
            value="yes"
            class="radio"
            @change="store.setAnswer(gejala.kode_gejala, 'yes')"
          />
        </label>
        <label class="label cursor-pointer">
          <span class="label-text">Tidak</span>
          <input
            type="radio"
            :name="gejala.kode_gejala"
            value="no"
            class="radio"
            @change="store.setAnswer(gejala.kode_gejala, 'no')"
          />
        </label>
      </div>
    </div>

    <button class="btn btn-primary" @click="handleSubmit">Submit</button>

    <div v-if="result.length" class="mt-6">
      <h2 class="text-2xl font-bold mb-4">Result</h2>
      <ul>
        <li v-for="res in result" :key="res.kode_kecanduan">
          {{ res.perilaku_kecanduan }}: {{ res.percentage.toFixed(2) }}%
        </li>
      </ul>
    </div>
  </div>
</template>
