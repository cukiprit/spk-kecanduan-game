<script setup>
import useQuisionerStore from "@/stores/useQuisionser";
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const store = useQuisionerStore();
const router = useRouter();

onMounted(() => {
  store.fetchQuisioner();
  store.fetchRules();
});

onUnmounted(() => store.resetForm());

const handleSubmit = async () => {
  await store.calculateResult();

  const resultData = {
    tanggal: new Date().toISOString(),
    skor: store.highestResult.percentage,
    kode_gejala: Object.keys(store.answers),
    kode_kecanduan: store.highestResult.kode_kecanduan,
  };

  await store.saveResult(resultData);

  router.push("/hasil");
};
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold mb-6">Quisioner</h1>

    <div
      v-for="gejala in store.currentPartQuestions()"
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
            v-model="store.answers[gejala.kode_gejala]"
          />
        </label>
        <label class="label cursor-pointer">
          <span class="label-text">Tidak</span>
          <input
            type="radio"
            :name="gejala.kode_gejala"
            value="no"
            class="radio"
            v-model="store.answers[gejala.kode_gejala]"
          />
        </label>
      </div>
    </div>

    <div class="flex justify-between my-6">
      <button
        v-if="store.currentPart > 0"
        class="btn btn-secondary"
        @click="store.prevPart"
      >
        Previous
      </button>
      <button
        v-if="store.currentPart < Math.ceil(store.quisioner.length / 7) - 1"
        class="btn btn-primary"
        @click="store.nextPart"
        :disabled="!store.isCurrentPartFilled()"
      >
        Next
      </button>
      <button
        v-if="store.currentPart === Math.ceil(store.quisioner.length / 7) - 1"
        class="btn btn-primary"
        @click="handleSubmit"
        :disabled="!store.isCurrentPartFilled()"
      >
        Submit
      </button>
    </div>
  </div>
</template>
