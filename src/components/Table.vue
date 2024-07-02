<script setup>
const props = defineProps({
  items: Array,
  kodeLabel: String,
  namaLabel: String,
  kodeKey: String,
  namaKey: String,
  onUpdate: Function,
  onDelete: Function,
});
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th>{{ kodeLabel }}</th>
          <th>{{ namaLabel }}</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover" v-for="data in items" :key="data[kodeKey]">
          <th></th>
          <th></th>
          <th></th>
          <th>{{ data[kodeKey] }}</th>
          <td>{{ data[namaKey] }}</td>
          <td>
            <button class="btn btn-warning mr-3" @click="() => onUpdate(data)">
              Update
            </button>
            <button
              class="btn btn-error"
              @click="() => onDelete(data[kodeKey])"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
