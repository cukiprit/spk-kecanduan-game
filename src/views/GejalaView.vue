<script setup>
import useGejalaStore from "@/stores/useGejalaStore";
import { onMounted } from "vue";

const store = useGejalaStore();

const openAddModal = () => {
  store.selectedGejala = null;
  store.kode_gejala = "";
  store.nama_gejala = "";
  document.getElementById("my_modal_2").showModal();
};

const openUpdateModal = (data) => {
  store.selectedGejala = data;
  store.kode_gejala = data.kode_gejala;
  store.nama_gejala = data.nama_gejala;
  document.getElementById("my_modal_2").showModal();
};

const handleSubmit = () => {
  if (store.selectedPenyakit) {
    store.updateGejala();
  } else {
    store.submitGejala();
  }
};

onMounted(() => {
  store.fetchGejala();
});
</script>

<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">
        {{ store.selectedPenyakit ? "Update Gejala" : "Tambah Gejala" }}
      </h3>

      <form @submit.prevent="handleSubmit">
        <div class="form-control mb-5">
          <div class="label">
            <span class="label-text">Kode Gejala</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            v-model="store.kode_gejala"
            :disabled="store.selectedGejala"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control mb-5">
          <div class="label">
            <span class="label-text">Nama Gejala</span>
          </div>

          <textarea
            class="textarea textarea-bordered"
            v-model="store.nama_gejala"
          ></textarea>
        </div>
        <div class="form-control">
          <button type="submit" class="btn btn-primary">
            {{ store.selectedGejala ? "Update" : "Submit" }}
          </button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="store.selectedGejala = null">close</button>
    </form>
  </dialog>

  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <h3 class="text-2xl font-bold my-3">Data Gejala</h3>

    <button
      type="button"
      class="btn btn-primary text-light my-5"
      @click="openAddModal"
    >
      Tambah Data
    </button>

    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Kode Gejala</th>
            <th>Nama Gejala</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="hover"
            v-for="data in store.gejala"
            :key="data.kode_gejala"
          >
            <th>{{ data.kode_gejala }}</th>
            <td>{{ data.nama_gejala }}</td>
            <td>
              <button
                class="btn btn-warning mr-3"
                @click="openUpdateModal(data)"
              >
                Update
              </button>
              <button
                class="btn btn-error"
                @click="() => store.deletePenyakit(data.kode_gejala)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
