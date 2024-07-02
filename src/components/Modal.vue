<script setup>
import { ref, watch, toRefs } from "vue";

const props = defineProps({
  modalId: String,
  title: String,
  kodeLabel: String,
  namaLabel: String,
  kodeValue: String,
  namaValue: String,
  isUpdate: Boolean,
  onSubmit: Function,
});

const emit = defineEmits(["update:kodeValue", "update:namaValue", "close"]);

const kodeRef = ref(props.kodeValue);
const namaRef = ref(props.namaValue);

watch(
  () => props.kodeValue,
  (newVal) => (kodeRef.value = newVal)
);
watch(
  () => props.namaValue,
  (newVal) => (namaRef.value = newVal)
);

const handleSubmit = () => {
  props.onSubmit();
  emit();
  emit("update:kodeValue", kodeRef.value);
  emit("update:namaValue", namaRef.value);
};

const closeModal = () => {
  emit("close");
};
</script>

<template>
  <dialog :id="modalId" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-control mb-5">
          <div class="label">
            <span class="label-text">{{ kodeLabel }}</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            v-model="kodeValue"
            :disabled="isUpdate"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control mb-5">
          <div class="label">
            <span class="label-text">{{ namaLabel }}</span>
          </div>
          <textarea
            class="textarea textarea-bordered"
            v-model="namaValue"
          ></textarea>
        </div>
        <div class="form-control">
          <button type="submit" class="btn btn-primary">
            {{ isUpdate ? "Update" : "Submit" }}
          </button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>
