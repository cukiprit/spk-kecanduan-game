<script setup>
import useAturanStore from "@/stores/useAturanStore";
import { onMounted } from "vue";

const store = useAturanStore();

onMounted(() => {
  store.fetchAturan();
  store.fetchKecanduan();
  store.fetchGejala();
});

const openAddModal = () => {
  store.setMode("add");
  store.selectedDetail = {}; // Reset selected detail
  store.selectedValues = [];
  document.getElementById("my_modal_2").showModal();
};

const openUpdateModal = async (kode_kecanduan) => {
  store.setMode("update");
  await store.fetchDetail(kode_kecanduan);
  store.selectedValues = [...store.selectedDetail.kode_gejala]; // Initialize selected values with current gejala
  document.getElementById("my_modal_2").showModal();
};

const handleSubmit = () => {
  const data = {
    kode_gejala: store.selectedValues,
    kode_kecanduan: store.selectedDetail.kode_kecanduan,
  };

  if (store.mode === "add") {
    store.addAturan(data);
  } else if (store.mode === "update") {
    store.updateAturan(data);
  }
};
</script>

<template>
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">
        {{ store.mode === "add" ? "Tambah Aturan" : "Update Aturan" }}
      </h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-control mb-5">
          <div class="label">
            <span class="label-text">Kode Kecanduan</span>
          </div>

          <select
            v-if="store.mode === 'add'"
            class="select select-bordered w-full"
            v-model="store.selectedDetail.kode_kecanduan"
          >
            <option disabled selected>Select Kode Kecanduan</option>
            <option
              v-for="item in store.kecanduan"
              :key="item.kode_kecanduan"
              :value="item.kode_kecanduan"
            >
              {{ item.perilaku_kecanduan }}
            </option>
          </select>

          <input
            v-else
            type="text"
            v-model="store.selectedDetail.kode_kecanduan"
            disabled
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control mb-5">
          <div class="label">
            <span class="label-text">Kode Gejala</span>
          </div>
          <div class="relative">
            <select
              v-model="store.selectedOption"
              @change="store.addSelectedOption"
              class="select select-bordered w-full"
            >
              <option disabled selected>Select Kode Gejala</option>
              <option
                v-for="gejala in store.gejala"
                :key="gejala.kode_gejala"
                :value="gejala.kode_gejala"
              >
                {{ gejala.kode_gejala }}
              </option>
            </select>
          </div>

          <div class="mt-4 space-y-2">
            <div
              v-for="item in store.selectedValues"
              :key="item"
              class="flex items-center justify-between p-2 rounded"
            >
              <span>{{ item }}</span>
              <button
                @click="store.removeSelectedOption(item)"
                class="btn btn-error btn-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div class="form-control">
          <button type="submit" class="btn btn-primary">
            {{ store.mode === "add" ? "Submit" : "Update" }}
          </button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>

  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-bold my-3 text-center md:text-left">Aturan</h1>

    <div class="flex justify-center md:justify-start my-5">
      <button class="btn btn-primary mb-5" @click="openAddModal">
        Tambah Aturan
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Kode Kecanduan</th>
            <th>Perilaku Kecanduan</th>
            <th>Kode Gejala</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="data in store.aturan"
            :key="data.kode_kecanduan"
            class="hover"
          >
            <th>{{ data.kode_kecanduan }}</th>
            <td>{{ data.perilaku_kecanduan }}</td>
            <td>{{ data.kode_gejala }}</td>
            <td>
              <div class="flex space-x-2">
                <button
                  class="btn btn-warning mr-3"
                  @click="openUpdateModal(data.kode_kecanduan)"
                >
                  Update
                </button>
                <button
                  class="btn btn-error"
                  @click="store.deleteAturan(data.kode_kecanduan)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
