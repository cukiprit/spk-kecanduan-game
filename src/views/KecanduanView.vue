<script setup>
import usePenyakitStore from "@/stores/useKecanduanStore";
import { onMounted } from "vue";

const store = usePenyakitStore();

const openAddModal = () => {
  store.selectedKecanduan = null;
  store.kode_kecanduan = "";
  store.perilaku_kecanduan = "";
  document.getElementById("my_modal_2").showModal();
};

const openUpdateModal = (data) => {
  store.selectedKecanduan = data;
  store.kode_kecanduan = data.kode_kecanduan;
  store.perilaku_kecanduan = data.perilaku_kecanduan;
  document.getElementById("my_modal_2").showModal();
};

const handleSubmit = () => {
  if (store.selectedKecanduan) {
    store.updatePenyakit();
  } else {
    store.submitPenyakit();
  }
};

onMounted(() => {
  store.fetchPenyakit();
});
</script>

<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">
        {{ store.selectedKecanduan ? "Update Kecanduan" : "Tambah Kecanduan" }}
      </h3>

      <form @submit.prevent="handleSubmit">
        <div class="form-control mb-5">
          <div class="label">
            <span class="label-text">Kode Kecanduan</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            v-model="store.kode_kecanduan"
            :disabled="store.selectedKecanduan"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control mb-5">
          <div class="label">
            <span class="label-text">Perilaku Kecanduan</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            v-model="store.perilaku_kecanduan"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <button type="submit" class="btn btn-primary">
            {{ store.selectedKecanduan ? "Update" : "Submit" }}
          </button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="store.selectedKecanduan = null">close</button>
    </form>
  </dialog>

  <div class="container mx-auto">
    <h3 class="text-2xl font-bold my-3">Data Kecanduan</h3>

    <button
      type="button"
      class="btn btn-primary text-light my-5"
      @click="openAddModal"
    >
      Tambah Data
    </button>

    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>Kode Kecanduan</th>
            <th>Perilaku Kecanduan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr
            class="hover"
            v-for="data in store.kecanduan"
            :key="data.kode_kecanduan"
          >
            <th></th>
            <th></th>
            <th></th>
            <th>{{ data.kode_kecanduan }}</th>
            <td>{{ data.perilaku_kecanduan }}</td>
            <td>
              <button
                class="btn btn-warning mr-3"
                @click="openUpdateModal(data)"
              >
                Update
              </button>
              <button
                class="btn btn-error"
                @click="() => store.deletePenyakit(data.kode_kecanduan)"
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
